import type { Product, WarehouseLocation } from "../models.js";

export function filterProductsByWarehouse(
  products: Product[],
  warehouse: WarehouseLocation,
): Product[] {
  const result = products.filter((product) => {
  return product.warehouse === warehouse; 
  });
  return result;
}       