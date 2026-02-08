import React, { useState, useMemo } from 'react';
import {
    Search,
    MoreHorizontal,
    Printer,
    Eye
} from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    email: string;
    date: string;
    total: number;
    payment: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: number;
}

const mockOrders: Order[] = Array.from({ length: 20 }, (_, i) => ({
    id: `#ORD-${1000 + i}`,
    customer: ['Nguyen Van A', 'Tran Thi B', 'Le Van C', 'Pham Thi D', 'Hoang Van E'][Math.floor(Math.random() * 5)],
    email: `customer${i}@example.com`,
    date: `2023-10-${Math.floor(Math.random() * 30) + 1}`,
    total: Math.floor(Math.random() * 5000000) + 500000,
    payment: Math.random() > 0.5 ? 'COD' : 'Momo',
    status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)] as Order['status'],
    items: Math.floor(Math.random() * 5) + 1,
}));

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

const statusLabels = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    shipped: 'Đang vận chuyển',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy',
};

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [orders, statusFilter, searchTerm]);

    const handlePrintInvoice = (orderId: string) => {
        window.alert(`In hóa đơn cho đơn hàng ${orderId}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Đơn hàng</h1>
                    <p className="text-slate-500 text-sm">Quản lý và theo dõi đơn đặt hàng</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo Mã đơn, Khách hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {Object.entries({ all: 'Tất cả', ...statusLabels }).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setStatusFilter(key)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                                ${statusFilter === key
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }
                            `}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                                <th className="p-4"><input type="checkbox" className="rounded" /></th>
                                <th className="p-4">Mã đơn hàng</th>
                                <th className="p-4">Khách hàng</th>
                                <th className="p-4">Ngày đặt</th>
                                <th className="p-4">Thanh toán</th>
                                <th className="p-4 text-right">Tổng tiền</th>
                                <th className="p-4 text-center">Trạng thái</th>
                                <th className="p-4 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                                    <td className="p-4 font-mono font-medium text-slate-700">{order.id}</td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">{order.customer}</div>
                                        <div className="text-xs text-slate-400">{order.email}</div>
                                    </td>
                                    <td className="p-4 text-slate-600">{order.date}</td>
                                    <td className="p-4 text-slate-600">{order.payment}</td>
                                    <td className="p-4 text-right font-bold text-slate-800">
                                        {order.total.toLocaleString('vi-VN')}₫
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                                            {statusLabels[order.status]}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600" title="Xem chi tiết">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePrintInvoice(order.id)}
                                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800"
                                                title="In hóa đơn"
                                            >
                                                <Printer className="w-4 h-4" />
                                            </button>
                                            <div className="relative group">
                                                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                                <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-100 hidden group-hover:block z-10 p-1">
                                                    <button className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 rounded text-slate-700">Duyệt đơn</button>
                                                    <button className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 rounded text-slate-700">Giao hàng</button>
                                                    <button className="w-full text-left px-3 py-2 text-xs hover:bg-red-50 rounded text-red-600">Hủy đơn</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;