import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '../pages/admin/AdminProducts/types';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to parse cart from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart to localStorage', error);
        }
    }, [cartItems]);

    const addToCart = (product: Product, quantity: number) => {
        setCartItems(prev => {
            const existingIndex = prev.findIndex(item => item.id === product.id);
            if (existingIndex >= 0) {
                const newCart = [...prev];
                newCart[existingIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prev, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
