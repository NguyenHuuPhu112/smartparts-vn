import React from 'react';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES } from '../types';
import type { StockFilter } from '../types';

interface ProductFiltersProps {
    searchTerm: string;
    selectedCategory: string;
    stockFilter: StockFilter;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onStockFilterChange: (value: StockFilter) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    searchTerm,
    selectedCategory,
    stockFilter,
    onSearchChange,
    onCategoryChange,
    onStockFilterChange
}) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc SKU..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
                <Filter className="w-4 h-4 text-slate-500" />

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="flex-1 lg:flex-none border border-slate-200 bg-white rounded-lg px-3 py-2 text-slate-700 outline-none focus:ring-2 focus:ring-orange-100 cursor-pointer text-sm font-medium"
                >
                    <option value="all">Tất cả danh mục</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Stock Filter */}
                <select
                    value={stockFilter}
                    onChange={(e) => onStockFilterChange(e.target.value as StockFilter)}
                    className="flex-1 lg:flex-none border border-slate-200 bg-white rounded-lg px-3 py-2 text-slate-700 outline-none focus:ring-2 focus:ring-orange-100 cursor-pointer text-sm font-medium"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="inStock">Còn hàng</option>
                    <option value="outOfStock">Hết hàng</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilters;
