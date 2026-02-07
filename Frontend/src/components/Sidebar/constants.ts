import type { PriceRange } from './types';

// Default categories if not provided
export const DEFAULT_CATEGORIES = [
    'Màn hình',
    'Pin',
    'Camera',
    'Cảm ứng',
    'Tai nghe',
    'Sạc',
    'Cáp',
    'Ốp lưng'
];

// Default brands if not provided
export const DEFAULT_BRANDS = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'Oppo',
    'Vivo',
    'Realme',
    'Huawei',
    'Nokia'
];

// Price ranges for filtering
export const PRICE_RANGES: PriceRange[] = [
    { label: 'Dưới 500k', min: 0, max: 500000 },
    { label: '500k - 1 triệu', min: 500000, max: 1000000 },
    { label: '1 - 3 triệu', min: 1000000, max: 3000000 },
    { label: '3 - 5 triệu', min: 3000000, max: 5000000 },
    { label: 'Trên 5 triệu', min: 5000000, max: 999999999 },
];
