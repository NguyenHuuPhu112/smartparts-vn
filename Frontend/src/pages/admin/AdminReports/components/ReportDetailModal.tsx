import React from 'react';
import { X, Download } from 'lucide-react';
import type { DailyReport } from '../types';
import { formatDate } from '../types';

interface ReportDetailModalProps {
    report: DailyReport;
    onClose: () => void;
}

const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ report, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Chi tiết báo cáo</h2>
                        <p className="text-slate-500 text-sm">{formatDate(report.date)}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-xl p-4">
                            <p className="text-sm text-slate-600">Doanh thu</p>
                            <p className="text-2xl font-bold text-green-600">{(report.revenue / 1000000).toFixed(2)}M₫</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4">
                            <p className="text-sm text-slate-600">Số đơn hàng</p>
                            <p className="text-2xl font-bold text-blue-600">{report.orders}</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4">
                            <p className="text-sm text-slate-600">Khách hàng mới</p>
                            <p className="text-2xl font-bold text-purple-600">{report.newCustomers}</p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-4">
                            <p className="text-sm text-slate-600">Sản phẩm bán ra</p>
                            <p className="text-2xl font-bold text-orange-600">{report.productsSold}</p>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-800">Thông tin chi tiết</h3>
                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Giá trị đơn trung bình</span>
                                <span className="font-bold text-slate-800">{(report.avgOrderValue / 1000).toFixed(0)}K₫</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Sản phẩm bán chạy nhất</span>
                                <span className="font-medium text-slate-800">{report.topProduct}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Tỷ lệ chuyển đổi</span>
                                <span className="font-bold text-green-600">3.2%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Lượt truy cập website</span>
                                <span className="font-bold text-slate-800">1,245</span>
                            </div>
                        </div>
                    </div>

                    {/* Hourly Breakdown */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-800">Doanh thu theo giờ</h3>
                        <div className="h-32 flex items-end justify-between gap-1">
                            {Array.from({ length: 24 }, (_, i) => {
                                const height = Math.random() * 80 + 10;
                                return (
                                    <div
                                        key={i}
                                        className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 transition-colors cursor-pointer"
                                        style={{ height: `${height}%` }}
                                        title={`${i}:00 - ${(height * 0.3).toFixed(1)}M₫`}
                                    />
                                );
                            })}
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>0h</span>
                            <span>6h</span>
                            <span>12h</span>
                            <span>18h</span>
                            <span>24h</span>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                    >
                        Đóng
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                        <Download className="w-4 h-4" />
                        Xuất báo cáo ngày
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailModal;
