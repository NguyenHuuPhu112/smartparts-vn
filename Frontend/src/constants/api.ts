// API configuration

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
    // Products
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id: string) => `/products/${id}`,
    PRODUCT_SEARCH: '/products/search',

    // Categories
    CATEGORIES: '/categories',

    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',

    // Cart
    CART: '/cart',
    ADD_TO_CART: '/cart/add',
    REMOVE_FROM_CART: '/cart/remove',

    // Orders
    ORDERS: '/orders',
    ORDER_BY_ID: (id: string) => `/orders/${id}`,
} as const;
