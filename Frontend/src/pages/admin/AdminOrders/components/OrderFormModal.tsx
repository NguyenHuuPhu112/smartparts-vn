import React from 'react';
import { X } from 'lucide-react';
import type { Order } from '../OrderTypes';

interface OrderFormModalProps {
    isEditing: boolean;
    formData: Partial<Order>;
    onClose: () => void;
    onSave: (e: React.FormEvent) => void;
    onUpdateFormData: (data: Partial<Order>) => void;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({
    isEditing,
    formData,
    onClose,
    onSave,
    onUpdateFormData
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-[#C00015] flex justify-between items-center bg-[#D70018] text-white shadow-md">
                    <h3 className="text-lg font-bold uppercase tracking-wide">
                        {isEditing ? 'Sửa đơn hàng' : 'Thêm đơn hàng mới'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={onSave} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-[#444444] mb-1.5">Tên khách hàng</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-[#D70018] outline-none transition-all text-[#444444] font-medium placeholder-gray-400 bg-gray-50 focus:bg-white"
                                value={formData.customer || ''}
                                onChange={e => onUpdateFormData({ customer: e.target.value })}
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#444444] mb-1.5">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-[#D70018] outline-none transition-all text-[#444444] font-medium placeholder-gray-400 bg-gray-50 focus:bg-white"
                                value={formData.email || ''}
                                onChange={e => onUpdateFormData({ email: e.target.value })}
                                placeholder="example@email.com"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-[#444444] mb-1.5">Tổng tiền (VNĐ)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-[#D70018] outline-none transition-all text-[#444444] font-medium bg-gray-50 focus:bg-white"
                                    value={formData.total || 0}
                                    onChange={e => onUpdateFormData({ total: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#444444] mb-1.5">Số lượng hàng</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-[#D70018] outline-none transition-all text-[#444444] font-medium bg-gray-50 focus:bg-white"
                                    value={formData.items || 1}
                                    onChange={e => onUpdateFormData({ items: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#444444] mb-1.5">Phương thức thanh toán</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-[#D70018] outline-none transition-all text-[#444444] font-medium bg-gray-50 focus:bg-white appearance-none"
                                    value={formData.payment || 'COD'}
                                    onChange={e => onUpdateFormData({ payment: e.target.value })}
                                >
                                    <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                                    <option value="Momo">Momo</option>
                                    <option value="Banking">Chuyển khoản ngân hàng</option>
                                    <option value="ZaloPay">ZaloPay</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-[#444444] transition-all"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-bold text-white bg-[#D70018] rounded-lg hover:bg-[#C00015] shadow-lg shadow-red-200 transition-all hover:translate-y-px"
                        >
                            {isEditing ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
