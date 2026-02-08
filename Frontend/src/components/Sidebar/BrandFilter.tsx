import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface BrandFilterProps {
    brands: string[];
    selectedBrands: string[];
    onToggle: (brand: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
    brands,
    selectedBrands,
    onToggle
}) => {
    const [search, setSearch] = useState('');

    const filteredBrands = brands.filter(brand =>
        brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {/* Search Input */}
            <div className="relative group">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 text-sm placeholder:text-gray-400 font-medium transition-all duration-300 hover:border-red-500 bg-white shadow-sm"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
            </div>

            {/* Checkboxes - 2 columns */}
            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto custom-scrollbar">
                {filteredBrands.map((brand) => (
                    <label
                        key={brand}
                        className="flex items-center gap-2 cursor-pointer hover:bg-white p-2.5 rounded-lg transition-all duration-200 group hover:shadow-md border-2 border-transparent hover:border-gray-200"
                    >
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => onToggle(brand)}
                            className="w-4 h-4 border-2 border-gray-300 rounded-md text-red-500 focus:ring-red-500 focus:ring-2 cursor-pointer transition-all duration-200 hover:border-red-400"
                        />
                        <span className="text-xs font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                            {brand}
                        </span>
                    </label>
                ))}
            </div>

            {/* Reset Button */}

        </>
    );
};

export default BrandFilter;
