import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../contexts/CartContext';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
                    <div className="flex justify-center mb-6">
                        <ShoppingBag className="w-24 h-24 text-gray-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
                    <p className="text-gray-500 mb-8">Chưa có sản phẩm nào trong giỏ hàng của bạn.</p>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Tiếp tục mua sắm
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-wide border-l-4 border-orange-500 pl-4">Giỏ hàng của bạn</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                                    {/* Image */}
                                    <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 border border-gray-200 overflow-hidden flex items-center justify-center p-2">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-800 text-base line-clamp-2 mb-1">
                                            <Link to={`/product/${item.id}`} className="hover:text-orange-600 transition-colors">
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <div className="text-sm font-black text-red-600 mb-2">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Control */}
                                            <div className="flex items-center border border-gray-300 rounded-lg h-8 w-24">
                                                <button
                                                    onClick={() => updateQuantity(String(item.id), item.quantity - 1)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100 rounded-l-lg"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-8 h-full text-center text-xs font-bold border-x border-gray-300 outline-none"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(String(item.id), item.quantity + 1)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100 rounded-r-lg"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(String(item.id))}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary & Checkout */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="font-black text-gray-800 text-lg mb-4 uppercase">Tóm tắt đơn hàng</h3>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính</span>
                                        <span className="font-bold">{cartTotal.toLocaleString('vi-VN')}₫</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển</span>
                                        <span className="text-green-600 font-medium">Miễn phí</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                                        <span className="font-bold text-gray-900">Tổng cộng</span>
                                        <span className="font-black text-2xl text-red-600">{cartTotal.toLocaleString('vi-VN')}₫</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-200 transition-all uppercase tracking-wide mb-3"
                                >
                                    Tiến hành thanh toán
                                </button>
                                <Link to="/" className="block text-center text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors">
                                    Tiếp tục mua sắm
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CartPage;
