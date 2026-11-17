import { describe, expect, it } from "vitest";
import type { Carrier, Product, Shipment } from "../src/models.js";
import { binarySearchProductByWeight } from "../src/utils/search.js";
import {
  calculateAverageShipmentDistance,
  calculateShippingCost,
  calculateTotalInventoryValue,
  scoreCarrierForShipment,
  selectBestCarrier,
} from "../src/utils/transformations.js";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    sku: "SKU-1",
    name: "Product",
    category: "Fashion",
    weightKg: 2,
    dimensions: { lengthCm: 10, widthCm: 10, heightCm: 10 },
    warehouse: "Zaragoza",
    stockQuantity: 4,
    minStockThreshold: 1,
    unitCostUSD: 10,
    isFragile: false,
    status: "Active",
    ...overrides,
  };
}

function makeShipment(overrides: Partial<Shipment> = {}): Shipment {
  return {
    id: "SH-1",
    sku: "SKU-1",
    quantity: 2,
    origin: "Zaragoza",
    destination: {
      city: "Madrid",
      country: "Spain",
      postalCode: "28001",
      distanceKm: 100,
    },
    priority: "Standard",
    declaredValueUSD: 20,
    carrier: null,
    status: "Pending",
    createdAt: new Date("2026-11-17T00:00:00.000Z"),
    ...overrides,
  };
}

function makeCarrier(overrides: Partial<Carrier> = {}): Carrier {
  return {
    id: "CAR-1",
    name: "Carrier 1",
    operatesIn: ["Spain"],
    baseRateUSD: 10,
    ratePerKgUSD: 2,
    ratePerKmUSD: 0.1,
    avgDeliveryDays: 2,
    onTimeRate: 100,
    maxWeightKg: 10,
    handlesFragile: true,
    acceptsPriority: ["Standard", "Express", "Same-day"],
    ...overrides,
  };
}

describe("binarySearchProductByWeight", () => {
  it("finds matching weights at the beginning, middle and end", () => {
    const products = [1, 2, 3, 4, 5].map((weightKg) => makeProduct({ weightKg }));

    expect(binarySearchProductByWeight(products, 1)).toBe(0);
    expect(binarySearchProductByWeight(products, 3)).toBe(2);
    expect(binarySearchProductByWeight(products, 5)).toBe(4);
  });

  it("returns -1 for targets before, between or after the weights", () => {
    const products = [1, 3, 5].map((weightKg) => makeProduct({ weightKg }));

    expect(binarySearchProductByWeight(products, 0)).toBe(-1);
    expect(binarySearchProductByWeight(products, 2)).toBe(-1);
    expect(binarySearchProductByWeight(products, 6)).toBe(-1);
  });

  it("handles empty and single-item inputs, uses exact equality, and does not mutate", () => {
    const single = [makeProduct({ weightKg: 1.25 })];
    expect(binarySearchProductByWeight([], 1)).toBe(-1);
    expect(binarySearchProductByWeight(single, 1.25)).toBe(0);
    expect(binarySearchProductByWeight(single, 1.2500001)).toBe(-1);
    expect(single[0].weightKg).toBe(1.25);
  });

  it("does not reorder a multi-item input", () => {
    const products = [1, 2, 3].map((weightKg) => makeProduct({ weightKg }));
    const originalReferences = [...products];

    binarySearchProductByWeight(products, 2);

    expect(products).toEqual(originalReferences);
    expect(products[0]).toBe(originalReferences[0]);
    expect(products[1]).toBe(originalReferences[1]);
    expect(products[2]).toBe(originalReferences[2]);
  });
});

describe("calculateTotalInventoryValue", () => {
  it("sums stock value and rounds the total to two decimals", () => {
    expect(
      calculateTotalInventoryValue([
        makeProduct({ stockQuantity: 3, unitCostUSD: 10.125 }),
        makeProduct({ stockQuantity: 2, unitCostUSD: 4.2 }),
      ]),
    ).toBe(38.78);
  });

  it("returns zero for empty input and handles zero stock without mutation", () => {
    const product = makeProduct({ stockQuantity: 0 });
    const products = [product];

    expect(calculateTotalInventoryValue([])).toBe(0);
    expect(calculateTotalInventoryValue(products)).toBe(0);
    expect(products).toEqual([product]);
    expect(products[0]).toBe(product);
  });
});

