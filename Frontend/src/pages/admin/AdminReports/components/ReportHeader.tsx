import React from 'react';
import { Download } from 'lucide-react';
import type { DateRange } from '../types';

interface ReportHeaderProps {
    dateRange: DateRange;
    onDateRangeChange: (range: DateRange) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ dateRange, onDateRangeChange }) => {
    const dateRanges = [
        { key: 'today' as DateRange, label: 'Hôm nay' },
        { key: 'yesterday' as DateRange, label: 'Hôm qua' },
        { key: 'week' as DateRange, label: '7 ngày' },
    ];

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Báo cáo & Thống kê</h1>
                <p className="text-slate-500 text-sm">Tổng quan hiệu suất kinh doanh</p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
                {/* Date Range Selector */}
                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                    {dateRanges.map((range) => (
                        <button
                            key={range.key}
                            onClick={() => onDateRangeChange(range.key)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${dateRange === range.key
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-600 hover:text-slate-800'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200 font-medium">
                    <Download className="w-4 h-4" />
                    <span>Xuất báo cáo</span>
                </button>
            </div>
        </div>
    );
};

export default ReportHeader;
