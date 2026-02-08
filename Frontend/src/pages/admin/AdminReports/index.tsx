import React from 'react';
import { useReports } from './hooks/useReports';
import {
    ReportHeader,
    StatsCards,
    RevenueChart,
    CategoryChart,
    TopProducts,
    DailyReportsTable,
    ReportDetailModal,
    OrdersAreaChart,
    RevenueAreaChart
} from './components';

const AdminReports: React.FC = () => {
    const {
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
    } = useReports();

    return (
        <div className="space-y-6">
            {/* Header */}
            <ReportHeader
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
            />

            {/* Stats Cards */}
            <StatsCards stats={statsCards} />

            {/* Revenue Chart */}
            <RevenueChart
                chartData={chartData}
                chartPeriod={chartPeriod}
                maxRevenue={maxRevenue}
                totalRevenue={totalRevenue}
                totalOrders={totalOrders}
                onPeriodChange={setChartPeriod}
            />

            {/* Orders Area Chart - 30 days */}
            <OrdersAreaChart />

            {/* Revenue Area Chart - 30 days */}
            <RevenueAreaChart />

            {/* Daily Reports Table */}
            <DailyReportsTable
                reports={dailyReports}
                onViewDetail={handleViewDetail}
            />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Distribution */}
                <CategoryChart categoryData={categoryData} />

                {/* Top Products */}
                <TopProducts products={topProducts} />
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedReport && (
                <ReportDetailModal
                    report={selectedReport}
                    onClose={closeDetailModal}
                />
            )}
        </div>
    );
};

export default AdminReports;
