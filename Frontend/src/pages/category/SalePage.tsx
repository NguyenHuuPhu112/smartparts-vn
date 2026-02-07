import React, { useMemo } from 'react';
import CategoryLayout from '../../layouts/CategoryLayout';
import CategoryPageTemplate from './CategoryPageTemplate';
import { saleProducts } from '../../data/mockData';
import { applyProductFilters } from '../../utils/applyProductFilters';

const SalePage: React.FC = () => {
    const availableBrands = useMemo(() => {
        const brands = saleProducts
            .map(p => p.brand)
            .filter((brand): brand is string => !!brand);
        return [...new Set(brands)].sort();
    }, []);

    const availableCategories = useMemo(() => {
        return ['Linh kiện', 'Phụ kiện', 'Dụng cụ', 'Vật tư'];
    }, []);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                const filteredProducts = applyProductFilters(saleProducts, filters);

                return (
                    <div className="space-y-6">
                        {/* Special Sale Header */}
                        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-2xl p-12 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                                <div className="text-[200px] font-black absolute -top-10 -right-10 animate-pulse">🔥</div>
                            </div>
                            <div className="relative z-10 max-w-4xl">
                                <div className="inline-block bg-yellow-400 text-red-800 px-4 py-2 rounded-lg font-black text-sm mb-4 animate-bounce">
                                    ⚡ FLASH SALE - GIẢM ĐẾN 70%
                                </div>
                                <h1 className="text-5xl font-black mb-4 leading-tight">
                                    Hàng bán RẺ - Khuyến mãi HOT 🔥
                                </h1>
                                <p className="text-xl text-red-100 mb-6 leading-relaxed">
                                    Sản phẩm giảm giá sốc, thanh lý kho, khuyến mãi đặc biệt.
                                    <span className="font-black text-yellow-300"> Số lượng CÓ HẠN</span>, mua ngay kẻo hết!
                                </p>
                                <div className="flex items-center gap-6 text-lg font-bold">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                                        <span>{saleProducts.length} sản phẩm hot</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span>Giảm tới 70%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                        <span>Giao hàng miễn phí</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CategoryPageTemplate
                            title=""
                            categoryId="sale"
                            products={filteredProducts}
                            filters={{
                                brands: availableBrands,
                                priceRanges: [
                                    { label: 'Siêu rẻ < 100K', min: 0, max: 100000 },
                                    { label: '100K - 500K', min: 100000, max: 500000 },
                                    { label: '500K - 1 triệu', min: 500000, max: 1000000 },
                                    { label: 'Trên 1 triệu', min: 1000000, max: 999999999 },
                                ]
                            }}
                        />
                    </div>
                );
            }}
        </CategoryLayout>
    );
};

export default SalePage;
