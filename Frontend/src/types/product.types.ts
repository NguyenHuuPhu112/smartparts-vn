// Product related TypeScript types

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    category: string;
    brand: string;
    inStock: boolean;
    rating?: number;
    reviews?: number;
}

export interface ProductFilter {
    categories?: string[];
    brands?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    searchQuery?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
