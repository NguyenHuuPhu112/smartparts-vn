import React, { useMemo } from 'react';
import CategoryLayout from '../../layouts/CategoryLayout';
import CategoryPageTemplate from './CategoryPageTemplate';
import { toolsEquipmentProducts } from '../../data/mockData';
import { applyProductFilters } from '../../utils/applyProductFilters';

const ToolsEquipmentPage: React.FC = () => {
    const availableBrands = useMemo(() => {
        const brands = toolsEquipmentProducts
            .map(p => p.brand)
            .filter((brand): brand is string => !!brand);
        return [...new Set(brands)].sort();
    }, []);

    const availableCategories = useMemo(() => {
        return ['Máy ép kính', 'Máy hàn', 'Tua vít', 'Kìm', 'Đèn UV', 'Máy khoan'];
    }, []);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                const filteredProducts = applyProductFilters(toolsEquipmentProducts, filters);

                return (
                    <CategoryPageTemplate
                        title="Dụng cụ & Thiết bị sửa chữa"
                        description="Cung cấp đầy đủ dụng cụ và thiết bị chuyên dụng: máy ép kính, máy hàn, tua vít, kìm, đèn UV... Hàng chính hãng, bảo hành dài hạn. Phục vụ cả sỉ và lẻ."
                        categoryId="tools-equipment"
                        products={filteredProducts}
                        filters={{
                            brands: availableBrands,
                            priceRanges: [
                                { label: 'Dưới 500K', min: 0, max: 500000 },
                                { label: '500K - 1 triệu', min: 500000, max: 1000000 },
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

export default ToolsEquipmentPage;
