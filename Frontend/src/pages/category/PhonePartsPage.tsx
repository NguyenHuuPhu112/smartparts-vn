import React, { useMemo } from 'react';
import CategoryLayout from '../../layouts/CategoryLayout';
import CategoryPageTemplate from './CategoryPageTemplate';
import { phonePartsProducts } from '../../data/mockData';
import { applyProductFilters } from '../../utils/applyProductFilters';

const PhonePartsPage: React.FC = () => {
    // Define available brands
    const availableBrands = useMemo(() => {
        const allBrands = [
            'Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo',
            'Realme', 'Huawei', 'Nokia', 'Sony', 'LG',
            'Asus', 'Google', 'OnePlus', 'Vsmart', 'Tecno', 'Infinix'
        ];
        return allBrands.sort();
    }, []);

    // Define available categories
    const availableCategories = useMemo(() => {
        return ['Màn hình', 'Pin', 'Camera', 'Cảm ứng', 'Tai nghe', 'Sạc', 'Cáp', 'Ốp lưng'];
    }, []);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                const filteredProducts = applyProductFilters(phonePartsProducts, filters);

                return (
                    <CategoryPageTemplate
                        title="Linh kiện điện thoại chính hãng"
                        description="Chuyên cung cấp linh kiện iPhone, Samsung, Oppo, Xiaomi... chính hãng zin bóc máy. Bảo hành 12 tháng, đổi trả miễn phí 7 ngày. Cam kết 100% hàng zin, test kỹ trước khi giao."
                        categoryId="phone-parts"
                        products={filteredProducts}
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

export default PhonePartsPage;

