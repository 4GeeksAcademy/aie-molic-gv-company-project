const date = (day, hour = 9) => new Date(Date.UTC(2026, 10, day, hour));

export const products = [
  { sku: 'TF-1001', name: 'Everyday Tote', category: 'Fashion', weightKg: 0.42, dimensions: { lengthCm: 38, widthCm: 30, heightCm: 4 }, warehouse: 'Los Angeles', stockQuantity: 184, minStockThreshold: 35, unitCostUSD: 18.5, isFragile: false, status: 'Active' },
  { sku: 'TF-1002', name: 'Studio Headphones', category: 'Electronics', weightKg: 1.25, dimensions: { lengthCm: 24, widthCm: 20, heightCm: 12 }, warehouse: 'Los Angeles', stockQuantity: 28, minStockThreshold: 30, unitCostUSD: 89.99, isFragile: true, status: 'Active' },
  { sku: 'TF-1003', name: 'Daily Serum Set', category: 'Cosmetics', weightKg: 0.68, dimensions: { lengthCm: 18, widthCm: 14, heightCm: 8 }, warehouse: 'Zaragoza', stockQuantity: 92, minStockThreshold: 25, unitCostUSD: 32.75, isFragile: true, status: 'Active' },
  { sku: 'TF-1004', name: 'Linen Table Runner', category: 'Home', weightKg: 0.95, dimensions: { lengthCm: 42, widthCm: 16, heightCm: 8 }, warehouse: 'Zaragoza', stockQuantity: 14, minStockThreshold: 20, unitCostUSD: 24, isFragile: false, status: 'Active' },
  { sku: 'TF-1005', name: 'Ceramic Pour-over', category: 'Home', weightKg: 1.25, dimensions: { lengthCm: 18, widthCm: 15, heightCm: 14 }, warehouse: 'Los Angeles', stockQuantity: 42, minStockThreshold: 18, unitCostUSD: 27.5, isFragile: true, status: 'Active' },
  { sku: 'TF-1006', name: 'Travel Organizer', category: 'Fashion', weightKg: 0.32, dimensions: { lengthCm: 26, widthCm: 18, heightCm: 5 }, warehouse: 'Zaragoza', stockQuantity: 0, minStockThreshold: 15, unitCostUSD: 12.25, isFragile: false, status: 'Active' },
  { sku: 'TF-1007', name: 'Smart Desk Lamp', category: 'Electronics', weightKg: 2.4, dimensions: { lengthCm: 31, widthCm: 24, heightCm: 16 }, warehouse: 'Los Angeles', stockQuantity: 67, minStockThreshold: 12, unitCostUSD: 54.9, isFragile: true, status: 'Active' },
  { sku: 'TF-1008', name: 'Botanical Hand Cream', category: 'Cosmetics', weightKg: 0.22, dimensions: { lengthCm: 12, widthCm: 8, heightCm: 5 }, warehouse: 'Zaragoza', stockQuantity: 19, minStockThreshold: 20, unitCostUSD: 9.75, isFragile: false, status: 'Active' },
  { sku: 'TF-1009', name: 'Canvas Market Bag', category: 'Fashion', weightKg: 0.42, dimensions: { lengthCm: 35, widthCm: 28, heightCm: 3 }, warehouse: 'Los Angeles', stockQuantity: 108, minStockThreshold: 25, unitCostUSD: 16.8, isFragile: false, status: 'Active' },
  { sku: 'TF-1010', name: 'Wireless Speaker', category: 'Electronics', weightKg: 1.8, dimensions: { lengthCm: 22, widthCm: 19, heightCm: 11 }, warehouse: 'Zaragoza', stockQuantity: 33, minStockThreshold: 20, unitCostUSD: 68.5, isFragile: true, status: 'Active' },
  { sku: 'TF-1011', name: 'Gift Wrap Kit', category: 'Other', weightKg: 0.55, dimensions: { lengthCm: 30, widthCm: 22, heightCm: 6 }, warehouse: 'Los Angeles', stockQuantity: 7, minStockThreshold: 10, unitCostUSD: 8.4, isFragile: false, status: 'Active' },
  { sku: 'TF-1012', name: 'Glass Water Bottle', category: 'Other', weightKg: 0.72, dimensions: { lengthCm: 26, widthCm: 8, heightCm: 8 }, warehouse: 'Zaragoza', stockQuantity: 56, minStockThreshold: 16, unitCostUSD: 14.95, isFragile: true, status: 'Active' },
];

