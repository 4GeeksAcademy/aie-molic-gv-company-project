import { describe, expect, it } from "vitest";
import type { Product, Shipment } from "../src/models.js";
import { findProductBySKU, findShipmentById } from "../src/utils/search.js";

function makeProduct(sku: string): Product {
  return {
    sku,
    name: `Product ${sku}`,
    category: "Fashion",
    weightKg: 0.8,
    dimensions: { lengthCm: 35, widthCm: 22, heightCm: 12 },
    warehouse: "Zaragoza",
    stockQuantity: 12,
    minStockThreshold: 5,
    unitCostUSD: 35,
    isFragile: false,
    status: "Active",
  };
}

describe("findProductBySKU", () => {
  it("returns the product with an exact SKU match", () => {
    const product = makeProduct("SHOE-BLK-42");

    expect(findProductBySKU([product], "SHOE-BLK-42")).toBe(product);
  });

  it("matches SKUs without distinguishing letter case", () => {
    const product = makeProduct("SHOE-BLK-42");

    expect(findProductBySKU([product], "shoe-blk-42")).toBe(product);
  });

  it("finds products at the first and last positions", () => {
    const firstProduct = makeProduct("SHOE-BLK-42");
    const middleProduct = makeProduct("PERFUME-COCO-50");
    const lastProduct = makeProduct("LAPTOP-DELL-15");
    const products = [firstProduct, middleProduct, lastProduct];

    expect(findProductBySKU(products, firstProduct.sku)).toBe(firstProduct);
    expect(findProductBySKU(products, lastProduct.sku)).toBe(lastProduct);
  });

  it("returns null when the SKU is not found", () => {
    const products = [makeProduct("SHOE-BLK-42")];

    expect(findProductBySKU(products, "LAPTOP-DELL-15")).toBeNull();
  });

  it("returns null for an empty input", () => {
    expect(findProductBySKU([], "SHOE-BLK-42")).toBeNull();
  });

  it("does not modify the input array or its products", () => {
    const products = [makeProduct("SHOE-BLK-42"), makeProduct("LAPTOP-DELL-15")];
    const originalOrder = [...products];
    const originalSkus = products.map((product) => product.sku);

    findProductBySKU(products, "LAPTOP-DELL-15");

    expect(products.map((product) => product.sku)).toEqual(originalSkus);
    expect(products[0]).toBe(originalOrder[0]);
    expect(products[1]).toBe(originalOrder[1]);
  });
});

function makeShipment(id: string): Shipment {
  return {
    id,
    sku: "SHOE-BLK-42",
    quantity: 1,
    origin: "Zaragoza",
    destination: {
      city: "Madrid",
      country: "Spain",
      postalCode: "28001",
      distanceKm: 320,
    },
    priority: "Standard",
    declaredValueUSD: 35,
    carrier: null,
    status: "Pending",
    createdAt: new Date("2024-03-15T00:00:00.000Z"),
  };
}

describe("findShipmentById", () => {
  it("returns the shipment with an exact ID match", () => {
    const shipment = makeShipment("SH-2024-8821");

    expect(findShipmentById([shipment], "SH-2024-8821")).toBe(shipment);
  });

  it("finds shipments at the first and last positions", () => {
    const firstShipment = makeShipment("SH-2024-1001");
    const middleShipment = makeShipment("SH-2024-1002");
    const lastShipment = makeShipment("SH-2024-1003");
    const shipments = [firstShipment, middleShipment, lastShipment];

    expect(findShipmentById(shipments, firstShipment.id)).toBe(firstShipment);
    expect(findShipmentById(shipments, lastShipment.id)).toBe(lastShipment);
  });

  it("returns null when the shipment ID is not found", () => {
    const shipments = [makeShipment("SH-2024-1001")];

    expect(findShipmentById(shipments, "SH-2024-9999")).toBeNull();
  });

  it("returns null for an empty input", () => {
    expect(findShipmentById([], "SH-2024-8821")).toBeNull();
  });

  it("does not modify the input array or its shipments", () => {
    const shipments = [makeShipment("SH-2024-1001"), makeShipment("SH-2024-1002")];
    const originalOrder = [...shipments];
    const originalIds = shipments.map((shipment) => shipment.id);

    findShipmentById(shipments, "SH-2024-1002");

    expect(shipments.map((shipment) => shipment.id)).toEqual(originalIds);
    expect(shipments[0]).toBe(originalOrder[0]);
    expect(shipments[1]).toBe(originalOrder[1]);
  });
});