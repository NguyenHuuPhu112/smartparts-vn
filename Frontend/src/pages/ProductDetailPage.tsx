import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ProductService } from '../services/productService';
import type { Product } from './admin/AdminProducts/types';
import { useCart } from '../contexts/CartContext';
import { Star, Truck, Shield, RotateCcw, ShoppingCart, Heart, ChevronRight, Home, CheckCircle2 } from 'lucide-react';
import OrderModal from '../components/OrderModal';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            setLoading(true);
            const data = await ProductService.getById(id);
            setProduct(data);

            // Load related products (same category)
            if (data?.category) {
                const all = await ProductService.getAll();
                const related = all.filter(p => p.category === data.category && p.id !== data.id).slice(0, 5);
                setRelatedProducts(related);
            }
            setLoading(false);
            window.scrollTo(0, 0); // Scroll to top
        };
        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-[500px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            </MainLayout>
        );
    }

    if (!product) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sản phẩm không tồn tại</h2>
                    <Link to="/" className="text-orange-600 hover:underline">Quay lại trang chủ</Link>
                </div>
            </MainLayout>
        );
    }

    const discountPercentage = product.discount || 0;
    const finalPrice = product.price || 0;
    const originalPrice = product.originalPrice || 0;

    return (
        <MainLayout>
            <div className="bg-gray-50 py-6 min-h-screen font-sans">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Breadcrumbs - Compact */}
                    <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
                        <Link to="/" className="hover:text-orange-600 flex items-center gap-1">
                            <Home className="w-3 h-3" /> Trang chủ
                        </Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-700">{product.category}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
                    </nav>

                    {/* Main Product Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">

                            {/* Left: Image Gallery */}
                            <div className="md:col-span-5 p-6 bg-white flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                                <div className="relative w-full aspect-square max-w-md flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden group">
                                    {product.image.startsWith('http') ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="text-gray-400 font-bold flex flex-col items-center">
                                            <span>No Image Available</span>
                                            <span className="text-xs font-normal mt-2">{product.name}</span>
                                        </div>
                                    )}
                                    {discountPercentage > 0 && (
                                        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded shadow-md">
                                            -{discountPercentage}%
                                        </span>
                                    )}
                                </div>
                                {/* Thumbnail placeholders if needed later */}
                            </div>

                            {/* Right: Product Info */}
                            <div className="md:col-span-7 p-6 md:pl-0 flex flex-col">
                                <div className="flex-1">
                                    <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                                        {product.name}
                                    </h1>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1 text-sm bg-orange-50 px-2 py-1 rounded-md text-orange-700 font-bold">
                                            <span>{product.rating}</span> <Star className="w-3.5 h-3.5 fill-current" />
                                        </div>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-sm text-gray-500">Đã bán {product.sold}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                                            {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                                        </span>
                                    </div>

                                    {/* Pricing */}
                                    <div className="bg-gray-50 p-4 rounded-xl mb-6 flex items-baseline gap-3">
                                        <span className="text-3xl font-black text-red-600 tracking-tight">
                                            {finalPrice.toLocaleString('vi-VN')}₫
                                        </span>
                                        {originalPrice > finalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                {originalPrice.toLocaleString('vi-VN')}₫
                                            </span>
                                        )}
                                    </div>

                                    {/* Short Description */}
                                    <div className="mb-6">
                                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Mô tả ngắn</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                            {product.description || "Sản phẩm chính hãng, chất lượng cao. Đảm bảo nguồn gốc xuất xứ rõ ràng. Bảo hành uy tín tại cửa hàng."}
                                        </p>
                                    </div>

                                    {/* Policies - Compact */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                                            <span>Bảo hành chính hãng 12 tháng</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <RotateCcw className="w-4 h-4 text-blue-600 mt-0.5" />
                                            <span>Đổi trả trong 30 ngày lỗi NSX</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <Truck className="w-4 h-4 text-orange-600 mt-0.5" />
                                            <span>Giao hàng nhanh toàn quốc</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5" />
                                            <span>Kiểm tra hàng trước khi thanh toán</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="border-t border-gray-100 pt-6 mt-auto">
                                    <div className="flex items-center gap-4">
                                        {/* Quantity */}
                                        <div className="flex items-center border border-gray-300 rounded-lg h-11">
                                            <button
                                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg transition"
                                            > - </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                className="w-12 h-full text-center text-sm font-bold text-gray-900 focus:outline-none border-x border-gray-300"
                                            />
                                            <button
                                                onClick={() => setQuantity(q => q + 1)}
                                                className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg transition"
                                            > + </button>
                                        </div>

                                        {/* Buttons */}
                                        <button
                                            onClick={() => {
                                                if (product) {
                                                    addToCart(product, quantity);
                                                    alert('Đã thêm sản phẩm vào giỏ hàng!');
                                                }
                                            }}
                                            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold h-11 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Thêm vào giỏ
                                        </button>
                                        <button
                                            onClick={() => setIsOrderModalOpen(true)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-11 rounded-lg shadow-md hover:shadow-lg transition-all"
                                        >
                                            Mua ngay
                                        </button>
                                        <button className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Info & Reviews Tabs Placeholder */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-black text-gray-900 mb-4 border-b pb-2">Thông tin chi tiết</h3>
                                <div className="prose prose-sm max-w-none text-gray-600">
                                    <p>{product.description || "Đang cập nhật nội dung chi tiết cho sản phẩm này..."}</p>
                                    <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>

                        {/* Related Products - Compact List */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                                <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-orange-500" />
                                    Sản phẩm liên quan
                                </h3>
                                <div className="space-y-4">
                                    {relatedProducts.map(rp => (
                                        <Link key={rp.id} to={`/product/${rp.id}`} className="flex gap-3 items-start group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                            <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                                                {rp.image.startsWith('http') ? (
                                                    <img src={rp.image} alt={rp.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-[10px] text-gray-400 text-center">{rp.name}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-1">
                                                    {rp.name}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-red-600">{(rp.price || 0).toLocaleString('vi-VN')}₫</span>
                                                    {rp.discount ? (
                                                        <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">-{rp.discount}%</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    {relatedProducts.length === 0 && (
                                        <p className="text-sm text-gray-500 italic">Không có sản phẩm liên quan.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Order Modal */}
            {
                isOrderModalOpen && product && (
                    <OrderModal
                        product={product}
                        quantity={quantity}
                        onClose={() => setIsOrderModalOpen(false)}
                    />
                )
            }
        </MainLayout >
    );
};

export default ProductDetailPage;
