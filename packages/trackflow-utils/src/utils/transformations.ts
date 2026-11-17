import type {
  Carrier,
  Product,
  ProductCategory,
  Shipment,
  ShipmentPriority,
  ShipmentStatus,
} from "../models.js";

export function countProductsByCategory(
  products: Product[],
): Record<ProductCategory, number> {
  const counts: Record<ProductCategory, number> = {
    Fashion: 0,
    Electronics: 0,
    Cosmetics: 0,
    Home: 0,
    Other: 0,
  };

  for (const product of products) {
    counts[product.category] += 1;
  }

  return counts;
}

export function groupShipmentsByStatus(
  shipments: Shipment[],
): Record<ShipmentStatus, Shipment[]> {
  const groups: Record<ShipmentStatus, Shipment[]> = {
    Pending: [],
    Assigned: [],
    "In transit": [],
    Delivered: [],
    Failed: [],
  };

  for (const shipment of shipments) {
    groups[shipment.status].push(shipment);
  }

  return groups;
}

export function findTopCarriers(
  shipments: Shipment[],
  topN: number,
): Array<{ carrier: string; count: number }> {
  if (!Number.isInteger(topN) || topN <= 0) {
    return [];
  }

  const counts = new Map<string, number>();
  for (const shipment of shipments) {
    const carrier = shipment.carrier;
    if (carrier === null) {
      continue;
    }
    counts.set(carrier, (counts.get(carrier) ?? 0) + 1);
  }

  return Array.from(counts, ([carrier, count]) => ({ carrier, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

export function calculateTotalInventoryValue(products: Product[]): number {
  const total = products.reduce(
    (sum, product) => sum + product.stockQuantity * product.unitCostUSD,
    0,
  );
  return Math.round(total * 100) / 100;
}

export function calculateAverageShipmentDistance(
  shipments: Shipment[],
): number {
  if (shipments.length === 0) {
    return 0;
  }

  const totalDistance = shipments.reduce(
    (sum, shipment) => sum + shipment.destination.distanceKm,
    0,
  );
  return Math.round((totalDistance / shipments.length) * 100) / 100;
}

export function calculateShippingCost(
  shipment: Shipment,
  product: Product,
  carrier: Carrier,
): number {
  const baseAndWeight =
    carrier.baseRateUSD +
    product.weightKg * carrier.ratePerKgUSD * shipment.quantity;
  const subtotal =
    baseAndWeight +
    shipment.destination.distanceKm * carrier.ratePerKmUSD;
  const surchargeByPriority: Record<ShipmentPriority, number> = {
    Standard: 0,
    Express: 0.3,
    "Same-day": 0.6,
  };
  const total = subtotal * (1 + surchargeByPriority[shipment.priority]);

  return Math.round(total * 100) / 100;
}

export function scoreCarrierForShipment(
  carrier: Carrier,
  shipment: Shipment,
  product: Product,
): number {
  let score = 0;

  if (carrier.operatesIn.includes(shipment.destination.country)) {
    score += 20;
  }
  if (product.weightKg * shipment.quantity <= carrier.maxWeightKg) {
    score += 20;
  }
  if (carrier.acceptsPriority.includes(shipment.priority)) {
    score += 15;
  }
  if (!product.isFragile || carrier.handlesFragile) {
    score += 15;
  }
  score += carrier.onTimeRate * 0.3;

  return Math.round(score * 100) / 100;
}

export function selectBestCarrier(
  carriers: Carrier[],
  shipment: Shipment,
  product: Product,
): { carrier: Carrier; score: number; cost: number } | null {
  let best: { carrier: Carrier; score: number; cost: number } | null = null;

  for (const carrier of carriers) {
    const score = scoreCarrierForShipment(carrier, shipment, product);
    if (score < 50) {
      continue;
    }

    const cost = calculateShippingCost(shipment, product, carrier);
    if (best === null || cost < best.cost) {
      best = { carrier, score, cost };
    }
  }

  return best;
}
