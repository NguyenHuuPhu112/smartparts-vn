import React from 'react';
import {
    DollarSign,
    ShoppingBag,
    Users,
    BarChart2,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const stats = [
        { title: 'Doanh thu tháng', value: '45.280.000₫', change: '+12.5%', isPositive: true, icon: DollarSign, color: 'bg-green-500' },
        { title: 'Đơn hàng mới', value: '156', change: '+8.2%', isPositive: true, icon: ShoppingBag, color: 'bg-blue-500' },
        { title: 'Khách hàng mới', value: '42', change: '-2.4%', isPositive: false, icon: Users, color: 'bg-purple-500' },
        { title: 'Tổng sản phẩm', value: '89', change: '+5', isPositive: true, icon: BarChart2, color: 'bg-orange-500' },
    ];

    const recentOrders = [
        { id: '#ORD-001', customer: 'Nguyễn Văn A', date: '2023-10-25', total: '1.250.000₫', status: 'pending' },
        { id: '#ORD-002', customer: 'Trần Thị B', date: '2023-10-24', total: '850.000₫', status: 'completed' },
        { id: '#ORD-003', customer: 'Lê Văn C', date: '2023-10-24', total: '2.100.000₫', status: 'processing' },
        { id: '#ORD-004', customer: 'Phạm Thị D', date: '2023-10-23', total: '450.000₫', status: 'cancelled' },
        { id: '#ORD-005', customer: 'Hoàng Văn E', date: '2023-10-23', total: '3.500.000₫', status: 'completed' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
                <p className="text-slate-500">Chào mừng trở lại! Đây là tình hình kinh doanh hôm nay.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color.split('-')[1]}-600`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className={`flex items-center font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                                {stat.change}
                            </span>
                            <span className="text-slate-400 ml-2">so với tháng trước</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                            Biểu đồ doanh thu
                        </h2>
                        <select className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1 text-slate-600 outline-none focus:ring-2 focus:ring-orange-100 cursor-pointer">
                            <option>7 ngày qua</option>
                            <option>Tháng này</option>
                            <option>Năm nay</option>
                        </select>
                    </div>
                    {/* Revenue Bar Chart */}
                    <div className="flex items-end justify-between gap-3 px-2" style={{ height: '220px' }}>
                        {[
                            { day: 'T2', value: 6000000, height: 40 },
                            { day: 'T3', value: 9750000, height: 65 },
                            { day: 'T4', value: 6750000, height: 45 },
                            { day: 'T5', value: 12000000, height: 80 },
                            { day: 'T6', value: 8250000, height: 55 },
                            { day: 'T7', value: 13500000, height: 90 },
                            { day: 'CN', value: 10500000, height: 70 },
                        ].map((item, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-slate-100 rounded-lg relative group" style={{ height: '180px' }}>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-600 to-orange-400 rounded-lg transition-all duration-500 hover:from-orange-700 hover:to-orange-500 cursor-pointer"
                                        style={{ height: `${item.height}%` }}
                                    >
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 shadow-lg">
                                            {(item.value / 1000000).toFixed(1)}M₫
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-500">{item.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm border-t border-slate-100 pt-4">
                        <span className="text-slate-500">Tổng tuần: <strong className="text-slate-800">66.75M₫</strong></span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" />
                            +15.3% so với tuần trước
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Đơn hàng mới</h2>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                        {order.customer.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{order.customer}</p>
                                        <p className="text-xs text-slate-500">{order.id} • {order.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-orange-600">{order.total}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide
                                        ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-gray-100 text-gray-600'}
                                    `}>
                                        {order.status === 'completed' ? 'Hoàn tất' :
                                            order.status === 'pending' ? 'Chờ duyệt' :
                                                order.status === 'processing' ? 'Đang giao' : 'Đã hủy'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors">
                        Xem tất cả đơn hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;