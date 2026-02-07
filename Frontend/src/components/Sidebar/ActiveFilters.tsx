import React from 'react';
import type { PriceRange } from './types';

interface ActiveFiltersProps {
    selectedCategories: string[];
    selectedBrands: string[];
    priceRange: { min: number; max: number } | null;
    priceRanges: PriceRange[];
    onRemoveCategory: (category: string) => void;
    onRemoveBrand: (brand: string) => void;
    onRemovePriceRange: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
    selectedCategories,
    selectedBrands,
    priceRange,
    priceRanges,
    onRemoveCategory,
    onRemoveBrand,
    onRemovePriceRange
}) => {
    const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange;

    if (!hasActiveFilters) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 shadow-lg">
            <h4 className="text-sm font-black text-blue-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Đang lọc
            </h4>
            <div className="space-y-3">
                {/* Categories */}
                {selectedCategories.length > 0 && (
                    <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Loại:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedCategories.map(cat => (
                                <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-shadow">
                                    {cat}
                                    <button
                                        onClick={() => onRemoveCategory(cat)}
                                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price Range */}
                {priceRange && (
                    <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Giá:</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-shadow">
                                {priceRanges.find(r => r.min === priceRange.min && r.max === priceRange.max)?.label}
                                <button
                                    onClick={onRemovePriceRange}
                                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                >
                                    ×
                                </button>
                            </span>
                        </div>
                    </div>
                )}

                {/* Brands */}
                {selectedBrands.length > 0 && (
                    <div>
                        <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Thương hiệu:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedBrands.map(brand => (
                                <span key={brand} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-shadow">
                                    {brand}
                                    <button
                                        onClick={() => onRemoveBrand(brand)}
                                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveFilters;
