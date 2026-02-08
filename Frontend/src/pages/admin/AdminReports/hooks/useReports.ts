import { useState, useMemo, useCallback } from 'react';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import type {
    DailyReport,
    ChartDataItem,
    ChartPeriod,
    DateRange,
    StatCard,
    CategoryData,
    TopProduct
} from '../types';

// Mock data
const MOCK_DAILY_REPORTS: DailyReport[] = [
    { date: '2026-02-08', revenue: 28500000, orders: 45, newCustomers: 12, productsSold: 89, topProduct: 'Màn hình iPhone 14 Pro', avgOrderValue: 633333 },
    { date: '2026-02-07', revenue: 35200000, orders: 52, newCustomers: 8, productsSold: 124, topProduct: 'Pin iPhone 13', avgOrderValue: 676923 },
    { date: '2026-02-06', revenue: 22100000, orders: 38, newCustomers: 15, productsSold: 67, topProduct: 'Cáp sạc Type-C', avgOrderValue: 581579 },
    { date: '2026-02-05', revenue: 41800000, orders: 61, newCustomers: 9, productsSold: 156, topProduct: 'Kính cường lực iPad', avgOrderValue: 685246 },
    { date: '2026-02-04', revenue: 19600000, orders: 29, newCustomers: 6, productsSold: 48, topProduct: 'Ốp lưng Samsung S24', avgOrderValue: 675862 },
    { date: '2026-02-03', revenue: 33400000, orders: 48, newCustomers: 11, productsSold: 98, topProduct: 'Màn hình iPhone 13', avgOrderValue: 695833 },
    { date: '2026-02-02', revenue: 27900000, orders: 42, newCustomers: 7, productsSold: 82, topProduct: 'Pin iPad Pro', avgOrderValue: 664286 },
];

const MOCK_CATEGORY_DATA: CategoryData[] = [
    { name: 'Linh kiện ĐT', percent: 45, color: 'bg-blue-500', revenue: 95000000 },
    { name: 'Linh kiện iPad', percent: 20, color: 'bg-purple-500', revenue: 42000000 },
    { name: 'Vật tư ép kính', percent: 15, color: 'bg-green-500', revenue: 31500000 },
    { name: 'Dụng cụ', percent: 12, color: 'bg-orange-500', revenue: 25200000 },
    { name: 'Phụ kiện', percent: 8, color: 'bg-pink-500', revenue: 16800000 },
];

const MOCK_TOP_PRODUCTS: TopProduct[] = [
    { name: 'Màn hình iPhone 14 Pro Max', sold: 23, revenue: 11500000 },
    { name: 'Pin iPhone 13', sold: 18, revenue: 3600000 },
    { name: 'Cáp sạc Type-C', sold: 45, revenue: 2250000 },
    { name: 'Kính cường lực iPad Pro', sold: 12, revenue: 1200000 },
    { name: 'Ốp lưng Samsung S24', sold: 28, revenue: 1680000 },
];

