import React from 'react';
import { Calendar, Clock, Eye } from 'lucide-react';
import type { DailyReport } from '../types';
import { formatDate } from '../types';

interface DailyReportsTableProps {
    reports: DailyReport[];
    onViewDetail: (report: DailyReport) => void;
}

const DailyReportsTable: React.FC<DailyReportsTableProps> = ({ reports, onViewDetail }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Báo cáo theo ngày</h2>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
                            <th className="text-left py-3 px-2">Ngày</th>
                            <th className="text-right py-3 px-2">Doanh thu</th>
                            <th className="text-center py-3 px-2">Đơn hàng</th>
                            <th className="text-center py-3 px-2">Khách mới</th>
                            <th className="text-center py-3 px-2">SP bán ra</th>
                            <th className="text-left py-3 px-2">SP bán chạy nhất</th>
                            <th className="text-center py-3 px-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {reports.map((report, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium text-slate-800">{formatDate(report.date)}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-right font-bold text-green-600">
                                    {(report.revenue / 1000000).toFixed(1)}M₫
                                </td>
                                <td className="py-3 px-2 text-center text-slate-700 font-medium">{report.orders}</td>
                                <td className="py-3 px-2 text-center text-slate-700">{report.newCustomers}</td>
                                <td className="py-3 px-2 text-center text-slate-700">{report.productsSold}</td>
                                <td className="py-3 px-2 text-slate-600 text-sm max-w-[200px] truncate">{report.topProduct}</td>
                                <td className="py-3 px-2 text-center">
                                    <button
                                        onClick={() => onViewDetail(report)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyReportsTable;
