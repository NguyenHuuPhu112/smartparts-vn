import React from 'react';
import { Activity, ArrowUpRight } from 'lucide-react';
import type { ChartDataItem, ChartPeriod } from '../types';
import { PERIOD_LABELS, formatRevenue } from '../types';

interface RevenueChartProps {
    chartData: ChartDataItem[];
    chartPeriod: ChartPeriod;
    maxRevenue: number;
    totalRevenue: number;
    totalOrders: number;
    onPeriodChange: (period: ChartPeriod) => void;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
    chartData,
    chartPeriod,
    maxRevenue,
    totalRevenue,
    totalOrders,
    onPeriodChange
}) => {
    const periods: { key: ChartPeriod; label: string }[] = [
        { key: 'day', label: 'Ngày' },
        { key: 'week', label: 'Tuần' },
        { key: 'month', label: 'Tháng' },
        { key: 'year', label: 'Năm' },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {/* Chart Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-200">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">{PERIOD_LABELS[chartPeriod].title}</h2>
                        <p className="text-sm text-slate-500">So sánh với {PERIOD_LABELS[chartPeriod].compareText}</p>
                    </div>
                </div>

                {/* Period Selector */}
                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                    {periods.map((period) => (
                        <button
                            key={period.key}
                            onClick={() => onPeriodChange(period.key)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${chartPeriod === period.key
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-800'
                                }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-slate-600">Tổng doanh thu</p>
                    <p className="text-2xl font-bold text-blue-600">{formatRevenue(totalRevenue)}</p>
                    <div className="flex items-center gap-1 mt-1 text-green-600 text-sm font-medium">
                        <ArrowUpRight className="w-3 h-3" />
                        +15.3%
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <p className="text-sm text-slate-600">Tổng đơn hàng</p>
                    <p className="text-2xl font-bold text-green-600">{totalOrders.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1 text-green-600 text-sm font-medium">
                        <ArrowUpRight className="w-3 h-3" />
                        +8.7%
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                    <p className="text-sm text-slate-600">Trung bình/đơn</p>
                    <p className="text-2xl font-bold text-purple-600">{formatRevenue(totalRevenue / totalOrders)}</p>
                    <div className="flex items-center gap-1 mt-1 text-green-600 text-sm font-medium">
                        <ArrowUpRight className="w-3 h-3" />
                        +5.2%
                    </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                    <p className="text-sm text-slate-600">Cao nhất</p>
                    <p className="text-2xl font-bold text-orange-600">{formatRevenue(maxRevenue)}</p>
                    <p className="text-xs text-slate-500 mt-1">trong kỳ báo cáo</p>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-xs text-slate-400 pr-2">
                    <span className="text-right">{formatRevenue(maxRevenue)}</span>
                    <span className="text-right">{formatRevenue(maxRevenue * 0.75)}</span>
                    <span className="text-right">{formatRevenue(maxRevenue * 0.5)}</span>
                    <span className="text-right">{formatRevenue(maxRevenue * 0.25)}</span>
                    <span className="text-right">0</span>
                </div>

                {/* Chart Grid & Bars */}
                <div className="ml-16">
                    {/* Grid lines */}
                    <div className="absolute left-16 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
                        {[0, 1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="border-t border-slate-100 w-full" />
                        ))}
                    </div>

                    {/* Bars */}
                    <div className="flex items-end gap-1 pr-4" style={{ height: '280px' }}>
                        {chartData.map((item, i) => {
                            const barHeight = (item.revenue / maxRevenue) * 100;
                            const isHighest = item.revenue === maxRevenue;
                            return (
                                <div
                                    key={i}
                                    className="flex-1 flex flex-col items-center group"
                                    style={{ minWidth: chartPeriod === 'day' ? '20px' : '40px' }}
                                >
                                    <div
                                        className="relative w-full rounded-t-lg cursor-pointer transition-all duration-300 group-hover:opacity-90"
                                        style={{
                                            height: `${Math.max(barHeight, 2)}%`,
                                            background: isHighest
                                                ? 'linear-gradient(180deg, #f97316 0%, #ea580c 50%, #c2410c 100%)'
                                                : 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
                                            boxShadow: isHighest
                                                ? '0 4px 12px rgba(249, 115, 22, 0.3)'
                                                : '0 4px 12px rgba(59, 130, 246, 0.2)'
                                        }}
                                    >
                                        {/* Tooltip */}
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-xl transition-opacity">
                                            <div className="font-bold">{formatRevenue(item.revenue)}</div>
                                            <div className="text-slate-300">{item.orders} đơn hàng</div>
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-slate-800"></div>
                                        </div>

                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-t-lg" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* X-axis labels */}
                    <div className="flex gap-1 mt-3 pr-4">
                        {chartData.map((item, i) => (
                            <div
                                key={i}
                                className="flex-1 text-center text-xs font-medium text-slate-500"
                                style={{ minWidth: chartPeriod === 'day' ? '20px' : '40px' }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
                    <span className="text-sm text-slate-600">Doanh thu thông thường</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                    <span className="text-sm text-slate-600">Cao nhất trong kỳ</span>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;
