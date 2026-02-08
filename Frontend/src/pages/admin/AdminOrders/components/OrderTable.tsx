import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import type { Order, PaginationResult } from '../OrderTypes';

interface OrderTableProps {
    paginationResult: PaginationResult;
    onView: (order: Order) => void;
    onEdit: (order: Order) => void;
    onDelete: (id: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
    paginationResult,
    onView,
    onEdit,
    onDelete,
    currentPage,
    setCurrentPage
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F3F4F6] border-b border-gray-200 text-xs uppercase text-[#444444] font-bold tracking-wider">
                            <th className="p-4"><input type="checkbox" className="rounded accent-[#D70018]" /></th>
                            <th className="p-4">Mã đơn hàng</th>
                            <th className="p-4">Khách hàng</th>
                            <th className="p-4">Ngày đặt</th>
                            <th className="p-4">Thanh toán</th>
                            <th className="p-4 text-right">Tổng tiền</th>
                            <th className="p-4 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {paginationResult.currentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-[#FEF2F2] transition-colors group">
                                <td className="p-4"><input type="checkbox" className="rounded border-gray-300 accent-[#D70018]" /></td>
                                <td className="p-4 font-mono font-bold text-[#D70018] group-hover:text-[#B00012] transition-colors">{order.id}</td>
                                <td className="p-4">
                                    <div className="font-bold text-[#444444]">{order.customer}</div>
                                    <div className="text-xs text-gray-500">{order.email}</div>
                                </td>
                                <td className="p-4 text-[#444444]">{order.date}</td>
                                <td className="p-4 text-[#444444]">{order.payment}</td>
                                <td className="p-4 text-right font-bold text-[#D70018]">
                                    {order.total.toLocaleString('vi-VN')}₫
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onView(order)}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#444444] transition-colors"
                                            title="Xem chi tiết"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(order)}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#444444] transition-colors"
                                            title="Sửa"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(order.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-[#D70018] transition-colors"
                                            title="Xóa"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {paginationResult.currentOrders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">
                                    Không tìm thấy đơn hàng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {paginationResult.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-white">
                    <div className="text-sm text-gray-500">
                        Hiển thị <span className="font-bold text-[#444444]">{paginationResult.startIndex + 1}</span> - <span className="font-bold text-[#444444]">{Math.min(paginationResult.endIndex, paginationResult.totalItems)}</span> trên <span className="font-bold text-[#444444]">{paginationResult.totalItems}</span> đơn hàng
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 text-sm font-medium transition-colors"
                        >
                            Trước
                        </button>
                        {Array.from({ length: paginationResult.totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${currentPage === page
                                    ? 'bg-[#D70018] text-white shadow-md shadow-red-200'
                                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#D70018] hover:border-[#D70018]'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(Math.min(currentPage + 1, paginationResult.totalPages))}
                            disabled={currentPage === paginationResult.totalPages}
                            className="px-3 py-1 rounded-md border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 text-sm font-medium transition-colors"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
