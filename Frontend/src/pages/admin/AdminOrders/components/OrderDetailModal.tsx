import React from 'react';
import { Plus, Printer, Copy, Edit, Trash2, X } from 'lucide-react';
import type { Order } from '../OrderTypes';

interface OrderDetailModalProps {
    order: Order;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onPrintInvoice: (id: string) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
    order,
    onClose,
    onEdit,
    onDelete,
    onPrintInvoice
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden border border-gray-100">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-[#C00015] flex justify-between items-center bg-[#D70018] text-white shadow-md z-10">
                    <div className="flex gap-2">
                        <button className="bg-white text-[#D70018] hover:bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm transition-all">
                            <Plus className="w-4 h-4" /> Thêm Đơn Bán
                        </button>
                        <button
                            onClick={() => onPrintInvoice(order.id)}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-all"
                        >
                            <Printer className="w-4 h-4" /> In Tem Nhãn
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-all">
                            <Copy className="w-4 h-4" /> Sao Chép
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onEdit}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-all"
                        >
                            <Edit className="w-4 h-4" /> Sửa
                        </button>
                        <button
                            onClick={onDelete}
                            className="bg-white text-[#D70018] hover:bg-gray-100 px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm transition-all"
                        >
                            <Trash2 className="w-4 h-4" /> Xóa
                        </button>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 text-[#444444]">
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-4 grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-100">
                        {/* Order Info */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-[#D70018] text-xl flex items-center gap-2">
                                    <span className="p-1.5 bg-red-50 rounded-lg text-xl">📄</span> {order.id}
                                </span>
                                <span className="text-gray-500 text-sm font-medium">{order.date}</span>
                            </div>
                            <div className="space-y-2 text-sm text-[#444444]">
                                <p><span className="font-bold text-gray-700">Nhân viên:</span> {order.employee}</p>
                                <p><span className="font-bold text-gray-700">Ghi chú:</span> {order.note || 'Không có'}</p>
                            </div>
                        </div>
                        {/* Customer Info */}
                        <div className="border-l border-gray-100 pl-8">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="p-1.5 bg-red-50 rounded-lg text-[#D70018]">👤</span>
                                <span className="font-bold text-lg text-[#444444]">{order.customer}</span>
                            </div>
                            <div className="space-y-2 text-sm text-[#444444]">
                                <p><span className="font-bold text-gray-700">SĐT:</span> {order.phone}</p>
                                <p><span className="font-bold text-gray-700">Địa chỉ:</span> {order.address}</p>
                                <p><span className="font-bold text-gray-700">Email:</span> {order.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F3F4F6] border-b border-gray-200 text-xs font-bold text-[#444444] uppercase tracking-wide">
                                    <th className="p-4 text-center w-16">STT</th>
                                    <th className="p-4 w-20 text-center">Ảnh</th>
                                    <th className="p-4">Tên hàng hóa</th>
                                    <th className="p-4 text-center w-24">SL</th>
                                    <th className="p-4 text-right">Đơn giá</th>
                                    <th className="p-4 text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {order.productList.map((item, index) => (
                                    <tr key={index} className="hover:bg-[#FEF2F2] transition-colors">
                                        <td className="p-4 text-center text-gray-500 font-medium">{index + 1}</td>
                                        <td className="p-4 text-center">
                                            <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-200 mx-auto" />
                                        </td>
                                        <td className="p-4 font-bold text-[#444444]">{item.name}</td>
                                        <td className="p-4 text-center font-bold text-[#D70018]">{item.quantity}</td>
                                        <td className="p-4 text-right text-[#444444] font-medium">{item.price.toLocaleString()}</td>
                                        <td className="p-4 text-right font-bold text-[#D70018]">{(item.price * item.quantity).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Footer */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex flex-col items-end gap-3 text-sm">
                            <div className="flex justify-between w-full md:w-1/3">
                                <span className="text-[#444444] font-medium">Số lượng</span>
                                <span className="font-bold text-[#444444]">{order.items}</span>
                            </div>
                            <div className="flex justify-between w-full md:w-1/3">
                                <span className="text-[#444444] font-medium">Tổng tiền hàng</span>
                                <span className="font-bold text-[#D70018] text-lg">{order.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between w-full md:w-1/3 pt-3 border-t border-gray-100">
                                <span className="font-bold text-[#444444]">Khách phải trả</span>
                                <span className="font-bold text-xl text-[#D70018]">{order.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between w-full md:w-1/3">
                                <span className="text-[#444444] font-medium">Đã thanh toán</span>
                                <span className="font-bold text-[#444444]">0</span>
                            </div>
                            <div className="flex justify-between w-full md:w-1/3">
                                <span className="font-bold text-[#D70018]">Khách còn nợ</span>
                                <span className="font-bold text-[#D70018] text-xl">{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
