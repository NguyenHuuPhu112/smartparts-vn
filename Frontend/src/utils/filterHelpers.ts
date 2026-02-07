import type { Product } from '../types';
import type { FilterState } from '../components/Sidebar/types';

/**
 * Apply all filters to a list of products
 */
export const applyFilters = (products: Product[], filters: FilterState): Product[] => {
    let filtered = [...products];

    // Filter by brands
    filtered = filterByBrands(filtered, filters.brands);

    // Filter by categories
    filtered = filterByCategories(filtered, filters.categories);

    // Filter by price range
    filtered = filterByPriceRange(filtered, filters.priceRange);

    return filtered;
};

/**
 * Filter products by selected brands
 */
export const filterByBrands = (products: Product[], selectedBrands: string[]): Product[] => {
    if (selectedBrands.length === 0) return products;

    return products.filter(p =>
        p.brand && selectedBrands.includes(p.brand)
    );
};

/**
 * Filter products by selected categories
 * Matches against product name and description
 */
export const filterByCategories = (products: Product[], selectedCategories: string[]): Product[] => {
    if (selectedCategories.length === 0) return products;

    return products.filter(p =>
        selectedCategories.some(cat =>
            p.name.toLowerCase().includes(cat.toLowerCase()) ||
            p.description?.toLowerCase().includes(cat.toLowerCase())
        )
    );
};

/**
 * Filter products by price range
 */
export const filterByPriceRange = (
    products: Product[],
    priceRange: { min: number; max: number } | null
): Product[] => {
    if (!priceRange) return products;

    return products.filter(p =>
        p.price >= priceRange.min &&
        p.price <= priceRange.max
    );
};

/**
 * Get unique brands from a list of products
 */
export const extractUniqueBrands = (products: Product[]): string[] => {
    const brands = products
        .map(p => p.brand)
        .filter((brand): brand is string => !!brand);

    return [...new Set(brands)].sort();
};

/**
 * Get unique categories from a list of products
 * (You might want to customize this based on your data structure)
 */
export const extractUniqueCategories = (products: Product[]): string[] => {
    // For now, return common categories
    // In the future, you might extract this from product metadata
    return ['Màn hình', 'Pin', 'Camera', 'Cảm ứng', 'Tai nghe', 'Sạc', 'Cáp', 'Ốp lưng'];
};
