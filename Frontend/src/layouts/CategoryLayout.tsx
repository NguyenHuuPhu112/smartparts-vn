import React, { useState, useCallback } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar, { type FilterState } from '../components/Sidebar';

interface CategoryLayoutProps {
    children: (filters: FilterState) => React.ReactNode;
    // Optional: pass specific brands/categories for this page
    availableCategories?: string[];
    availableBrands?: string[];
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
    children,
    availableCategories,
    availableBrands
}) => {
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        brands: [],
        priceRange: null,
    });

    // Memoize callback to prevent Sidebar re-render
    const handleFilterChange = useCallback((newFilters: FilterState) => {
        setFilters(newFilters);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header - Won't re-render when filters change */}
            <Header />

            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar with Filter - Won't re-render due to memoized callback */}
                <Sidebar
                    onFilterChange={handleFilterChange}
                    availableCategories={availableCategories}
                    availableBrands={availableBrands}
                />

                {/* Main Content - ONLY this re-renders when filters change */}
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto">
                        {children(filters)}
                    </div>
                </main>
            </div>

            {/* Footer - Won't re-render when filters change */}
            <Footer />
        </div>
    );
};

export default CategoryLayout;
