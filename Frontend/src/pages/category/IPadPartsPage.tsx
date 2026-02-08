import React, { useMemo, useState, useEffect } from 'react';
import CategoryLayout from '../../layouts/CategoryLayout';
import CategoryPageTemplate from './CategoryPageTemplate';
import { ProductService } from '../../services/productService';
import type { Product } from '../admin/AdminProducts/types';
import { applyProductFilters } from '../../utils/applyProductFilters';

const IPadPartsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const allProducts = await ProductService.getAll();
            const categoryProducts = allProducts.filter(p =>
                p.category === 'Linh kiện iPad' ||
                p.categoryId === 'ipad-parts'
            );
            setProducts(categoryProducts);
        };

        loadData();
        window.addEventListener('product-storage-update', loadData);
        return () => window.removeEventListener('product-storage-update', loadData);
    }, []);

    const availableBrands = useMemo(() => {
        const brands = products
            .map(p => p.brand)
            .filter((brand): brand is string => !!brand);
        return [...new Set(brands)].sort();
    }, [products]);

    const availableCategories = useMemo(() => {
        return ['Màn hình', 'Pin', 'Camera', 'Cảm ứng', 'Vỏ máy', 'Tai nghe'];
    }, []);

    return (
        <CategoryLayout
            availableBrands={availableBrands}
            availableCategories={availableCategories}
        >
            {(filters) => {
                const filteredProducts = applyProductFilters(products, filters);

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
