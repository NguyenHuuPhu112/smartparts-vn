import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryPageTemplateProps {
    title: string;
    description?: string;
    categoryId?: string;
    products?: any[];
    filters?: {
        brands?: string[];
        priceRanges?: { label: string; min: number; max: number }[];
    };
}

const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({
    title,
    description,
    products: customProducts,
    filters
}) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('popular');
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');

    // Mock products data nếu không có custom products
    const rawProducts = customProducts || Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        name: `${title} ${i + 1}`,
        price: Math.floor(Math.random() * 5000000 + 1000000),
        originalPrice: Math.floor(Math.random() * 7000000 + 3000000),
        discount: Math.floor(Math.random() * 50),
        sold: Math.floor(Math.random() * 1000),
        rating: (Math.random() * 2 + 3).toFixed(1),
        image: `/placeholder-${i + 1}.jpg`,
        inStock: Math.random() > 0.2,
    }));

    const priceRanges = filters?.priceRanges || [
        { label: 'Dưới 500K', min: 0, max: 500000 },
        { label: '500K - 1 triệu', min: 500000, max: 1000000 },
        { label: '1 - 3 triệu', min: 1000000, max: 3000000 },
        { label: '3 - 5 triệu', min: 3000000, max: 5000000 },
        { label: 'Trên 5 triệu', min: 5000000, max: 999999999 },
    ];

    // Apply filtering and sorting
    const products = useMemo(() => {
        let filtered = [...rawProducts];

        // Filter by price range if selected
        if (selectedPriceRange) {
            const [min, max] = selectedPriceRange.split('-').map(Number);
            filtered = filtered.filter(p => p.price >= min && p.price <= max);
        }

        // Sort products
        switch (sortBy) {
            case 'newest':
                // For demo, reverse order (assume higher ID = newer)
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case 'sold':
                filtered.sort((a, b) => b.sold - a.sold);
                break;
            case 'popular':
            default:
                // Popular = combination of rating and sold
                filtered.sort((a, b) => {
                    const scoreA = parseFloat(a.rating) * 0.5 + (a.sold / 1000) * 0.5;
                    const scoreB = parseFloat(b.rating) * 0.5 + (b.sold / 1000) * 0.5;
                    return scoreB - scoreA;
                });
                break;
        }

        return filtered;
    }, [rawProducts, selectedPriceRange, sortBy]);

    return (
        <div className="space-y-6">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-10 text-white shadow-brand">
                <div className="max-w-4xl">
                    <h1 className="text-4xl font-black mb-3">{title}</h1>
                    {description && (
                        <p className="text-brand-100 text-lg leading-relaxed">{description}</p>
                    )}
                    <div className="mt-6 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                            <span className="font-semibold">{rawProducts.length} sản phẩm</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="font-semibold">Hàng chính hãng 100%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="font-semibold">Bảo hành 12 tháng</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-xl p-5 border border-border-light shadow-subtle sticky top-0 z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                                    ? 'bg-white text-brand-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'list'
                                    ? 'bg-white text-brand-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

                        {/* Product Count */}
                        <p className="text-sm text-gray-600 font-medium">
                            Hiển thị <span className="font-black text-gray-900">{products.length}</span> sản phẩm
                        </p>

                        {/* Price Filter */}
                        <div className="relative">
                            <select
                                value={selectedPriceRange}
                                onChange={(e) => setSelectedPriceRange(e.target.value)}
                                className="appearance-none px-4 py-2.5 pr-10 border border-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-medium bg-white cursor-pointer hover:border-brand-300 transition-colors"
                            >
                                <option value="">Tất cả giá</option>
                                {priceRanges.map((range, index) => (
                                    <option key={index} value={`${range.min}-${range.max}`}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none px-4 py-2.5 pr-10 border border-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-medium bg-white cursor-pointer hover:border-brand-300 transition-colors"
                            >
                                <option value="popular">Phổ biến nhất</option>
                                <option value="newest">Mới nhất</option>
                                <option value="price-asc">Giá: Thấp đến cao</option>
                                <option value="price-desc">Giá: Cao đến thấp</option>
                                <option value="rating">Đánh giá cao</option>
                                <option value="sold">Bán chạy nhất</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group bg-white rounded-xl p-5 border border-border-light hover:border-brand-300 transition-all duration-300 cursor-pointer shadow-subtle hover:shadow-brand"
                        >
                            {/* Product Image */}
                            <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden group-hover:from-brand-50 group-hover:to-brand-100 transition-all duration-300">
                                <span className="text-gray-500 font-bold text-lg group-hover:text-brand-600 transition-colors">
                                    {product.name}
                                </span>
                                {product.discount > 0 && (
                                    <div className="absolute top-2 right-2 bg-accent-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md">
                                        -{product.discount}%
                                    </div>
                                )}
                                {!product.inStock && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="bg-white text-gray-900 px-3 py-1 rounded-lg font-bold text-sm">Hết hàng</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-700 transition-colors text-sm line-clamp-2 min-h-[2.5rem]">
                                    {product.name}
                                </h3>

                                {/* Rating & Sold */}
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <span className="text-accent-400">★</span>
                                        <span className="font-semibold">{product.rating}</span>
                                    </div>
                                    <span className="text-gray-400">|</span>
                                    <span>Đã bán {product.sold}</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-2">
                                    <p className="text-accent-600 font-black text-lg">
                                        {product.price.toLocaleString('vi-VN')}₫
                                    </p>
                                    {product.originalPrice > product.price && (
                                        <p className="text-gray-400 text-sm line-through">
                                            {product.originalPrice.toLocaleString('vi-VN')}₫
                                        </p>
                                    )}
                                </div>

                                {/* Stock Status */}
                                {product.inStock ? (
                                    <div className="flex items-center gap-2 text-xs text-green-600">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="font-semibold">Còn hàng</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                        <span className="font-semibold">Tạm hết</span>
                                    </div>
                                )}

                                {/* Add to Cart Button */}
                                <button
                                    className="w-full mt-3 px-4 py-2.5 bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white font-bold text-sm rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!product.inStock}
                                >
                                    {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group bg-white rounded-xl p-6 border border-border-light hover:border-brand-300 transition-all duration-300 cursor-pointer flex gap-6 shadow-subtle hover:shadow-brand"
                        >
                            {/* Product Image */}
                            <div className="relative w-56 h-56 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden group-hover:from-brand-50 group-hover:to-brand-100 transition-all duration-300">
                                <span className="text-gray-500 font-bold text-lg group-hover:text-brand-600 transition-colors text-center px-4">
                                    {product.name}
                                </span>
                                {product.discount > 0 && (
                                    <div className="absolute top-3 right-3 bg-accent-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-md">
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col justify-between py-2">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 group-hover:text-brand-700 transition-colors text-xl leading-tight">
                                        {product.name}
                                    </h3>

                                    {/* Rating & Sold */}
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-accent-400 text-base">★</span>
                                            <span className="font-semibold">{product.rating}</span>
                                        </div>
                                        <span className="text-gray-400">|</span>
                                        <span>Đã bán {product.sold}</span>
                                        <span className="text-gray-400">|</span>
                                        {product.inStock ? (
                                            <span className="text-green-600 font-semibold">✓ Còn hàng</span>
                                        ) : (
                                            <span className="text-gray-500 font-semibold">✗ Hết hàng</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-end justify-between">
                                    {/* Price */}
                                    <div className="flex items-baseline gap-3">
                                        <p className="text-accent-600 font-black text-3xl">
                                            {product.price.toLocaleString('vi-VN')}₫
                                        </p>
                                        {product.originalPrice > product.price && (
                                            <p className="text-gray-400 text-lg line-through">
                                                {product.originalPrice.toLocaleString('vi-VN')}₫
                                            </p>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        className="px-8 py-3.5 bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white font-bold text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!product.inStock}
                                    >
                                        {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        className={`w-11 h-11 rounded-lg font-bold text-sm transition-all duration-200 ${page === 1
                            ? 'bg-brand-600 text-white shadow-brand'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-border-medium hover:border-brand-300'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryPageTemplate;
