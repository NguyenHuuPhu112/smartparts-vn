import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ArrowRight, Shield, Truck, HeadphonesIcon, Star, TrendingUp } from 'lucide-react';
import { ProductService } from '../services/productService';
import type { Product } from './admin/AdminProducts/types';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Load initial data
        const loadData = async () => {
            const allProducts = await ProductService.getAll();
            setProducts(allProducts);
        };
        loadData();

        // Listen for updates from Admin
        const handleStorageUpdate = async () => {
            const updated = await ProductService.getAll();
            setProducts(updated);
        };

        window.addEventListener('product-storage-update', handleStorageUpdate);
        return () => window.removeEventListener('product-storage-update', handleStorageUpdate);
    }, []);

    // Filter Hot Deals (discount > 0)
    const hotDeals = products
        .filter(p => (p.discount && p.discount > 0) || p.isHot)
        .sort((a, b) => (b.discount || 0) - (a.discount || 0));

    // Filter Featured Products (rating >= 4.5 or isFeatured)
    const featuredProducts = products
        .filter(p => Number(p.rating) >= 4.5 || p.isFeatured)
        .sort((a, b) => Number(b.rating) - Number(a.rating));

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen py-6">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="space-y-6">
                        {/* Hero Banner - Compact */}
                        <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 rounded-xl p-6 md:p-8 text-white relative overflow-hidden shadow-md">
                            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
                            </div>
                            <div className="relative z-10 max-w-2xl">
                                <h1 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                                    Chào mừng đến <span className="text-accent-400">SmartParts Việt Nam</span>
                                </h1>
                                <p className="text-sm md:text-base text-brand-100 mb-4 leading-relaxed max-w-xl">
                                    Chuyên cung cấp linh kiện điện thoại, iPad, vật tư ép kính chính hãng.
                                    <span className="font-bold text-white"> Cam kết 100% hàng zin</span>, giá tốt nhất TP.HCM.
                                </p>
                                <div className="flex items-center gap-3">
                                    <Link to="/phone-parts">
                                        <button className="px-5 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2">
                                            Xem sản phẩm
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    <Link to="/sale">
                                        <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105">
                                            Khuyến mãi HOT 🔥
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges - Compact */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 border border-border-light shadow-sm flex items-center gap-3">
                                <div className="p-2.5 bg-brand-50 rounded-lg">
                                    <Shield className="w-5 h-5 text-brand-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Bảo hành 12 tháng</h3>
                                    <p className="text-xs text-gray-600">Đổi mới trong 7 ngày</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-border-light shadow-sm flex items-center gap-3">
                                <div className="p-2.5 bg-accent-50 rounded-lg">
                                    <Truck className="w-5 h-5 text-accent-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Giao hàng nhanh</h3>
                                    <p className="text-xs text-gray-600">Free ship nội thành</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-border-light shadow-sm flex items-center gap-3">
                                <div className="p-2.5 bg-green-50 rounded-lg">
                                    <HeadphonesIcon className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Hỗ trợ 24/7</h3>
                                    <p className="text-xs text-gray-600">Hotline: 0902962497</p>
                                </div>
                            </div>
                        </div>

                        {/* Hot Deals Section */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/20 rounded-lg">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-black">⚡ Flash Sale</h2>
                                </div>
                                <Link to="/sale" className="text-white hover:text-red-100 font-bold underline text-sm">
                                    Xem tất cả →
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {hotDeals.slice(0, 6).map((deal) => (
                                    <Link key={deal.id} to={`/product/${deal.id}`} className="bg-white rounded-lg p-3 text-gray-900 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-sm">
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-28 mb-2 flex items-center justify-center relative">
                                            {deal.image.startsWith('http') ? (
                                                <img src={deal.image} alt={deal.name} className="w-full h-full object-contain rounded-lg" />
                                            ) : (
                                                <span className="text-gray-400 font-bold text-center px-1 text-xs">{deal.name}</span>
                                            )}
                                            <span className="absolute top-1 right-1 bg-red-100 text-red-700 text-[10px] font-black px-1.5 py-0.5 rounded-full">-{deal.discount || 0}%</span>
                                        </div>
                                        <h3 className="font-bold text-xs mb-1 line-clamp-2 h-8">{deal.name}</h3>
                                        <div className="flex flex-col gap-0.5 mb-1">
                                            <span className="text-sm font-black text-red-600">{(deal.price || 0).toLocaleString('vi-VN')}₫</span>
                                            {deal.originalPrice && (
                                                <span className="text-[10px] text-gray-400 line-through">{deal.originalPrice.toLocaleString('vi-VN')}₫</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-[10px] text-gray-500">⏰ Còn ít</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Featured Products Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <Star className="w-6 h-6 text-accent-500 fill-accent-500" />
                                    Sản phẩm nổi bật
                                </h2>
                                <Link to="/phone-parts" className="text-brand-600 hover:text-brand-700 font-bold text-sm hover:underline flex items-center gap-1">
                                    Xem tất cả <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
                                {featuredProducts.slice(0, 10).map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        className="group bg-white rounded-lg p-3 border border-border-light hover:border-brand-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                                    >
                                        <div className="relative w-full h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden group-hover:from-brand-50 group-hover:to-brand-100 transition-all duration-300">
                                            {product.image.startsWith('http') ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <span className="text-gray-500 font-bold text-xs group-hover:text-brand-600 transition-colors text-center px-2">
                                                    {product.name}
                                                </span>
                                            )}
                                            {(product.discount || 0) > 0 && (
                                                <div className="absolute top-1 right-1 bg-accent-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                                                    -{product.discount || 0}%
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-1">
                                            <span className="text-[10px] text-brand-600 font-semibold bg-brand-50 px-1.5 py-0.5 rounded-full inline-block truncate max-w-full">
                                                {product.category}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-700 transition-colors text-xs line-clamp-2 h-8">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-600 mb-2">
                                            <div className="flex items-center gap-0.5">
                                                <span className="text-accent-400">★</span>
                                                <span className="font-semibold">{product.rating}</span>
                                            </div>
                                            <span className="text-gray-300">|</span>
                                            <span>Đã bán {product.sold}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 mb-2">
                                            <p className="text-accent-600 font-black text-sm">
                                                {(product.price || 0).toLocaleString('vi-VN')}₫
                                            </p>
                                            {(product.originalPrice || 0) > (product.price || 0) && (
                                                <p className="text-gray-400 text-[10px] line-through">
                                                    {(product.originalPrice || 0).toLocaleString('vi-VN')}₫
                                                </p>
                                            )}
                                        </div>
                                        <button className="w-full px-3 py-1.5 bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white font-bold text-xs rounded transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-sm">
                                            Xem ngay
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Product Sections: Màn hình, Pin, Vỏ */}
                        {[
                            { title: 'Màn hình điện thoại chính hãng', keyword: 'Màn hình', icon: '📱' },
                            { title: 'Pin dung lượng cao', keyword: 'Pin', icon: '🔋' },
                            { title: 'Vỏ - Sườn - Kính lưng', keyword: 'Vỏ', icon: '🛠️' }
                        ].map((section) => {
                            const sectionProducts = products.filter(p => p.name.toLowerCase().includes(section.keyword.toLowerCase()));

                            if (sectionProducts.length === 0) return null;

                            return (
                                <div key={section.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 uppercase">
                                            <span className="text-2xl">{section.icon}</span>
                                            {section.title}
                                        </h2>
                                        <Link to="/search" className="text-red-600 hover:text-red-700 font-bold text-sm hover:underline flex items-center gap-1">
                                            Xem tất cả <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                        {sectionProducts.slice(0, 10).map((product) => (
                                            <Link
                                                key={product.id}
                                                to={`/product/${product.id}`}
                                                className="group block bg-white rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
                                            >
                                                <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4">
                                                    {product.image.startsWith('http') ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400 font-bold text-xs">{product.name}</span>
                                                    )}
                                                    {(product.discount || 0) > 0 && (
                                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                                            -{product.discount}%
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-3">
                                                    <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2 group-hover:text-red-600 transition-colors h-10">
                                                        {product.name}
                                                    </h3>

                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-end gap-2">
                                                            <span className="text-red-600 font-bold text-base">
                                                                {(product.price || 0).toLocaleString('vi-VN')}₫
                                                            </span>
                                                            {(product.originalPrice || 0) > (product.price || 0) && (
                                                                <span className="text-gray-400 text-xs line-through mb-0.5">
                                                                    {(product.originalPrice || 0).toLocaleString('vi-VN')}₫
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-1 text-xs text-amber-500">
                                                            <span>★★★★★</span>
                                                            <span className="text-gray-400 text-[10px]">({product.sold || 0} đã bán)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
