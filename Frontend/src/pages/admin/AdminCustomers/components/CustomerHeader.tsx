import React from 'react';
import { Plus, Download } from 'lucide-react';

interface CustomerHeaderProps {
    totalCustomers: number;
    onAdd: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({ totalCustomers, onAdd }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Quản lý Khách hàng</h1>
                <p className="text-slate-500 text-sm">Tổng cộng {totalCustomers} khách hàng</p>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Xuất Excel</span>
                </button>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                >
                    <Plus className="w-4 h-4" />
                    <span>Thêm khách hàng</span>
                </button>
            </div>
        </div>
    );
};

export default CustomerHeader;
