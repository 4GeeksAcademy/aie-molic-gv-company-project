export type {
  Carrier,
  Country,
  Destination,
  Dimensions,
  InventoryMovement,
  MovementType,
  Product,
  ProductCategory,
  ProductStatus,
  Shipment,
  ShipmentPriority,
  ShipmentStatus,
  WarehouseLocation,
} from "./models.js";

export {
  filterProductsByWarehouse,
  filterProductsByCategory,
  filterLowStockProducts,
  sortProductsByStock,
  sortCarriersByReliability,
} from "./utils/collections.js";

export {
  findProductBySKU,
  findShipmentById,
  binarySearchProductByWeight,
} from "./utils/search.js";

export {
  calculateShippingCost,
  scoreCarrierForShipment,
  selectBestCarrier,
  countProductsByCategory,
  calculateTotalInventoryValue,
  calculateAverageShipmentDistance,
  groupShipmentsByStatus,
  findTopCarriers,
} from "./utils/transformations.js";

export {
  validateProduct,
  validateShipment,
  validateCarrier,
} from "./utils/validations.js";
export type { ValidationResult } from "./utils/validations.js";