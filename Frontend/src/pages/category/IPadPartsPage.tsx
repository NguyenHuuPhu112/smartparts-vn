import React, { useMemo } from 'react';
import CategoryLayout from '../../layouts/CategoryLayout';
import CategoryPageTemplate from './CategoryPageTemplate';
import { ipadPartsProducts } from '../../data/mockData';
import { applyProductFilters } from '../../utils/applyProductFilters';

const IPadPartsPage: React.FC = () => {
    const availableBrands = useMemo(() => {
        const brands = ipadPartsProducts
            .map(p => p.brand)
            .filter((brand): brand is string => !!brand);
        return [...new Set(brands)].sort();
    }, []);

    const availableCategories = useMemo(() => {
        return ['Màn hình', 'Pin', 'Camera', 'Cảm ứng', 'Vỏ máy', 'Tai nghe'];
    }, []);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                const filteredProducts = applyProductFilters(ipadPartsProducts, filters);

                return (
                    <CategoryPageTemplate
                        title="Linh kiện iPad chính hãng Apple"
                        description="Chuyên cung cấp linh kiện thay thế cho iPad Pro, iPad Air, iPad Mini... Hàng zin bóc máy từ Apple, bảo hành 12 tháng. Giá tốt nhất TP.HCM."
                        categoryId="ipad-parts"
                        products={filteredProducts}
                        filters={{
                            brands: availableBrands,
                            priceRanges: [
                                { label: 'Dưới 1 triệu', min: 0, max: 1000000 },
                                { label: '1 - 3 triệu', min: 1000000, max: 3000000 },
                                { label: '3 - 10 triệu', min: 3000000, max: 10000000 },
                                { label: 'Trên 10 triệu', min: 10000000, max: 999999999 },
                            ]
                        }}
                    />
                );
            }}
        </CategoryLayout>
    );
};

export default IPadPartsPage;
