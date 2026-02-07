import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategories: string[];
    onToggle: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategories,
    onToggle
}) => {
    const [search, setSearch] = useState('');

    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(search.toLowerCase())
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
                            onChange={() => onToggle(category)}
                            className="w-5 h-5 border-2 border-gray-300 rounded-md text-red-500 focus:ring-red-500 focus:ring-2 cursor-pointer transition-all duration-200 hover:border-red-400"
                        />
                        <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                            {category}
                        </span>
                    </label>
                ))}
            </div>
        </>
    );
};

export default CategoryFilter;
