import React from 'react';
import { Package, ChevronRight } from 'lucide-react';
import type { TopProduct } from '../types';
import { formatRevenue } from '../types';

interface TopProductsProps {
    products: TopProduct[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Top bán chạy</h2>
                </div>
            </div>

            <div className="space-y-3">
                {products.map((product, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' :
                            i === 1 ? 'bg-slate-200 text-slate-600' :
                                i === 2 ? 'bg-orange-100 text-orange-700' :
                                    'bg-slate-100 text-slate-500'
                            }`}>
                            {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 text-sm truncate">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.sold} đã bán</p>
                        </div>
                        <p className="font-bold text-green-600 text-sm">{formatRevenue(product.revenue)}</p>
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-1 hover:bg-orange-50 rounded-lg transition-colors">
                Xem tất cả <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default TopProducts;
