import type {
  Carrier,
  Product,
  ProductCategory,
  WarehouseLocation,
} from "../models.js";

export function filterProductsByWarehouse(
  products: Product[],
  warehouse: WarehouseLocation,
): Product[] {
  const result = products.filter((product) => {
  return product.warehouse === warehouse; 
  });
  return result;
}

export function filterProductsByCategory(
  products: Product[],
  category: ProductCategory,
): Product[] {
  const productsInCategory = products.filter(
    (product) => product.category === category
  );
  return productsInCategory;
}

export function filterLowStockProducts(products: Product[]): Product[] {
  const productStock = products.filter(
    (product) => product.stockQuantity <= product.minStockThreshold
  );
  return productStock
}

export function sortProductsByStock(
  products: Product[],
  order: "asc" | "desc",
): Product[] {
  return [...products].sort((a, b) => {
    if (order === "asc") {
      return a.stockQuantity - b.stockQuantity;
    }

    return b.stockQuantity - a.stockQuantity;
  });
}

export function sortCarriersByReliability(
  carriers: Carrier[],
  order: "asc" | "desc",
): Carrier[] {
  return [...carriers].sort((a, b) => {
    if (order === "asc") {
      return a.onTimeRate - b.onTimeRate;
    }

    return b.onTimeRate - a.onTimeRate;
  });
}