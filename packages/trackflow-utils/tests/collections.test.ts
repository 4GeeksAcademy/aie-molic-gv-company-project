import { describe, expect, it } from "vitest";
import type {
  Carrier,
  Product,
  ProductCategory,
  WarehouseLocation,
} from "../src/models.js";
import {
  filterProductsByCategory,
  filterProductsByWarehouse,
  filterLowStockProducts,
  sortProductsByStock,
  sortCarriersByReliability,
} from "../src/utils/collections.js";

function makeProduct(
  sku: string,
  warehouse: WarehouseLocation,
  category: ProductCategory = "Fashion",
): Product {
  return {
    sku,
    name: `Product ${sku}`,
    category,
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

function makeCarrier(id: string, onTimeRate: number): Carrier {
  return {
    id,
    name: `Carrier ${id}`,
    operatesIn: ["Spain"],
    baseRateUSD: 5,
    ratePerKgUSD: 1,
    ratePerKmUSD: 0.05,
    avgDeliveryDays: 2,
    onTimeRate,
    maxWeightKg: 25,
    handlesFragile: true,
    acceptsPriority: ["Standard"],
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

describe("filterProductsByCategory", () => {
  it("returns a single product in the requested category", () => {
    const product = makeProduct("LAPTOP-DELL-15", "Zaragoza", "Electronics");

    expect(filterProductsByCategory([product], "Electronics")).toEqual([product]);
  });

  it("returns all matching products and preserves their input order", () => {
    const firstMatch = makeProduct("SHOE-BLK-42", "Los Angeles", "Fashion");
    const nonMatch = makeProduct("LAPTOP-DELL-15", "Zaragoza", "Electronics");
    const secondMatch = makeProduct("JACKET-RED-M", "Zaragoza", "Fashion");

    expect(
      filterProductsByCategory(
        [firstMatch, nonMatch, secondMatch],
        "Fashion",
      ),
    ).toEqual([firstMatch, secondMatch]);
  });

  it("returns an empty array when no products match", () => {
    const product = makeProduct("SHOE-BLK-42", "Los Angeles", "Fashion");

    expect(filterProductsByCategory([product], "Electronics")).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(filterProductsByCategory([], "Cosmetics")).toEqual([]);
  });

  it("does not modify the input array or its products", () => {
    const products = [
      makeProduct("SHOE-BLK-42", "Los Angeles", "Fashion"),
      makeProduct("LAPTOP-DELL-15", "Zaragoza", "Electronics"),
    ];
    const originalOrder = [...products];
    const originalValues = products.map((product) => ({
      ...product,
      dimensions: { ...product.dimensions },
    }));

    filterProductsByCategory(products, "Fashion");

    expect(products).toEqual(originalValues);
    expect(products[0]).toBe(originalOrder[0]);
    expect(products[1]).toBe(originalOrder[1]);
  });
});

describe("filterLowStockProducts", () => {
  it("returns a product below its minimum stock threshold", () => {
    const product = {
      ...makeProduct("SHOE-BLK-42", "Zaragoza"),
      stockQuantity: 4,
      minStockThreshold: 5,
    };

    expect(filterLowStockProducts([product])).toEqual([product]);
  });

  it("includes a product exactly at its minimum stock threshold", () => {
    const product = {
      ...makeProduct("LAPTOP-DELL-15", "Zaragoza"),
      stockQuantity: 5,
      minStockThreshold: 5,
    };

    expect(filterLowStockProducts([product])).toEqual([product]);
  });

  it("excludes a product above its minimum stock threshold", () => {
    const product = {
      ...makeProduct("PERFUME-COCO-50", "Los Angeles"),
      stockQuantity: 6,
      minStockThreshold: 5,
    };

    expect(filterLowStockProducts([product])).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(filterLowStockProducts([])).toEqual([]);
  });

  it("does not modify the input array or its products", () => {
    const products = [
      {
        ...makeProduct("SHOE-BLK-42", "Los Angeles"),
        stockQuantity: 2,
        minStockThreshold: 5,
      },
      {
        ...makeProduct("LAPTOP-DELL-15", "Zaragoza"),
        stockQuantity: 8,
        minStockThreshold: 5,
      },
    ];
    const originalOrder = [...products];
    const originalValues = products.map((product) => ({
      ...product,
      dimensions: { ...product.dimensions },
    }));

    filterLowStockProducts(products);

    expect(products).toEqual(originalValues);
    expect(products[0]).toBe(originalOrder[0]);
    expect(products[1]).toBe(originalOrder[1]);
  });
});

describe("sortProductsByStock", () => {
  it("sorts products by stock in ascending order", () => {
    const products = [
      { ...makeProduct("SHOE-BLK-42", "Zaragoza"), stockQuantity: 12 },
      { ...makeProduct("LAPTOP-DELL-15", "Zaragoza"), stockQuantity: 4 },
      { ...makeProduct("PERFUME-COCO-50", "Los Angeles"), stockQuantity: 8 },
    ];

    expect(sortProductsByStock(products, "asc").map((product) => product.stockQuantity))
      .toEqual([4, 8, 12]);
  });

  it("sorts products by stock in descending order", () => {
    const products = [
      { ...makeProduct("SHOE-BLK-42", "Zaragoza"), stockQuantity: 12 },
      { ...makeProduct("LAPTOP-DELL-15", "Zaragoza"), stockQuantity: 4 },
      { ...makeProduct("PERFUME-COCO-50", "Los Angeles"), stockQuantity: 8 },
    ];

    expect(sortProductsByStock(products, "desc").map((product) => product.stockQuantity))
      .toEqual([12, 8, 4]);
  });

  it("returns an empty array for an empty input", () => {
    expect(sortProductsByStock([], "asc")).toEqual([]);
  });

  it("returns a one-product array unchanged in ordering", () => {
    const product = makeProduct("SHOE-BLK-42", "Zaragoza");

    expect(sortProductsByStock([product], "desc")).toEqual([product]);
  });

  it("does not modify the input array or its products", () => {
    const products = [
      { ...makeProduct("SHOE-BLK-42", "Zaragoza"), stockQuantity: 8 },
      { ...makeProduct("LAPTOP-DELL-15", "Zaragoza"), stockQuantity: 2 },
    ];
    const originalOrder = [...products];
    const originalValues = products.map((product) => ({
      ...product,
      dimensions: { ...product.dimensions },
    }));

    sortProductsByStock(products, "asc");

    expect(products).toEqual(originalValues);
    expect(products[0]).toBe(originalOrder[0]);
    expect(products[1]).toBe(originalOrder[1]);
  });
});

describe("sortCarriersByReliability", () => {
  it("sorts carriers by reliability in ascending order", () => {
    const carriers = [
      makeCarrier("CAR-DHL", 95),
      makeCarrier("CAR-SEUR", 82),
      makeCarrier("CAR-UPS", 90),
    ];

    expect(sortCarriersByReliability(carriers, "asc").map((carrier) => carrier.onTimeRate))
      .toEqual([82, 90, 95]);
  });

  it("sorts carriers by reliability in descending order", () => {
    const carriers = [
      makeCarrier("CAR-DHL", 95),
      makeCarrier("CAR-SEUR", 82),
      makeCarrier("CAR-UPS", 90),
    ];

    expect(sortCarriersByReliability(carriers, "desc").map((carrier) => carrier.onTimeRate))
      .toEqual([95, 90, 82]);
  });

  it("returns an empty array for an empty input", () => {
    expect(sortCarriersByReliability([], "asc")).toEqual([]);
  });

  it("returns a one-carrier array unchanged in ordering", () => {
    const carrier = makeCarrier("CAR-DHL", 95);

    expect(sortCarriersByReliability([carrier], "desc")).toEqual([carrier]);
  });

  it("does not modify the input array or its carriers", () => {
    const carriers = [makeCarrier("CAR-DHL", 95), makeCarrier("CAR-SEUR", 82)];
    const originalOrder = [...carriers];
    const originalValues = carriers.map((carrier) => ({ ...carrier }));

    sortCarriersByReliability(carriers, "asc");

    expect(carriers).toEqual(originalValues);
    expect(carriers[0]).toBe(originalOrder[0]);
    expect(carriers[1]).toBe(originalOrder[1]);
  });
});