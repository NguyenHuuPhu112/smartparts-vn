import React, { useMemo } from 'react';
import CategoryLayout from '../../layouts/CategoryLayout';
import CategoryPageTemplate from './CategoryPageTemplate';
import { glassSuppliesProducts } from '../../data/mockData';
import { applyProductFilters } from '../../utils/applyProductFilters';

const GlassSuppliesPage: React.FC = () => {
    const availableBrands = useMemo(() => {
        const brands = glassSuppliesProducts
            .map(p => p.brand)
            .filter((brand): brand is string => !!brand);
        return [...new Set(brands)].sort();
    }, []);

    const availableCategories = useMemo(() => {
        return ['Kính cường lực', 'OCA', 'Keo', 'Frame ép', 'Dung dịch', 'Máy ép'];
    }, []);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                const filteredProducts = applyProductFilters(glassSuppliesProducts, filters);

                return (
                    <CategoryPageTemplate
                        title="Vật tư ép kính chuyên nghiệp"
                        description="Cung cấp đầy đủ vật tư ép kính: kính cường lực, OCA, keo chuyên dụng, frame ép kính, dung dịch tẩy keo... Hàng chất lượng cao, giá sỉ lẻ cạnh tranh nhất thị trường."
                        categoryId="glass-supplies"
                        products={filteredProducts}
                        filters={{
                            brands: availableBrands,
                            priceRanges: [
                                { label: 'Dưới 50K', min: 0, max: 50000 },
                                { label: '50K - 100K', min: 50000, max: 100000 },
                                { label: '100K - 200K', min: 100000, max: 200000 },
                                { label: 'Trên 200K', min: 200000, max: 999999999 },
                            ]
                        }}
                    />
                );
            }}
        </CategoryLayout>
    );
};

export default GlassSuppliesPage;
