// Application routes constants

export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    CART: '/cart',
    CHECKOUT: '/checkout',
    PROFILE: '/profile',
    LOGIN: '/login',
    REGISTER: '/register',
} as const;

export type RouteKey = keyof typeof ROUTES;
