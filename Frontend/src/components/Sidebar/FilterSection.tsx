import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FilterSectionProps } from './types';

const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    isExpanded,
    onToggle,
    children
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
            >
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                    {title}
                </h3>
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                </div>
            </button>

            {isExpanded && (
                <div className="px-5 pb-5 space-y-4 bg-gradient-to-b from-white to-gray-50">
                    {children}
                </div>
            )}
        </div>
    );
};

export default FilterSection;
