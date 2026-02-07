import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryLayout from '../layouts/CategoryLayout';
import CategoryPageTemplate from './category/CategoryPageTemplate';
import {
    phonePartsProducts,
    ipadPartsProducts,
    glassSuppliesProducts,
    toolsEquipmentProducts,
    accessoriesProducts
} from '../data/mockData';
import { applyProductFilters } from '../utils/applyProductFilters';

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    // 1. Combine all products into a single list
    const allProducts = useMemo(() => {
        return [
            ...phonePartsProducts,
            ...ipadPartsProducts,
            ...glassSuppliesProducts,
            ...toolsEquipmentProducts,
            ...accessoriesProducts
        ];
    }, []);

    // 2. Filter products based on search query
    const searchResults = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase().trim();
        return allProducts.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            (product.brand && product.brand.toLowerCase().includes(lowerQuery)) ||
            (product.category && product.category.toLowerCase().includes(lowerQuery))
        );
    }, [query, allProducts]);

    // 3. Extract available brands from SEARCH RESULTS for the sidebar filter
    const availableBrands = useMemo(() => {
        const brands = searchResults
            .map(p => p.brand)
            .filter((brand): brand is string => !!brand);
        return [...new Set(brands)].sort();
    }, [searchResults]);

    // 4. Extract available categories from SEARCH RESULTS for the sidebar filter
    const availableCategories = useMemo(() => {
        const categories = searchResults
            .map(p => p.category)
            .filter((cat): cat is string => !!cat);
        return [...new Set(categories)].sort();
    }, [searchResults]);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                // Apply sidebar filters ON TOP of search results
                const filteredResults = applyProductFilters(searchResults, filters);

                return (
                    <CategoryPageTemplate
                        title={`Kết quả tìm kiếm: "${query}"`}
                        description={`Tìm thấy ${filteredResults.length} sản phẩm phù hợp với từ khóa "${query}"`}
                        products={filteredResults}
                        filters={{
                            brands: availableBrands,
                            priceRanges: [
                                { label: 'Dưới 500K', min: 0, max: 500000 },
                                { label: '500K - 1 triệu', min: 500000, max: 1000000 },
                                { label: '1 - 3 triệu', min: 1000000, max: 3000000 },
                                { label: '3 - 5 triệu', min: 3000000, max: 5000000 },
                                { label: 'Trên 5 triệu', min: 5000000, max: 999999999 },
                            ]
                        }}
                    />
                );
            }}
        </CategoryLayout>
    );
};

export default SearchPage;