export const carriers = [
  { id: 'CR-01', name: 'Northstar Parcel', operatesIn: ['United States'], baseRateUSD: 4.25, ratePerKgUSD: 1.35, ratePerKmUSD: 0.012, avgDeliveryDays: 2.4, onTimeRate: 96.4, maxWeightKg: 25, handlesFragile: true, acceptsPriority: ['Standard', 'Express', 'Same-day'] },
  { id: 'CR-02', name: 'BlueOak Express', operatesIn: ['United States', 'Spain'], baseRateUSD: 6.1, ratePerKgUSD: 1.05, ratePerKmUSD: 0.009, avgDeliveryDays: 1.8, onTimeRate: 93.2, maxWeightKg: 18, handlesFragile: true, acceptsPriority: ['Standard', 'Express'] },
  { id: 'CR-03', name: 'Iberia Route Co.', operatesIn: ['Spain'], baseRateUSD: 3.8, ratePerKgUSD: 0.95, ratePerKmUSD: 0.011, avgDeliveryDays: 2.7, onTimeRate: 98.1, maxWeightKg: 30, handlesFragile: false, acceptsPriority: ['Standard', 'Express', 'Same-day'] },
  { id: 'CR-04', name: 'Swift Harbor', operatesIn: ['United States', 'Spain'], baseRateUSD: 7.2, ratePerKgUSD: 1.6, ratePerKmUSD: 0.008, avgDeliveryDays: 1.3, onTimeRate: 89.5, maxWeightKg: 12, handlesFragile: true, acceptsPriority: ['Express', 'Same-day'] },
];

const destination = (city, country, distanceKm) => ({ city, country, distanceKm });
export const shipments = [
  { id: 'SH-5001', sku: 'TF-1001', quantity: 2, origin: 'Los Angeles', destination: destination('San Francisco', 'United States', 615), priority: 'Standard', declaredValueUSD: 37, carrier: 'Northstar Parcel', status: 'Delivered', createdAt: date(2, 10) },
  { id: 'SH-5002', sku: 'TF-1002', quantity: 1, origin: 'Los Angeles', destination: destination('San Diego', 'United States', 195), priority: 'Express', declaredValueUSD: 89.99, carrier: 'BlueOak Express', status: 'In transit', createdAt: date(3, 13) },
  { id: 'SH-5003', sku: 'TF-1003', quantity: 3, origin: 'Zaragoza', destination: destination('Madrid', 'Spain', 315), priority: 'Standard', declaredValueUSD: 98.25, carrier: 'Iberia Route Co.', status: 'Delivered', createdAt: date(4, 8) },
  { id: 'SH-5004', sku: 'TF-1004', quantity: 1, origin: 'Zaragoza', destination: destination('Barcelona', 'Spain', 310), priority: 'Same-day', declaredValueUSD: 24, carrier: 'Swift Harbor', status: 'Assigned', createdAt: date(5, 11) },
  { id: 'SH-5005', sku: 'TF-1005', quantity: 2, origin: 'Los Angeles', destination: destination('Seattle', 'United States', 1825), priority: 'Express', declaredValueUSD: 55, carrier: 'Northstar Parcel', status: 'In transit', createdAt: date(6, 9) },
  { id: 'SH-5006', sku: 'TF-1006', quantity: 1, origin: 'Zaragoza', destination: destination('Valencia', 'Spain', 310), priority: 'Standard', declaredValueUSD: 12.25, carrier: null, status: 'Pending', createdAt: date(7, 14) },
  { id: 'SH-5007', sku: 'TF-1007', quantity: 1, origin: 'Los Angeles', destination: destination('Phoenix', 'United States', 595), priority: 'Express', declaredValueUSD: 54.9, carrier: 'BlueOak Express', status: 'Delivered', createdAt: date(8, 10) },
  { id: 'SH-5008', sku: 'TF-1008', quantity: 4, origin: 'Zaragoza', destination: destination('Seville', 'Spain', 790), priority: 'Standard', declaredValueUSD: 39, carrier: 'Iberia Route Co.', status: 'Failed', createdAt: date(9, 12) },
  { id: 'SH-5009', sku: 'TF-1009', quantity: 2, origin: 'Los Angeles', destination: destination('Portland', 'United States', 965), priority: 'Same-day', declaredValueUSD: 33.6, carrier: 'Northstar Parcel', status: 'Assigned', createdAt: date(10, 7) },
  { id: 'SH-5010', sku: 'TF-1010', quantity: 1, origin: 'Zaragoza', destination: destination('Bilbao', 'Spain', 325), priority: 'Express', declaredValueUSD: 68.5, carrier: 'Swift Harbor', status: 'Delivered', createdAt: date(11, 15) },
  { id: 'SH-5011', sku: 'TF-1011', quantity: 5, origin: 'Los Angeles', destination: destination('Las Vegas', 'United States', 435), priority: 'Standard', declaredValueUSD: 42, carrier: null, status: 'Pending', createdAt: date(12, 9) },
  { id: 'SH-5012', sku: 'TF-1012', quantity: 2, origin: 'Zaragoza', destination: destination('Malaga', 'Spain', 980), priority: 'Express', declaredValueUSD: 29.9, carrier: 'Iberia Route Co.', status: 'Failed', createdAt: date(13, 16) },
];

export function cloneFixtures() {
  return {
    products: structuredClone(products),
    shipments: structuredClone(shipments),
    carriers: structuredClone(carriers),
  };
}
