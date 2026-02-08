import React from 'react';
import { X, Mail, Phone, MapPin, ShoppingBag, DollarSign, Calendar } from 'lucide-react';
import type { Customer, CustomerStatus, CustomerTier } from '../types';
import {
    formatCurrency,
    STATUS_LABELS,
    STATUS_STYLES,
    TIER_LABELS,
    TIER_STYLES
} from '../types';

interface CustomerViewModalProps {
    customer: Customer;
    onClose: () => void;
    onEdit: (customer: Customer) => void;
}

const getStatusBadge = (status: CustomerStatus) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
        {STATUS_LABELS[status]}
    </span>
);

const getTierBadge = (tier: CustomerTier) => (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${TIER_STYLES[tier]}`}>
        {TIER_LABELS[tier]}
    </span>
);

const CustomerViewModal: React.FC<CustomerViewModalProps> = ({ customer, onClose, onEdit }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">Chi tiết Khách hàng</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-2xl">
                            {customer.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">{customer.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                {getTierBadge(customer.tier)}
                                {getStatusBadge(customer.status)}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-sm text-slate-500 flex items-center gap-2 mb-1">
                                <Mail className="w-4 h-4" /> Email
                            </p>
                            <p className="font-medium text-slate-800">{customer.email}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-sm text-slate-500 flex items-center gap-2 mb-1">
                                <Phone className="w-4 h-4" /> Điện thoại
                            </p>
                            <p className="font-medium text-slate-800">{customer.phone}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 md:col-span-2">
                            <p className="text-sm text-slate-500 flex items-center gap-2 mb-1">
                                <MapPin className="w-4 h-4" /> Địa chỉ
                            </p>
                            <p className="font-medium text-slate-800">{customer.address}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                            <ShoppingBag className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-blue-600">{customer.totalOrders}</p>
                            <p className="text-sm text-slate-500">Đơn hàng</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 text-center">
                            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-green-600">{formatCurrency(customer.totalSpent)}</p>
                            <p className="text-sm text-slate-500">Tổng chi tiêu</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center">
                            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                            <p className="text-lg font-bold text-purple-600">
                                {customer.lastOrder
                                    ? new Date(customer.lastOrder).toLocaleDateString('vi-VN')
                                    : 'Chưa có'
                                }
                            </p>
                            <p className="text-sm text-slate-500">Đơn gần nhất</p>
                        </div>
                    </div>

                    {/* Notes */}
                    {customer.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <p className="text-sm font-medium text-yellow-800">📝 Ghi chú:</p>
                            <p className="text-yellow-700 mt-1">{customer.notes}</p>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onEdit(customer);
                        }}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                        Chỉnh sửa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerViewModal;
