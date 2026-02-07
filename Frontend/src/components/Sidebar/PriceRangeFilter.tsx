import React from 'react';
import { DollarSign } from 'lucide-react';
import type { PriceRange } from './types';

interface PriceRangeFilterProps {
    priceRanges: PriceRange[];
    selectedRange: { min: number; max: number } | null;
    onSelect: (range: { min: number; max: number } | null) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
    priceRanges,
    selectedRange,
    onSelect
}) => {
    const handleRangeClick = (range: PriceRange) => {
        // Toggle: if same range is clicked, deselect it
        if (selectedRange?.min === range.min && selectedRange?.max === range.max) {
            onSelect(null);
        } else {
            onSelect({ min: range.min, max: range.max });
        }
    };

    return (
        <div className="space-y-2">
            {priceRanges.map((range) => {
                const isSelected = selectedRange?.min === range.min && selectedRange?.max === range.max;

                return (
                    <button
                        key={range.label}
                        onClick={() => handleRangeClick(range)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 border-2 ${isSelected
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-lg font-bold'
                                : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-green-400 text-gray-800'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm font-semibold">{range.label}</span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default PriceRangeFilter;