describe("calculateAverageShipmentDistance", () => {
  it("averages one or more shipment distances and rounds to two decimals", () => {
    expect(
      calculateAverageShipmentDistance([
        makeShipment({ destination: { ...makeShipment().destination, distanceKm: 4 } }),
      ]),
    ).toBe(4);
    expect(
      calculateAverageShipmentDistance([
        makeShipment({ destination: { ...makeShipment().destination, distanceKm: 1 } }),
        makeShipment({ destination: { ...makeShipment().destination, distanceKm: 2 } }),
        makeShipment({ destination: { ...makeShipment().destination, distanceKm: 2 } }),
      ]),
    ).toBe(1.67);
  });

  it("returns zero for empty input and includes zero distances", () => {
    expect(calculateAverageShipmentDistance([])).toBe(0);
    expect(
      calculateAverageShipmentDistance([
        makeShipment({ destination: { ...makeShipment().destination, distanceKm: 0 } }),
        makeShipment({ destination: { ...makeShipment().destination, distanceKm: 10 } }),
      ]),
    ).toBe(5);
  });

  it("does not modify shipments or nested destinations", () => {
    const shipment = makeShipment();
    const shipments = [shipment];
    const originalDestination = shipment.destination;
    const originalSnapshot = structuredClone(shipments);

    calculateAverageShipmentDistance(shipments);

    expect(shipments).toEqual(originalSnapshot);
    expect(shipments[0]).toBe(shipment);
    expect(shipment.destination).toBe(originalDestination);
  });
});

describe("calculateShippingCost", () => {
  it("applies standard, express and same-day surcharges to the full subtotal", () => {
    const product = makeProduct({ weightKg: 2 });
    const shipment = makeShipment({ quantity: 3 });
    const carrier = makeCarrier({
      baseRateUSD: 10,
      ratePerKgUSD: 2,
      ratePerKmUSD: 0.1,
    });
    // Subtotal = 10 + (2 * 2 * 3) + (100 * 0.1) = 32.
    expect(calculateShippingCost(shipment, product, carrier)).toBe(32);
    expect(
      calculateShippingCost(
        { ...shipment, priority: "Express" },
        product,
        carrier,
      ),
    ).toBe(41.6);
    expect(
      calculateShippingCost(
        { ...shipment, priority: "Same-day" },
        product,
        carrier,
      ),
    ).toBe(51.2);
  });

  it("rounds the result and supports zero rates and distance", () => {
    const cost = calculateShippingCost(
      makeShipment({
        priority: "Express",
        destination: { ...makeShipment().destination, distanceKm: 0 },
      }),
      makeProduct({ weightKg: 1 }),
      makeCarrier({ baseRateUSD: 1.005, ratePerKgUSD: 0, ratePerKmUSD: 0 }),
    );
    expect(cost).toBe(1.31);
  });

  it("does not modify shipment, product, carrier, or nested input data", () => {
    const shipment = makeShipment();
    const product = makeProduct();
    const carrier = makeCarrier();
    const destination = shipment.destination;
    const operatesIn = carrier.operatesIn;
    const acceptsPriority = carrier.acceptsPriority;
    const snapshots = structuredClone({ shipment, product, carrier });

    calculateShippingCost(shipment, product, carrier);

    expect({ shipment, product, carrier }).toEqual(snapshots);
    expect(shipment.destination).toBe(destination);
    expect(carrier.operatesIn).toBe(operatesIn);
    expect(carrier.acceptsPriority).toBe(acceptsPriority);
  });
});

