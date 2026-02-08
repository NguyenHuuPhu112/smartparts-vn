// Product Types & Interfaces

export interface Product {
    id: number | string;
    name: string;
    sku?: string;
    category: string;
    brand?: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    sold: number;
    rating: number | string;
    inStock: boolean;
    stock?: number;
    image: string;
    description?: string;
    isFeatured?: boolean;
    isHot?: boolean;
    categoryId?: string;
}

export interface ProductFormData {
    name: string;
    sku: string;
    category: string;
    brand: string;
    price: number;
    originalPrice: number;
    stock: number;
    inStock: boolean;
    image: string;
    description: string;
}

export type StockFilter = 'all' | 'inStock' | 'outOfStock';

export const CATEGORIES = [
    'Linh kiện điện thoại',
    'Linh kiện iPad',
    'Vật tư ép kính',
    'Dụng cụ thiết bị',
    'Phụ kiện'
] as const;

export const BRANDS = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'OPPO',
    'Vivo',
    'Realme',
    'Huawei',
    'Generic'
] as const;

export const ITEMS_PER_PAGE = 10;
