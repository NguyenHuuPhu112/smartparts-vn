import React from 'react';
import { Search } from 'lucide-react';
import type { CustomerFilterTier } from '../types';

interface CustomerFiltersProps {
    searchTerm: string;
    tierFilter: CustomerFilterTier;
    onSearchChange: (value: string) => void;
    onTierChange: (value: CustomerFilterTier) => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({
    searchTerm,
    tierFilter,
    onSearchChange,
    onTierChange
}) => {
    return (
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tên, email, số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-3">

                    <select
                        value={tierFilter}
                        onChange={(e) => onTierChange(e.target.value as CustomerFilterTier)}
                        className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="all">Tất cả hạng</option>
                        <option value="bronze">🥉 Bronze</option>
                        <option value="silver">🥈 Silver</option>
                        <option value="gold">🥇 Gold</option>
                        <option value="platinum">💎 Platinum</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CustomerFilters;
