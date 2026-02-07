// ============================================
// Filter Types & Interfaces
// ============================================

export interface FilterState {
    categories: string[];
    brands: string[];
    priceRange: { min: number; max: number } | null;
}

export interface PriceRange {
    label: string;
    min: number;
    max: number;
}

export interface SidebarProps {
    onFilterChange?: (filters: FilterState) => void;
    availableCategories?: string[];
    availableBrands?: string[];
}

export interface FilterSectionProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}
