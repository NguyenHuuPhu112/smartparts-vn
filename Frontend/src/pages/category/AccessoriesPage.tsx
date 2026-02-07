import React, { useMemo } from 'react';
import CategoryLayout from '../../layouts/CategoryLayout';
import CategoryPageTemplate from './CategoryPageTemplate';
import { accessoriesProducts } from '../../data/mockData';
import { applyProductFilters } from '../../utils/applyProductFilters';

const AccessoriesPage: React.FC = () => {
    const availableBrands = useMemo(() => {
        const brands = accessoriesProducts
            .map(p => p.brand)
            .filter((brand): brand is string => !!brand);
        return [...new Set(brands)].sort();
    }, []);

    const availableCategories = useMemo(() => {
        return ['Cáp sạc', 'Củ sạc', 'Ốp lưng', 'Tai nghe', 'Pin dự phòng', 'Dán màn hình'];
    }, []);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                const filteredProducts = applyProductFilters(accessoriesProducts, filters);

                return (
                    <CategoryPageTemplate
                        title="Phụ kiện điện thoại & Tablet"
                        description="Phụ kiện chính hãng Apple, Samsung, Anker, Baseus... Cáp sạc, củ sạc, ốp lưng, tai nghe, pin dự phòng, dán màn hình... Hàng chính hãng 100%, bảo hành đổi mới."
                        categoryId="accessories"
                        products={filteredProducts}
                        filters={{
                            brands: availableBrands,
                            priceRanges: [
                                { label: 'Dưới 200K', min: 0, max: 200000 },
                                { label: '200K - 500K', min: 200000, max: 500000 },
                                { label: '500K - 1 triệu', min: 500000, max: 1000000 },
                                { label: '1 - 3 triệu', min: 1000000, max: 3000000 },
                                { label: 'Trên 3 triệu', min: 3000000, max: 999999999 },
                            ]
                        }}
                    />
                );
            }}
        </CategoryLayout>
    );
};

export default AccessoriesPage;
