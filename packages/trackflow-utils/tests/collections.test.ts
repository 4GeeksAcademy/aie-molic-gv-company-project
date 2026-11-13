import { describe, expect, it } from "vitest";
import type { Product, WarehouseLocation } from "../src/models.js";
import { filterProductsByWarehouse } from "../src/utils/collections.js";

function makeProduct(sku: string, warehouse: WarehouseLocation): Product {
  return {
    sku,
    name: `Product ${sku}`,
    category: "Fashion",
    weightKg: 0.8,
    dimensions: { lengthCm: 35, widthCm: 22, heightCm: 12 },
    warehouse,
    stockQuantity: 12,
    minStockThreshold: 5,
    unitCostUSD: 35,
    isFragile: false,
    status: "Active",
  };
}

describe("filterProductsByWarehouse", () => {
  it("returns a single product in the requested warehouse", () => {
    const product = makeProduct("SHOE-BLK-42", "Zaragoza");

    expect(filterProductsByWarehouse([product], "Zaragoza")).toEqual([product]);
  });

  it("returns all matching products and preserves their input order", () => {
    const firstMatch = makeProduct("SHOE-BLK-42", "Zaragoza");
    const nonMatch = makeProduct("PERFUME-COCO-50", "Los Angeles");
    const secondMatch = makeProduct("LAPTOP-DELL-15", "Zaragoza");

    expect(
      filterProductsByWarehouse([firstMatch, nonMatch, secondMatch], "Zaragoza"),
    ).toEqual([firstMatch, secondMatch]);
  });

  it("returns an empty array when no products match", () => {
    const product = makeProduct("SHOE-BLK-42", "Los Angeles");

    expect(filterProductsByWarehouse([product], "Zaragoza")).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(filterProductsByWarehouse([], "Zaragoza")).toEqual([]);
  });

  it("does not modify the input array or its products", () => {
    const products = [
      makeProduct("SHOE-BLK-42", "Los Angeles"),
      makeProduct("LAPTOP-DELL-15", "Zaragoza"),
    ];
    const originalOrder = [...products];
    const originalValues = products.map((product) => ({
      ...product,
      dimensions: { ...product.dimensions },
    }));

    filterProductsByWarehouse(products, "Zaragoza");

    expect(products).toEqual(originalValues);
    expect(products[0]).toBe(originalOrder[0]);
    expect(products[1]).toBe(originalOrder[1]);
  });
});