import { describe, expect, it } from "vitest";
import type { Product, Shipment } from "../src/models.js";
import {
  countProductsByCategory,
  findTopCarriers,
  groupShipmentsByStatus,
} from "../src/utils/transformations.js";

function makeProduct(category: Product["category"]): Product {
  return {
    sku: `SKU-${category}`,
    name: `Product ${category}`,
    category,
    weightKg: 1,
    dimensions: { lengthCm: 10, widthCm: 10, heightCm: 10 },
    warehouse: "Zaragoza",
    stockQuantity: 5,
    minStockThreshold: 1,
    unitCostUSD: 10,
    isFragile: false,
    status: "Active",
  };
}

function makeShipment(
  id: string,
  status: Shipment["status"] = "Pending",
  carrier: string | null = null,
): Shipment {
  return {
    id,
    sku: "SKU-1",
    quantity: 1,
    origin: "Zaragoza",
    destination: {
      city: "Madrid",
      country: "Spain",
      postalCode: "28001",
      distanceKm: 300,
    },
    priority: "Standard",
    declaredValueUSD: 10,
    carrier,
    status,
    createdAt: new Date("2026-11-17T00:00:00.000Z"),
  };
}

describe("countProductsByCategory", () => {
  it("counts present categories and sets absent categories to zero", () => {
    expect(
      countProductsByCategory([
        makeProduct("Fashion"),
        makeProduct("Electronics"),
        makeProduct("Fashion"),
      ]),
    ).toEqual({
      Fashion: 2,
      Electronics: 1,
      Cosmetics: 0,
      Home: 0,
      Other: 0,
    });
  });

  it("returns zero for all categories when the input is empty", () => {
    expect(countProductsByCategory([])).toEqual({
      Fashion: 0,
      Electronics: 0,
      Cosmetics: 0,
      Home: 0,
      Other: 0,
    });
  });

  it("does not mutate the input array or products", () => {
    const products = [makeProduct("Fashion"), makeProduct("Home")];
    const original = [...products];

    countProductsByCategory(products);

    expect(products).toEqual(original);
    expect(products[0]).toBe(original[0]);
    expect(products[1]).toBe(original[1]);
  });
});

describe("groupShipmentsByStatus", () => {
  it("groups shipments while preserving their references and order", () => {
    const firstPending = makeShipment("SH-1", "Pending");
    const delivered = makeShipment("SH-2", "Delivered");
    const secondPending = makeShipment("SH-3", "Pending");
    const shipments = [firstPending, delivered, secondPending];

    const groups = groupShipmentsByStatus(shipments);

    expect(groups.Pending).toEqual([firstPending, secondPending]);
    expect(groups.Delivered).toEqual([delivered]);
    expect(groups.Assigned).toEqual([]);
    expect(groups["In transit"]).toEqual([]);
    expect(groups.Failed).toEqual([]);
    expect(groups.Pending[0]).toBe(firstPending);
    expect(groups.Pending[1]).toBe(secondPending);
  });

  it("returns empty arrays for all statuses when the input is empty", () => {
    expect(groupShipmentsByStatus([])).toEqual({
      Pending: [],
      Assigned: [],
      "In transit": [],
      Delivered: [],
      Failed: [],
    });
  });

  it("does not mutate the input array or shipments", () => {
    const shipments = [makeShipment("SH-1"), makeShipment("SH-2", "Failed")];
    const original = [...shipments];

    groupShipmentsByStatus(shipments);

    expect(shipments).toEqual(original);
    expect(shipments[0]).toBe(original[0]);
    expect(shipments[1]).toBe(original[1]);
  });
});

describe("findTopCarriers", () => {
  it("counts assigned carrier strings, skips null, and returns top N", () => {
    const shipments = [
      makeShipment("SH-1", "Pending", "Carrier A"),
      makeShipment("SH-2", "Pending", "Carrier B"),
      makeShipment("SH-3", "Pending", "Carrier A"),
      makeShipment("SH-4", "Pending", null),
      makeShipment("SH-5", "Pending", "Carrier C"),
      makeShipment("SH-6", "Pending", "Carrier A"),
    ];

    expect(findTopCarriers(shipments, 2)).toEqual([
      { carrier: "Carrier A", count: 3 },
      { carrier: "Carrier B", count: 1 },
    ]);
  });

  it("returns all unique carriers when topN exceeds their count", () => {
    expect(
      findTopCarriers(
        [makeShipment("SH-1", "Pending", "Carrier A")],
        5,
      ),
    ).toEqual([{ carrier: "Carrier A", count: 1 }]);
  });

  it("returns an empty array for empty input and invalid topN values", () => {
    expect(findTopCarriers([], 1)).toEqual([]);
    const shipments = [makeShipment("SH-1", "Pending", "Carrier A")];
    expect(findTopCarriers(shipments, 0)).toEqual([]);
    expect(findTopCarriers(shipments, -1)).toEqual([]);
    expect(findTopCarriers(shipments, 1.5)).toEqual([]);
    expect(findTopCarriers(shipments, Number.NaN)).toEqual([]);
  });

  it("keeps the first-seen order for carriers with tied counts", () => {
    const shipments = [
      makeShipment("SH-1", "Pending", "Carrier B"),
      makeShipment("SH-2", "Pending", "Carrier A"),
    ];

    expect(findTopCarriers(shipments, 2)).toEqual([
      { carrier: "Carrier B", count: 1 },
      { carrier: "Carrier A", count: 1 },
    ]);
  });

  it("does not mutate the input array or shipments", () => {
    const shipments = [
      makeShipment("SH-1", "Pending", "Carrier A"),
      makeShipment("SH-2", "Pending", null),
    ];
    const original = [...shipments];

    findTopCarriers(shipments, 1);

    expect(shipments).toEqual(original);
    expect(shipments[0]).toBe(original[0]);
    expect(shipments[1]).toBe(original[1]);
  });
});
