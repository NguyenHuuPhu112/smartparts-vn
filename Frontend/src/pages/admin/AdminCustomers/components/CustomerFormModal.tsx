import React from 'react';
import { X } from 'lucide-react';
import type { CustomerFormData, CustomerStatus, CustomerTier } from '../types';

interface CustomerFormModalProps {
    isAdd: boolean;
    formData: CustomerFormData;
    onClose: () => void;
    onSave: () => void;
    onFieldChange: <K extends keyof CustomerFormData>(field: K, value: CustomerFormData[K]) => void;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
    isAdd,
    formData,
    onClose,
    onSave,
    onFieldChange
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">
                        {isAdd ? 'Thêm Khách hàng mới' : 'Chỉnh sửa Khách hàng'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Họ tên *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => onFieldChange('name', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Nhập họ tên khách hàng"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => onFieldChange('email', e.target.value)}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Điện thoại *</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => onFieldChange('phone', e.target.value)}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="0901234567"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => onFieldChange('address', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Nhập địa chỉ"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                            <select
                                value={formData.status}
                                onChange={(e) => onFieldChange('status', e.target.value as CustomerStatus)}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Không hoạt động</option>
                                <option value="blocked">Đã khóa</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Hạng thành viên</label>
                            <select
                                value={formData.tier}
                                onChange={(e) => onFieldChange('tier', e.target.value as CustomerTier)}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="bronze">🥉 Bronze</option>
                                <option value="silver">🥈 Silver</option>
                                <option value="gold">🥇 Gold</option>
                                <option value="platinum">💎 Platinum</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => onFieldChange('notes', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            rows={3}
                            placeholder="Ghi chú về khách hàng..."
                        />
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                        {isAdd ? 'Thêm khách hàng' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerFormModal;
