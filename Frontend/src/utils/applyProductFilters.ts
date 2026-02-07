import type { FilterState } from '../components/Sidebar';

/**
 * Apply filters to a list of products
 * This is a simple version that doesn't use hooks, safe to call in render functions
 */
export function applyProductFilters<T extends { category?: string; brand?: string; price: number; name?: string }>(
    products: T[],
    filters: FilterState
): T[] {
    return products.filter(product => {
        // Filter by categories
        if (filters.categories.length > 0) {
            const productCategory = (product.category || '').toLowerCase();
            const productName = (product.name || '').toLowerCase();

            // Check if ANY of the selected categories match
            const matchesCategory = filters.categories.some(filterCat => {
                const filterLower = filterCat.toLowerCase();
                // Check if product category matches exactly
                if (productCategory === filterLower) return true;
                // Check if product name contains the category keyword (e.g. "Màn hình" in "Màn hình iPhone...")
                if (productName.includes(filterLower)) return true;
                return false;
            });

            if (!matchesCategory) return false;
        }

        // Filter by brands
        if (filters.brands.length > 0) {
            if (!filters.brands.includes(product.brand || '')) {
                return false;
            }
        }

        // Filter by price range
        if (filters.priceRange) {
            if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
                return false;
            }
        }

        return true;
    });
}
