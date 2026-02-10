import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../contexts/CartContext';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        note: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    if (cartItems.length === 0 && !isSuccess) {
        // Use useEffect or just render Empty cart component, but navigate is side-effect.
        // Better to show empty state or redirect in useEffect.
        // For simplicity, showing a message and link back.
        return (
            <MainLayout>
                <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
                    <Link to="/" className="text-orange-600 font-bold hover:underline">Quay lại mua sắm</Link>
                </div>
            </MainLayout>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    if (isSuccess) {
        return (
            <MainLayout>
                <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Đặt hàng thành công!</h2>
                        <p className="text-gray-600 mb-8">
                            Cảm ơn bạn đã mua hàng. Mã đơn hàng của bạn là <span className="font-bold text-gray-900">#ORD-{Math.floor(Math.random() * 10000)}</span>.
                            Chúng tôi sẽ liên hệ sớm nhất để xác nhận.
                        </p>
                        <div className="space-y-3">
                            <Link to="/" className="block w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all">
                                Quay về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
                        <Link to="/cart" className="hover:text-orange-600 flex items-center gap-1">
                            <ArrowLeft className="w-4 h-4" /> Quay lại giỏ hàng
                        </Link>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-wide border-b pb-4">
                                    Thông tin giao hàng
                                </h2>
                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all"
                                                placeholder="Nguyễn Văn A"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all"
                                                placeholder="0912..."
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">Địa chỉ nhận hàng <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all"
                                            placeholder="Số nhà, đường, phường/xã, quận/huyện..."
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700">Ghi chú đơn hàng</label>
                                        <textarea
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all resize-none"
                                            placeholder="Giao hàng giờ hành chính, gọi trước khi giao..."
                                            value={formData.note}
                                            onChange={e => setFormData({ ...formData, note: e.target.value })}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Summary Side */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-wide">Đơn hàng của bạn</h3>
                                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                            <div className="w-12 h-12 bg-gray-50 rounded border border-gray-200 flex items-center justify-center flex-shrink-0">
                                                <img src={item.image} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-800 line-clamp-2 mb-1">{item.name}</p>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-500">SL: {item.quantity}</span>
                                                    <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-4 border-t-2 border-dashed border-gray-100">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Tạm tính</span>
                                        <span className="font-bold">{cartTotal.toLocaleString('vi-VN')}₫</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Phí vận chuyển</span>
                                        <span className="text-green-600 font-bold">Miễn phí</span>
                                    </div>
                                    <div className="flex justify-between items-center text-base pt-2 border-t border-gray-100 mt-2">
                                        <span className="font-black text-gray-900 uppercase">Tổng cộng</span>
                                        <span className="font-black text-xl text-red-600">{cartTotal.toLocaleString('vi-VN')}₫</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    form="checkout-form"
                                    className="w-full mt-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg shadow-lg shadow-orange-200 transition-all uppercase tracking-wide transform active:scale-95"
                                >
                                    ĐẶT HÀNG NGAY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CheckoutPage;
