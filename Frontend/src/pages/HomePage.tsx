import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ArrowRight, Shield, Truck, HeadphonesIcon, Star, TrendingUp } from 'lucide-react';
import { featuredProducts, hotDeals, categories } from '../data/mockData';

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 rounded-2xl p-12 text-white relative overflow-hidden shadow-brand">
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <h1 className="text-5xl font-black mb-4 leading-tight">
                            Chào mừng đến <span className="text-accent-400">SmartParts Việt Nam</span>
                        </h1>
                        <p className="text-xl text-brand-100 mb-6 leading-relaxed">
                            Chuyên cung cấp linh kiện điện thoại, iPad, vật tư ép kính và dụng cụ sửa chữa chính hãng.
                            <span className="font-bold text-white"> Cam kết 100% hàng zin</span>, giá tốt nhất thị trường TP.HCM.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link to="/phone-parts">
                                <button className="px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-accent shadow-lg flex items-center gap-2">
                                    Xem sản phẩm ngay
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link to="/sale">
                                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105">
                                    Khuyến mãi HOT 🔥
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 border border-border-light shadow-subtle hover:shadow-soft transition-all duration-300 flex items-center gap-4">
                        <div className="p-4 bg-brand-50 rounded-xl">
                            <Shield className="w-8 h-8 text-brand-600" />
                        </div>
                        <div>
                            <h3 className="font-black text-gray-900 text-lg">Bảo hành 12 tháng</h3>
                            <p className="text-sm text-gray-600">Đổi mới trong 7 ngày</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-border-light shadow-subtle hover:shadow-soft transition-all duration-300 flex items-center gap-4">
                        <div className="p-4 bg-accent-50 rounded-xl">
                            <Truck className="w-8 h-8 text-accent-600" />
                        </div>
                        <div>
                            <h3 className="font-black text-gray-900 text-lg">Giao hàng nhanh</h3>
                            <p className="text-sm text-gray-600">Free ship nội thành TP.HCM</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-border-light shadow-subtle hover:shadow-soft transition-all duration-300 flex items-center gap-4">
                        <div className="p-4 bg-green-50 rounded-xl">
                            <HeadphonesIcon className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-black text-gray-900 text-lg">Hỗ trợ 24/7</h3>
                            <p className="text-sm text-gray-600">Hotline: 1900 2667</p>
                        </div>
                    </div>
                </div>

                {/* Hot Deals Section */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-black">⚡ Flash Sale - Hàng bán rẻ HOT</h2>
                        </div>
                        <Link to="/sale" className="text-white hover:text-red-100 font-bold underline">
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {hotDeals.slice(0, 4).map((deal) => (
                            <Link key={deal.id} to={`/product/${deal.id}`} className="bg-white rounded-xl p-5 text-gray-900 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-32 mb-3 flex items-center justify-center">
                                    <span className="text-gray-400 font-bold text-center px-2">{deal.name}</span>
                                </div>
                                <h3 className="font-bold text-sm mb-2 line-clamp-2">{deal.name}</h3>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-2xl font-black text-red-600">{deal.price.toLocaleString('vi-VN')}₫</span>
                                    <span className="text-xs text-gray-400 line-through">{deal.originalPrice.toLocaleString('vi-VN')}₫</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="bg-red-100 text-red-700 text-xs font-black px-2 py-1 rounded-full">-{deal.discount}%</span>
                                    <span className="text-xs text-gray-500">⏰ Còn ít</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Featured Products Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                            <Star className="w-8 h-8 text-accent-500 fill-accent-500" />
                            Sản phẩm nổi bật
                        </h2>
                        <Link to="/phone-parts" className="text-brand-600 hover:text-brand-700 font-bold text-sm hover:underline flex items-center gap-1">
                            Xem tất cả <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {featuredProducts.slice(0, 8).map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="group bg-white rounded-xl p-5 border border-border-light hover:border-brand-300 transition-all duration-300 cursor-pointer shadow-subtle hover:shadow-brand"
                            >
                                <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden group-hover:from-brand-50 group-hover:to-brand-100 transition-all duration-300">
                                    <span className="text-gray-500 font-bold text-sm group-hover:text-brand-600 transition-colors text-center px-4">
                                        {product.name}
                                    </span>
                                    {product.discount > 0 && (
                                        <div className="absolute top-2 right-2 bg-accent-600 text-white text-xs font-black px-2 py-1 rounded-lg shadow-md">
                                            -{product.discount}%
                                        </div>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <span className="text-xs text-brand-600 font-semibold bg-brand-50 px-2 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors text-sm line-clamp-2">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                                    <div className="flex items-center gap-1">
                                        <span className="text-accent-400">★</span>
                                        <span className="font-semibold">{product.rating}</span>
                                    </div>
                                    <span className="text-gray-400">|</span>
                                    <span>Đã bán {product.sold}</span>
                                </div>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <p className="text-accent-600 font-black text-lg">
                                        {product.price.toLocaleString('vi-VN')}₫
                                    </p>
                                    {product.originalPrice > product.price && (
                                        <p className="text-gray-400 text-sm line-through">
                                            {product.originalPrice.toLocaleString('vi-VN')}₫
                                        </p>
                                    )}
                                </div>
                                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white font-bold text-sm rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md">
                                    Xem chi tiết
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Categories Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.slice(0, 4).map((cat, index) => (
                        <Link
                            key={index}
                            to={`/${cat.slug}`}
                            className={`group bg-gradient-to-r ${cat.color} rounded-2xl p-8 text-white text-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            <div className="relative z-10">
                                <div className="text-5xl mb-3">{cat.icon}</div>
                                <p className="font-black text-xl mb-2">{cat.name}</p>
                                <p className="text-sm opacity-90">{cat.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
