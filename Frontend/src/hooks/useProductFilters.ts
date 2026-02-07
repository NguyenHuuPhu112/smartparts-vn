import { useMemo } from 'react';
import type { Product } from '../types';
import type { FilterState } from '../components/Sidebar/types';
import { applyFilters, extractUniqueBrands, extractUniqueCategories } from '../utils/filterHelpers';

interface UseProductFiltersProps {
    products: Product[];
    filters: FilterState;
}

interface UseProductFiltersReturn {
    filteredProducts: Product[];
    availableBrands: string[];
    availableCategories: string[];
    totalCount: number;
    filteredCount: number;
}

/**
 * Custom hook for product filtering logic
 * Handles filtering, extracting unique values, and counting
 */
export const useProductFilters = ({
    products,
    filters
}: UseProductFiltersProps): UseProductFiltersReturn => {
    // Extract unique brands from all products
    const availableBrands = useMemo(() => {
        return extractUniqueBrands(products);
    }, [products]);

    // Extract unique categories from all products
    const availableCategories = useMemo(() => {
        return extractUniqueCategories(products);
    }, [products]);

    // Apply filters to get filtered products
    const filteredProducts = useMemo(() => {
        return applyFilters(products, filters);
    }, [products, filters]);

    // Count metrics
    const totalCount = products.length;
    const filteredCount = filteredProducts.length;

    return {
        filteredProducts,
        availableBrands,
        availableCategories,
        totalCount,
        filteredCount,
    };
};