export const useReports = () => {
    const [dateRange, setDateRange] = useState<DateRange>('today');
    const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('week');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState<DailyReport | null>(null);

    const dailyReports = MOCK_DAILY_REPORTS;
    const categoryData = MOCK_CATEGORY_DATA;
    const topProducts = MOCK_TOP_PRODUCTS;

    // Generate chart data based on period
    const chartData = useMemo((): ChartDataItem[] => {
        switch (chartPeriod) {
            case 'day':
                return Array.from({ length: 24 }, (_, i) => ({
                    label: `${i}h`,
                    revenue: Math.floor(Math.random() * 3000000 + 500000),
                    orders: Math.floor(Math.random() * 8 + 1)
                }));
            case 'week':
                return dailyReports.slice().reverse().map(r => ({
                    label: new Date(r.date).toLocaleDateString('vi-VN', { weekday: 'short' }),
                    revenue: r.revenue,
                    orders: r.orders
                }));
            case 'month':
                return [
                    { label: 'Tuần 1', revenue: 125000000, orders: 189 },
                    { label: 'Tuần 2', revenue: 142000000, orders: 215 },
                    { label: 'Tuần 3', revenue: 98000000, orders: 156 },
                    { label: 'Tuần 4', revenue: 168000000, orders: 248 },
                ];
            case 'year':
                return [
                    { label: 'T1', revenue: 420000000, orders: 620 },
                    { label: 'T2', revenue: 380000000, orders: 580 },
                    { label: 'T3', revenue: 510000000, orders: 750 },
                    { label: 'T4', revenue: 450000000, orders: 680 },
                    { label: 'T5', revenue: 620000000, orders: 890 },
                    { label: 'T6', revenue: 580000000, orders: 820 },
                    { label: 'T7', revenue: 720000000, orders: 1050 },
                    { label: 'T8', revenue: 680000000, orders: 980 },
                    { label: 'T9', revenue: 550000000, orders: 790 },
                    { label: 'T10', revenue: 490000000, orders: 720 },
                    { label: 'T11', revenue: 610000000, orders: 860 },
                    { label: 'T12', revenue: 850000000, orders: 1200 },
                ];
            default:
                return [];
        }
    }, [chartPeriod, dailyReports]);

    // Calculate chart stats
    const maxRevenue = Math.max(...chartData.map(d => d.revenue));
    const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
    const totalOrders = chartData.reduce((sum, d) => sum + d.orders, 0);

    // Get current stats based on date range
    const currentStats = useMemo(() => {
        switch (dateRange) {
            case 'today':
                return dailyReports[0];
            case 'yesterday':
                return dailyReports[1];
            case 'week':
                return {
                    revenue: dailyReports.reduce((sum, r) => sum + r.revenue, 0),
                    orders: dailyReports.reduce((sum, r) => sum + r.orders, 0),
                    newCustomers: dailyReports.reduce((sum, r) => sum + r.newCustomers, 0),
                    productsSold: dailyReports.reduce((sum, r) => sum + r.productsSold, 0),
                };
            default:
                return dailyReports[0];
        }
    }, [dateRange, dailyReports]);

    // Stats cards config
    const statsCards: StatCard[] = useMemo(() => [
        {
            title: 'Doanh thu',
            value: `${(currentStats.revenue / 1000000).toFixed(1)}M₫`,
            change: '+18.2%',
            isPositive: true,
            icon: DollarSign,
            color: 'from-green-400 to-emerald-500',
            bgColor: 'bg-green-50'
        },
        {
            title: 'Đơn hàng',
            value: currentStats.orders.toString(),
            change: '+12.5%',
            isPositive: true,
            icon: ShoppingCart,
            color: 'from-blue-400 to-indigo-500',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Khách hàng mới',
            value: currentStats.newCustomers.toString(),
            change: '-5.3%',
            isPositive: false,
            icon: Users,
            color: 'from-purple-400 to-violet-500',
            bgColor: 'bg-purple-50'
        },
        {
            title: 'Sản phẩm bán ra',
            value: currentStats.productsSold.toString(),
            change: '+22.1%',
            isPositive: true,
            icon: Package,
            color: 'from-orange-400 to-red-500',
            bgColor: 'bg-orange-50'
        },
    ], [currentStats]);

    // Handlers
    const handleViewDetail = useCallback((report: DailyReport) => {
        setSelectedReport(report);
        setShowDetailModal(true);
    }, []);

    const closeDetailModal = useCallback(() => {
        setShowDetailModal(false);
        setSelectedReport(null);
    }, []);

    return {
        // State
        dateRange,
        chartPeriod,
        showDetailModal,
        selectedReport,

        // Data
        dailyReports,
        categoryData,
        topProducts,
        chartData,
        statsCards,

        // Computed
        maxRevenue,
        totalRevenue,
        totalOrders,

        // Handlers
        setDateRange,
        setChartPeriod,
        handleViewDetail,
        closeDetailModal
    };
};
