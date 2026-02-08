import React from 'react';
import { Eye, Edit2, Trash2, User } from 'lucide-react';
import type { Customer } from '../types';
import { formatDate } from '../types';

interface CustomerTableProps {
    customers: Customer[];
    onView: (customer: Customer) => void;
    onEdit: (customer: Customer) => void;
    onDelete: (id: number) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
    customers,
    onView,
    onEdit,
    onDelete
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
                    <tr>
                        <th className="py-3 px-4 w-10">
                            <input type="checkbox" className="rounded border-slate-300" />
                        </th>
                        <th className="py-3 px-4 w-20">ID</th>
                        <th className="py-3 px-4">Tên khách hàng</th>
                        <th className="py-3 px-4">SĐT</th>
                        <th className="py-3 px-4">Địa chỉ</th>
                        <th className="py-3 px-4">Ngày tạo</th>
                        <th className="py-3 px-4 text-center w-32">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                                <input type="checkbox" className="rounded border-slate-300" />
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-700">{customer.id}</td>
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-slate-800">{customer.name}</span>
                                </div>
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-700">{customer.phone}</td>
                            <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={customer.address}>
                                {customer.address}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                                {formatDate(customer.createdAt)}
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onView(customer)}
                                        className="text-blue-600 hover:text-blue-800 p-1"
                                        title="Xem chi tiết"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onEdit(customer)}
                                        className="text-orange-600 hover:text-orange-800 p-1"
                                        title="Sửa"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(customer.id)}
                                        className="text-red-600 hover:text-red-800 p-1"
                                        title="Xóa"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-500">
                                Không tìm thấy khách hàng nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
