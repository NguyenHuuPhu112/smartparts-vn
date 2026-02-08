import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import type { Product } from '../pages/admin/AdminProducts/types';

interface OrderModalProps {
    product: Product;
    quantity: number;
    onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, quantity, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        note: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const total = (product.price || 0) * quantity;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSuccess(true);
        }, 1000);
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center animate-in fade-in zoom-in duration-200">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h3>
                    <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ sớm nhất.</p>
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
                {/* Left: Customer Info Form */}
                <div className="p-6 md:p-8 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-3 mb-6 text-center">
                        Thông tin khách hàng
                    </h3>
                    <form id="order-form" onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Họ tên <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400"
                                    placeholder="Nhập họ tên của bạn"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Điện thoại <span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    pattern="[0-9]{10,11}"
                                    title="Số điện thoại phải từ 10-11 số"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Địa chỉ nhận hàng <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400"
                                    placeholder="Số nhà, tên đường, phường/xã..."
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Ghi chú đơn hàng</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none placeholder-gray-400"
                                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                    value={formData.note}
                                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-[#FFC107] hover:bg-[#FFB300] text-black font-black text-sm uppercase tracking-wider rounded shadow-md hover:shadow-lg transition-all transform active:scale-95"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right: Order Summary */}
                <div className="bg-gray-50 p-6 md:p-8 md:w-[400px] border-l border-gray-200 flex flex-col relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-3 mb-6 text-center mt-2 md:mt-0">
                        Đơn hàng của bạn
                    </h3>

                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-2">
                            <span>Sản phẩm</span>
                            <span>Tổng</span>
                        </div>

                        <div className="py-2">
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-sm text-gray-800 font-medium heading-relaxed">
                                    {product.name} <span className="font-bold whitespace-nowrap text-gray-900">x {quantity}</span>
                                </span>
                                <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                    {(product.price * quantity).toLocaleString('vi-VN')}₫
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex justify-between items-center text-lg font-black text-gray-900">
                                <span>TỔNG</span>
                                <span className="text-[#D70018]">{total.toLocaleString('vi-VN')}₫</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
