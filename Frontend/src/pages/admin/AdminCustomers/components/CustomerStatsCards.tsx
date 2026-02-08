import React from 'react';
import { UserCheck, UserX, DollarSign, TrendingUp } from 'lucide-react';
import type { CustomerStats } from '../types';
import { formatCurrency } from '../types';

interface CustomerStatsCardsProps {
    stats: CustomerStats;
}

const CustomerStatsCards: React.FC<CustomerStatsCardsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 rounded-lg">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Đang hoạt động</p>
                        <p className="text-xl font-bold text-slate-800">{stats.active}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-yellow-100 rounded-lg">
                        <UserX className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Không hoạt động</p>
                        <p className="text-xl font-bold text-slate-800">{stats.inactive + stats.blocked}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Tổng doanh thu</p>
                        <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Chi tiêu TB</p>
                        <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.avgSpent)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerStatsCards;
