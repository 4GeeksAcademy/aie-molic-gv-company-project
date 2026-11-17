import { describe, expect, it } from "vitest";
import type { Carrier, Product, Shipment } from "../src/models.js";
import {
  validateCarrier,
  validateProduct,
  validateShipment,
} from "../src/utils/validations.js";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    sku: "SHOE-BLK-42",
    name: "Black shoe",
    category: "Fashion",
    weightKg: 1.5,
    dimensions: { lengthCm: 30, widthCm: 20, heightCm: 10 },
    warehouse: "Zaragoza",
    stockQuantity: 12,
    minStockThreshold: 5,
    unitCostUSD: 25,
    isFragile: false,
    status: "Active",
    ...overrides,
  };
}

function makeShipment(overrides: Partial<Shipment> = {}): Shipment {
  return {
    id: "SH-2026-001",
    sku: "SHOE-BLK-42",
    quantity: 2,
    origin: "Zaragoza",
    destination: {
      city: "Madrid",
      country: "Spain",
      postalCode: "28001",
      distanceKm: 300,
    },
    priority: "Standard",
    declaredValueUSD: 50,
    carrier: null,
    status: "Pending",
    createdAt: new Date("2026-11-17T00:00:00.000Z"),
    ...overrides,
  };
}

function makeCarrier(overrides: Partial<Carrier> = {}): Carrier {
  return {
    id: "CAR-UPS",
    name: "UPS",
    operatesIn: ["Spain"],
    baseRateUSD: 5,
    ratePerKgUSD: 1,
    ratePerKmUSD: 0.05,
    avgDeliveryDays: 2,
    onTimeRate: 95,
    maxWeightKg: 25,
    handlesFragile: true,
    acceptsPriority: ["Standard", "Express"],
    ...overrides,
  };
}

describe("validateProduct", () => {
  it("accepts a valid product and inclusive upper/lower boundaries", () => {
    const result = validateProduct(
      makeProduct({
        weightKg: 100,
        dimensions: { lengthCm: 200, widthCm: 200, heightCm: 200 },
        stockQuantity: 0,
        minStockThreshold: 0,
      }),
    );

    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("reports each single product rule violation", () => {
    const invalidProducts = [
      makeProduct({ sku: "" }),
      makeProduct({ weightKg: 0 }),
      makeProduct({ weightKg: 101 }),
      makeProduct({ dimensions: { lengthCm: 0, widthCm: 20, heightCm: 10 } }),
      makeProduct({ dimensions: { lengthCm: 201, widthCm: 20, heightCm: 10 } }),
      makeProduct({ dimensions: { lengthCm: 30, widthCm: 0, heightCm: 10 } }),
      makeProduct({ dimensions: { lengthCm: 30, widthCm: 201, heightCm: 10 } }),
      makeProduct({ dimensions: { lengthCm: 30, widthCm: 20, heightCm: 0 } }),
      makeProduct({ dimensions: { lengthCm: 30, widthCm: 20, heightCm: 201 } }),
      makeProduct({ stockQuantity: -1 }),
      makeProduct({ minStockThreshold: -1 }),
      makeProduct({ unitCostUSD: 0 }),
    ];

    for (const product of invalidProducts) {
      const result = validateProduct(product);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
    }
  });

  it("accumulates errors for multiple violations", () => {
    const result = validateProduct(
      makeProduct({
        sku: "",
        weightKg: 0,
        stockQuantity: -1,
        unitCostUSD: 0,
      }),
    );

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4);
  });

  it("does not modify the product or its dimensions", () => {
    const product = makeProduct();
    const dimensions = product.dimensions;
    const originalSnapshot = structuredClone(product);

    validateProduct(product);

    expect(product).toEqual(originalSnapshot);
    expect(product.dimensions).toBe(dimensions);
  });
});

describe("validateShipment", () => {
  it("accepts positive quantity/value and zero distance", () => {
    const result = validateShipment(
      makeShipment({
        quantity: 1,
        declaredValueUSD: 0.01,
        destination: {
          city: "Madrid",
          country: "Spain",
          postalCode: "28001",
          distanceKm: 0,
        },
      }),
    );

    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("reports each shipment rule violation", () => {
    const invalidShipments = [
      makeShipment({ quantity: 0 }),
      makeShipment({ declaredValueUSD: 0 }),
      makeShipment({
        destination: {
          city: "Madrid",
          country: "Spain",
          postalCode: "28001",
          distanceKm: -1,
        },
      }),
    ];

    for (const shipment of invalidShipments) {
      const result = validateShipment(shipment);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
    }
  });

  it("accumulates errors for multiple violations", () => {
    const result = validateShipment(
      makeShipment({ quantity: 0, declaredValueUSD: 0 }),
    );

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(2);
  });

  it("does not modify the shipment or its destination", () => {
    const shipment = makeShipment();
    const destination = shipment.destination;
    const originalSnapshot = structuredClone(shipment);

    validateShipment(shipment);

    expect(shipment).toEqual(originalSnapshot);
    expect(shipment.destination).toBe(destination);
  });
});

describe("validateCarrier", () => {
  it("accepts zero rates and inclusive reliability boundaries", () => {
    const zeroRateResult = validateCarrier(
      makeCarrier({
        baseRateUSD: 0,
        ratePerKgUSD: 0,
        ratePerKmUSD: 0,
        onTimeRate: 0,
      }),
    );
    const upperReliabilityResult = validateCarrier(makeCarrier({ onTimeRate: 100 }));

    expect(zeroRateResult).toEqual({ valid: true, errors: [] });
    expect(upperReliabilityResult).toEqual({ valid: true, errors: [] });
  });

  it("reports each single carrier rule violation", () => {
    const invalidCarriers = [
      makeCarrier({ baseRateUSD: -1 }),
      makeCarrier({ ratePerKgUSD: -1 }),
      makeCarrier({ ratePerKmUSD: -1 }),
      makeCarrier({ avgDeliveryDays: 0 }),
      makeCarrier({ onTimeRate: -1 }),
      makeCarrier({ onTimeRate: 101 }),
      makeCarrier({ maxWeightKg: 0 }),
      makeCarrier({ operatesIn: [] }),
    ];

    for (const carrier of invalidCarriers) {
      const result = validateCarrier(carrier);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
    }
  });

  it("accumulates errors for multiple violations", () => {
    const result = validateCarrier(
      makeCarrier({ baseRateUSD: -1, avgDeliveryDays: 0, operatesIn: [] }),
    );

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
  });

  it("does not modify the carrier or its nested arrays", () => {
    const carrier = makeCarrier();
    const operatesIn = carrier.operatesIn;
    const acceptsPriority = carrier.acceptsPriority;
    const originalSnapshot = structuredClone(carrier);

    validateCarrier(carrier);

    expect(carrier).toEqual(originalSnapshot);
    expect(carrier.operatesIn).toBe(operatesIn);
    expect(carrier.acceptsPriority).toBe(acceptsPriority);
  });
});
