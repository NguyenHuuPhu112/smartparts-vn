import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, RotateCcw, DollarSign } from 'lucide-react';

export interface FilterState {
    categories: string[];
    brands: string[];
    priceRange: { min: number; max: number } | null;
}

interface SidebarProps {
    onFilterChange?: (filters: FilterState) => void;
    availableCategories?: string[];
    availableBrands?: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
    onFilterChange,
    availableCategories,
    availableBrands
}) => {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        category: true,
        brand: true,
        price: true,
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
    const [categorySearch, setCategorySearch] = useState('');
    const [brandSearch, setBrandSearch] = useState('');

    // Default categories and brands if not provided
    const categories = availableCategories || ['Màn hình', 'Pin', 'Camera', 'Cảm ứng', 'Tai nghe', 'Sạc', 'Cáp', 'Ốp lưng'];
    const brands = availableBrands || ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Huawei', 'Nokia'];

    const priceRanges = [
        { label: 'Dưới 500k', min: 0, max: 500000 },
        { label: '500k - 1 triệu', min: 500000, max: 1000000 },
        { label: '1 - 3 triệu', min: 1000000, max: 3000000 },
        { label: '3 - 5 triệu', min: 3000000, max: 5000000 },
        { label: 'Trên 5 triệu', min: 5000000, max: 999999999 },
    ];

    // Notify parent when filters change
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({
                categories: selectedCategories,
                brands: selectedBrands,
                priceRange: priceRange,
            });
        }
    }, [selectedCategories, selectedBrands, priceRange, onFilterChange]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleReset = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange(null);
        setCategorySearch('');
        setBrandSearch('');
    };

    const handlePriceRangeSelect = (range: { min: number; max: number } | null) => {
        setPriceRange(prev =>
            prev?.min === range?.min && prev?.max === range?.max ? null : range
        );
    };

    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(categorySearch.toLowerCase())
    );

    const filteredBrands = brands.filter(brand =>
        brand.toLowerCase().includes(brandSearch.toLowerCase())
    );

    return (
        <aside className="w-80 bg-gradient-to-br from-gray-50 to-gray-100 border-r-2 border-gray-200 h-screen sticky top-0 overflow-y-auto shadow-xl">
            <div className="p-5 space-y-5">

                {/* LOẠI SẢN PHẨM Section */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <button
                        onClick={() => toggleSection('category')}
                        className="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                    >
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                            Loại sản phẩm
                        </h3>
                        <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                            {expandedSections.category ? (
                                <ChevronUp className="w-5 h-5" />
                            ) : (
                                <ChevronDown className="w-5 h-5" />
                            )}
                        </div>
                    </button>

                    {expandedSections.category && (
                        <div className="px-5 pb-5 space-y-4 bg-gradient-to-b from-white to-gray-50">
                            {/* Search Input */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={categorySearch}
                                    onChange={(e) => setCategorySearch(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-red-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 text-sm placeholder:text-gray-400 font-medium transition-all duration-300 hover:border-red-500 bg-white shadow-sm"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                                {filteredCategories.map((category) => (
                                    <label
                                        key={category}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded-xl transition-all duration-200 group hover:shadow-md border-2 border-transparent hover:border-gray-200"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryToggle(category)}
                                            className="w-5 h-5 border-2 border-gray-300 rounded-md text-red-500 focus:ring-red-500 focus:ring-2 cursor-pointer transition-all duration-200 hover:border-red-400"
                                        />
                                        <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                                            {category}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>



                {/* THƯƠNG HIỆU Section */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <button
                        onClick={() => toggleSection('brand')}
                        className="w-full flex items-center justify-between p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                    >
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                            Thương hiệu
                        </h3>
                        <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                            {expandedSections.brand ? (
                                <ChevronUp className="w-5 h-5" />
                            ) : (
                                <ChevronDown className="w-5 h-5" />
                            )}
                        </div>
                    </button>

                    {expandedSections.brand && (
                        <div className="px-5 pb-5 space-y-4 bg-gradient-to-b from-white to-gray-50">
                            {/* Search Input */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={brandSearch}
                                    onChange={(e) => setBrandSearch(e.target.value)}
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
                                            onChange={() => handleBrandToggle(brand)}
                                            className="w-4 h-4 border-2 border-gray-300 rounded-md text-red-500 focus:ring-red-500 focus:ring-2 cursor-pointer transition-all duration-200 hover:border-red-400"
                                        />
                                        <span className="text-xs font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={handleReset}
                                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-black text-sm uppercase tracking-wide hover:shadow-xl transition-all duration-300 rounded-xl flex items-center justify-center gap-2 group"
                            >
                                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                Thiết lập lại
                            </button>
                        </div>
                    )}
                </div>

                {/* Active Filters Display */}
                {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange) && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 shadow-lg">
                        <h4 className="text-sm font-black text-blue-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            Đang lọc
                        </h4>
                        <div className="space-y-3">
                            {selectedCategories.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Loại:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCategories.map(cat => (
                                            <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-shadow">
                                                {cat}
                                                <button
                                                    onClick={() => handleCategoryToggle(cat)}
                                                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {priceRange && (
                                <div>
                                    <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Giá:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-shadow">
                                            {priceRanges.find(r => r.min === priceRange.min && r.max === priceRange.max)?.label}
                                            <button
                                                onClick={() => setPriceRange(null)}
                                                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            )}
                            {selectedBrands.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Thương hiệu:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedBrands.map(brand => (
                                            <span key={brand} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-shadow">
                                                {brand}
                                                <button
                                                    onClick={() => handleBrandToggle(brand)}
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
                )}
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ef4444, #dc2626);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #dc2626, #b91c1c);
        }
      `}</style>
        </aside>
    );
};

export default Sidebar;
