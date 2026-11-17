import type { Carrier, Product, Shipment } from "../models.js";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateProduct(product: Product): ValidationResult {
  const errors: string[] = [];

  if (product.sku.length === 0) {
    errors.push("sku must not be empty");
  }
  if (product.weightKg <= 0 || product.weightKg > 100) {
    errors.push("weightKg must be greater than 0 and at most 100");
  }
  if (product.dimensions.lengthCm <= 0 || product.dimensions.lengthCm > 200) {
    errors.push("dimensions.lengthCm must be greater than 0 and at most 200");
  }
  if (product.dimensions.widthCm <= 0 || product.dimensions.widthCm > 200) {
    errors.push("dimensions.widthCm must be greater than 0 and at most 200");
  }
  if (product.dimensions.heightCm <= 0 || product.dimensions.heightCm > 200) {
    errors.push("dimensions.heightCm must be greater than 0 and at most 200");
  }
  if (product.stockQuantity < 0) {
    errors.push("stockQuantity must be at least 0");
  }
  if (product.minStockThreshold < 0) {
    errors.push("minStockThreshold must be at least 0");
  }
  if (product.unitCostUSD <= 0) {
    errors.push("unitCostUSD must be greater than 0");
  }

  return { valid: errors.length === 0, errors };
}

export function validateShipment(shipment: Shipment): ValidationResult {
  const errors: string[] = [];

  if (shipment.quantity <= 0) {
    errors.push("quantity must be greater than 0");
  }
  if (shipment.declaredValueUSD <= 0) {
    errors.push("declaredValueUSD must be greater than 0");
  }
  if (shipment.destination.distanceKm < 0) {
    errors.push("destination.distanceKm must be at least 0");
  }

  return { valid: errors.length === 0, errors };
}

export function validateCarrier(carrier: Carrier): ValidationResult {
  const errors: string[] = [];

  if (carrier.baseRateUSD < 0) {
    errors.push("baseRateUSD must be at least 0");
  }
  if (carrier.ratePerKgUSD < 0) {
    errors.push("ratePerKgUSD must be at least 0");
  }
  if (carrier.ratePerKmUSD < 0) {
    errors.push("ratePerKmUSD must be at least 0");
  }
  if (carrier.avgDeliveryDays <= 0) {
    errors.push("avgDeliveryDays must be greater than 0");
  }
  if (carrier.onTimeRate < 0 || carrier.onTimeRate > 100) {
    errors.push("onTimeRate must be between 0 and 100");
  }
  if (carrier.maxWeightKg <= 0) {
    errors.push("maxWeightKg must be greater than 0");
  }
  if (carrier.operatesIn.length < 1) {
    errors.push("operatesIn must contain at least one country");
  }

  return { valid: errors.length === 0, errors };
}