describe("scoreCarrierForShipment", () => {
  it("adds country, weight, priority, fragility and reliability points", () => {
    const shipment = makeShipment();
    const product = makeProduct();
    const carrier = makeCarrier();

    expect(scoreCarrierForShipment(carrier, shipment, product)).toBe(100);
    expect(
      scoreCarrierForShipment(
        makeCarrier({ operatesIn: ["United States"] }),
        shipment,
        product,
      ),
    ).toBe(80);
    expect(
      scoreCarrierForShipment(
        makeCarrier({ maxWeightKg: 3 }),
        shipment,
        product,
      ),
    ).toBe(80);
    expect(
      scoreCarrierForShipment(
        makeCarrier({ acceptsPriority: [] }),
        shipment,
        product,
      ),
    ).toBe(85);
  });

  it("checks fragile handling and total shipment weight at the boundary", () => {
    const shipment = makeShipment({ quantity: 3 });
    const fragileProduct = makeProduct({ weightKg: 2, isFragile: true });

    expect(
      scoreCarrierForShipment(
        makeCarrier({ maxWeightKg: 6, handlesFragile: true }),
        shipment,
        fragileProduct,
      ),
    ).toBe(100);
    expect(
      scoreCarrierForShipment(
        makeCarrier({ maxWeightKg: 5, handlesFragile: false }),
        shipment,
        fragileProduct,
      ),
    ).toBe(65);
    expect(
      scoreCarrierForShipment(
        makeCarrier({ onTimeRate: 81 }),
        makeShipment(),
        makeProduct(),
      ),
    ).toBe(94.3);
  });

  it("does not modify its input entities or nested arrays", () => {
    const carrier = makeCarrier();
    const shipment = makeShipment();
    const product = makeProduct();
    const operatesIn = carrier.operatesIn;
    const acceptsPriority = carrier.acceptsPriority;
    const originalSnapshot = structuredClone({ carrier, shipment, product });

    scoreCarrierForShipment(carrier, shipment, product);

    expect({ carrier, shipment, product }).toEqual(originalSnapshot);
    expect(carrier.operatesIn).toBe(operatesIn);
    expect(carrier.acceptsPriority).toBe(acceptsPriority);
  });
});

describe("selectBestCarrier", () => {
  it("returns null for empty or ineligible carriers and accepts score 50", () => {
    const shipment = makeShipment();
    const product = makeProduct();

    expect(selectBestCarrier([], shipment, product)).toBeNull();
    expect(
      selectBestCarrier(
        [makeCarrier({ operatesIn: [], maxWeightKg: 0, acceptsPriority: [], onTimeRate: 0 })],
        shipment,
        product,
      ),
    ).toBeNull();

    const fragileProduct = makeProduct({ isFragile: true });
    const score50Carrier = makeCarrier({ maxWeightKg: 1, onTimeRate: 0 });
    const result = selectBestCarrier(
      [score50Carrier],
      shipment,
      fragileProduct,
    );
    expect(result?.carrier).toBe(score50Carrier);
    expect(result?.score).toBe(50);
  });

  it("chooses the least expensive eligible carrier and keeps first on cost ties", () => {
    const shipment = makeShipment();
    const product = makeProduct();
    const expensive = makeCarrier({ id: "EXP", baseRateUSD: 20 });
    const cheapest = makeCarrier({ id: "CHEAP", baseRateUSD: 5 });
    const tied = makeCarrier({ id: "TIED", baseRateUSD: 5 });

    expect(selectBestCarrier([expensive, cheapest, tied], shipment, product)).toEqual({
      carrier: cheapest,
      score: 100,
      cost: calculateShippingCost(shipment, product, cheapest),
    });
  });

  it("does not modify the carrier list or any input entities", () => {
    const shipment = makeShipment();
    const product = makeProduct();
    const carriers = [makeCarrier(), makeCarrier({ id: "CAR-2" })];
    const originalCarrierReferences = [...carriers];
    const originalSnapshot = structuredClone({ shipment, product, carriers });

    selectBestCarrier(carriers, shipment, product);

    expect({ shipment, product, carriers }).toEqual(originalSnapshot);
    expect(carriers[0]).toBe(originalCarrierReferences[0]);
    expect(carriers[1]).toBe(originalCarrierReferences[1]);
  });
});
