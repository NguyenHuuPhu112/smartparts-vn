import React from 'react';
import { PieChart } from 'lucide-react';
import type { CategoryData } from '../types';
import { formatRevenue } from '../types';

interface CategoryChartProps {
    categoryData: CategoryData[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ categoryData }) => {
    // Generate pie chart paths
    const pieChartPaths = categoryData.reduce((acc, cat, i) => {
        const startPercent = acc.offset;
        const endPercent = startPercent + cat.percent;
        const largeArc = cat.percent > 50 ? 1 : 0;
        const startX = 50 + 40 * Math.cos(2 * Math.PI * startPercent / 100);
        const startY = 50 + 40 * Math.sin(2 * Math.PI * startPercent / 100);
        const endX = 50 + 40 * Math.cos(2 * Math.PI * endPercent / 100);
        const endY = 50 + 40 * Math.sin(2 * Math.PI * endPercent / 100);

        const colors = ['#3b82f6', '#8b5cf6', '#22c55e', '#f97316', '#ec4899'];

        acc.paths.push(
            <path
                key={i}
                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                fill={colors[i]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
            />
        );
        acc.offset = endPercent;
        return acc;
    }, { paths: [] as React.ReactNode[], offset: 0 });

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <PieChart className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Phân bổ danh mục</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Pie Chart */}
                <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            {pieChartPaths.paths}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-inner">
                                <p className="text-2xl font-bold text-slate-800">100%</p>
                                <p className="text-xs text-slate-500">Tổng</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                    {categoryData.map((cat, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                                <span className="font-medium text-slate-700">{cat.name}</span>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-800">{cat.percent}%</p>
                                <p className="text-xs text-slate-500">{formatRevenue(cat.revenue)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryChart;
