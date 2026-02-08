import type { Product } from '../pages/admin/AdminProducts/types';
import {
    phonePartsProducts,
    ipadPartsProducts,
    glassSuppliesProducts,
    toolsEquipmentProducts,
    accessoriesProducts
} from '../data/mockData';

// Cấu hình API Backend Java
// Khi nào Backend xong, bạn đổi USE_MOCK = false
const USE_MOCK = true;
const API_URL = 'http://localhost:8080/api/products';

const STORAGE_KEY = 'smartparts_products_v2';

// Helper: Initialize data for Mock Mode
const initializeMockData = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        const initialProducts = [
            ...phonePartsProducts,
            ...ipadPartsProducts,
            ...glassSuppliesProducts,
            ...toolsEquipmentProducts,
            ...accessoriesProducts
        ];

        const mappedProducts = initialProducts.map((p: any) => ({
            ...p,
            id: p.id,
            sku: p.sku || `SKU-${Math.random().toString(36).substr(2, 6)}`,
            stock: p.stock || 100,
            inStock: true,
            isFeatured: p.isFeatured,
            isHot: p.isHot
        }));

        localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedProducts));
        return mappedProducts;
    }
    return JSON.parse(stored);
};

export const ProductService = {
    // GET ALL
    getAll: async (): Promise<Product[]> => {
        if (USE_MOCK) {
            return initializeMockData();
        }
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    // GET BY ID
    getById: async (id: number | string): Promise<Product | undefined> => {
        if (USE_MOCK) {
            const products = initializeMockData();
            return products.find((p: Product) => p.id == id);
        }
        try {
            const response = await fetch(`${API_URL}/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return undefined;
        }
    },

    // ADD
    add: async (product: Product): Promise<Product[]> => {
        if (USE_MOCK) {
            const products = initializeMockData();
            const newProducts = [product, ...products];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
            window.dispatchEvent(new Event('product-storage-update'));
            return newProducts;
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            const savedProduct = await response.json();
            // Refetch or return updated list logic
            // For simplicity, returning current list + new
            return [savedProduct]; // Note: UI logic might need adjustment if it expects full list
        } catch (error) {
            console.error('Error adding product:', error);
            return [];
        }
    },

    // ADD BATCH (Import Excel)
    addBatch: async (products: Product[]): Promise<Product[]> => {
        if (USE_MOCK) {
            const currentProducts = initializeMockData();
            const newProducts = [...products, ...currentProducts];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
            window.dispatchEvent(new Event('product-storage-update'));
            return newProducts;
        }
        try {
            // Giả sử Backend có endpoint /batch
            const response = await fetch(`${API_URL}/batch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(products)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding batch products:', error);
            return [];
        }
    },

    // UPDATE
    update: async (product: Product): Promise<Product[]> => {
        if (USE_MOCK) {
            const products = initializeMockData();
            const newProducts = products.map((p: Product) => p.id === product.id ? product : p);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
            window.dispatchEvent(new Event('product-storage-update'));
            return newProducts;
        }
        try {
            await fetch(`${API_URL}/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            // Return updated list logic
            return [];
        } catch (error) {
            console.error('Error updating product:', error);
            return [];
        }
    },

    // DELETE
    delete: async (id: number | string): Promise<Product[]> => {
        if (USE_MOCK) {
            const products = initializeMockData();
            const newProducts = products.filter((p: Product) => p.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
            window.dispatchEvent(new Event('product-storage-update'));
            return newProducts;
        }
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            return [];
        } catch (error) {
            console.error('Error deleting product:', error);
            return [];
        }
    }
};
