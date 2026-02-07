// ============================================
// TypeScript Interfaces & Types
// ============================================

export interface Product {
    id: number | string;
    name: string;
    slug?: string;
    category: string;
    categoryId: string;
    price: number;
    originalPrice: number;
    discount: number;
    sold: number;
    rating: number | string;
    reviews?: number;
    image: string;
    images?: string[];
    inStock: boolean;
    isFeatured?: boolean;
    isNew?: boolean;
    isHot?: boolean;
    description?: string;
    shortDescription?: string;
    brand?: string;
    sku?: string;
    warranty?: string;
    specifications?: Specification[];
}

export interface Specification {
    label: string;
    value: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    color?: string;
    description?: string;
    productCount?: number;
}

export interface NewsArticle {
    id: number | string;
    title: string;
    slug?: string;
    excerpt: string;
    content?: string;
    category: string;
    author: string;
    authorAvatar?: string;
    date: string;
    readTime: string;
    views: number;
    image: string;
    featured?: boolean;
    tags?: string[];
}

export interface FilterOptions {
    brands?: string[];
    priceRanges?: PriceRange[];
    categories?: string[];
}

export interface PriceRange {
    label: string;
    min: number;
    max: number;
}

export interface Review {
    id: number;
    productId: number | string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: number | string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    address?: string;
}
