import type { Product, Shipment } from "../models.js";

export function findProductBySKU(
    products: Product[], 
    sku: string,
): Product | null {
    for (const product of products){
        if (product.sku.toLocaleLowerCase()=== sku.toLocaleLowerCase()){
            return product;
        }
    }
    return null;

}

export function findShipmentById(
    shipments: Shipment[],
    id: string,
): Shipment | null {
    for(const shipment of shipments){
        if (shipment.id === id){
            return shipment;
        }
    }
    return null;
}

export function binarySearchProductByWeight(
    sortedProducts: Product[],
    targetWeight: number,
): number {
    let low = 0;
    let high = sortedProducts.length - 1;

    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const weight = sortedProducts[middle].weightKg;

        if (weight === targetWeight) {
            return middle;
        }
        if (weight < targetWeight) {
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }

    return -1;
}