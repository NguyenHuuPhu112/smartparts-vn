import React, { useState, useEffect } from 'react';
import FilterSection from './FilterSection';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import ActiveFilters from './ActiveFilters';
import { DEFAULT_CATEGORIES, DEFAULT_BRANDS, PRICE_RANGES } from './constants';
import type { SidebarProps, FilterState } from './types';

const Sidebar: React.FC<SidebarProps> = ({
    onFilterChange,
    availableCategories,
    availableBrands
}) => {
    // Expand/collapse state for each section
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        category: true,
        brand: true,
    });

    // Filter state
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);

    // Use provided or default values
    const categories = availableCategories || DEFAULT_CATEGORIES;
    const brands = availableBrands || DEFAULT_BRANDS;

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

    // Toggle section expand/collapse
    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Category handlers
    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Brand handlers
    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };



    return (
        <aside className="w-64 bg-gradient-to-br from-gray-50 to-gray-100 border-r-2 border-gray-200 h-screen sticky top-0 overflow-y-auto shadow-xl">
            <div className="p-4 space-y-4">
                {/* Category Filter Section */}
                <FilterSection
                    title="Loại sản phẩm"
                    isExpanded={expandedSections.category}
                    onToggle={() => toggleSection('category')}
                >
                    <CategoryFilter
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onToggle={handleCategoryToggle}
                    />
                </FilterSection>



                {/* Brand Filter Section */}
                <FilterSection
                    title="Thương hiệu"
                    isExpanded={expandedSections.brand}
                    onToggle={() => toggleSection('brand')}
                >
                    <BrandFilter
                        brands={brands}
                        selectedBrands={selectedBrands}
                        onToggle={handleBrandToggle}

                    />
                </FilterSection>

                {/* Active Filters Display */}
                <ActiveFilters
                    selectedCategories={selectedCategories}
                    selectedBrands={selectedBrands}
                    priceRange={priceRange}
                    priceRanges={PRICE_RANGES}
                    onRemoveCategory={handleCategoryToggle}
                    onRemoveBrand={handleBrandToggle}
                    onRemovePriceRange={() => setPriceRange(null)}
                />
            </div>

            {/* Custom Scrollbar Styles */}
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

// Re-export types for convenience
export type { FilterState, SidebarProps } from './types';

export default React.memo(Sidebar);
