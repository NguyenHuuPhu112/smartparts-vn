// Report Types & Interfaces

export interface DailyReport {
    date: string;
    revenue: number;
    orders: number;
    newCustomers: number;
    productsSold: number;
    topProduct: string;
    avgOrderValue: number;
}

export interface ChartDataItem {
    label: string;
    revenue: number;
    orders: number;
}

export interface StatCard {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
}

export interface CategoryData {
    name: string;
    percent: number;
    color: string;
    revenue: number;
}

export interface TopProduct {
    name: string;
    sold: number;
    revenue: number;
}

export type ChartPeriod = 'day' | 'week' | 'month' | 'year';
export type DateRange = 'today' | 'yesterday' | 'week';

export const PERIOD_LABELS: Record<ChartPeriod, { title: string; compareText: string }> = {
    day: { title: 'Doanh thu hôm nay (theo giờ)', compareText: 'hôm qua' },
    week: { title: 'Doanh thu 7 ngày qua', compareText: 'tuần trước' },
    month: { title: 'Doanh thu tháng này', compareText: 'tháng trước' },
    year: { title: 'Doanh thu năm 2026', compareText: 'năm trước' },
};

// Helper function
export const formatRevenue = (value: number): string => {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B₫`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M₫`;
    return `${(value / 1000).toFixed(0)}K₫`;
};

export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
};
