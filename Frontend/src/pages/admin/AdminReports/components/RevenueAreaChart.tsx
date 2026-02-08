import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface RevenueData {
    date: string;
    revenue: number;
}

interface RevenueAreaChartProps {
    title?: string;
}

const RevenueAreaChart: React.FC<RevenueAreaChartProps> = ({
    title = "Doanh thu 30 ngày gần nhất"
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Generate mock data for last 30 days
    const data: RevenueData[] = useMemo(() => {
        const result: RevenueData[] = [];
        const today = new Date();

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Generate realistic revenue patterns
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const baseRevenue = isWeekend ? 15000000 : 25000000;
            const randomFactor = Math.random();

            // Occasional high revenue days
            let revenue = baseRevenue + Math.floor(Math.random() * 15000000);
            if (randomFactor > 0.85) {
                revenue = 45000000 + Math.floor(Math.random() * 30000000);
            }

            result.push({
                date: date.toISOString().split('T')[0],
                revenue
            });
        }
        return result;
    }, []);

    const maxRevenue = Math.max(...data.map(d => d.revenue));
    const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
    const avgRevenue = Math.round(totalRevenue / data.length);

    // Chart dimensions
    const chartWidth = 900;
    const chartHeight = 220;
    const padding = { top: 20, right: 20, bottom: 30, left: 60 };
    const graphWidth = chartWidth - padding.left - padding.right;
    const graphHeight = chartHeight - padding.top - padding.bottom;

    // Scale functions
    const xScale = (index: number) => padding.left + (index / (data.length - 1)) * graphWidth;
    const yScale = (value: number) => {
        const normalized = (value - 0) / (maxRevenue * 1.2 - 0);
        return chartHeight - padding.bottom - normalized * graphHeight;
    };

    // Generate smooth curve path using bezier curves
    const generatePath = () => {
        if (data.length < 2) return '';

        let path = `M ${xScale(0)} ${yScale(data[0].revenue)}`;

        for (let i = 0; i < data.length - 1; i++) {
            const x0 = xScale(i);
            const y0 = yScale(data[i].revenue);
            const x1 = xScale(i + 1);
            const y1 = yScale(data[i + 1].revenue);

            const cpx1 = x0 + (x1 - x0) / 3;
            const cpy1 = y0;
            const cpx2 = x0 + 2 * (x1 - x0) / 3;
            const cpy2 = y1;

            path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x1} ${y1}`;
        }

        return path;
    };

    // Generate area path (filled)
    const generateAreaPath = () => {
        const linePath = generatePath();
        if (!linePath) return '';

        const lastX = xScale(data.length - 1);
        const firstX = xScale(0);
        const bottomY = chartHeight - padding.bottom;

        return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    const formatFullDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatRevenue = (value: number) => {
        if (value >= 1000000000) {
            return `${(value / 1000000000).toFixed(1)}B₫`;
        }
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M₫`;
        }
        return `${(value / 1000).toFixed(0)}K₫`;
    };

    // Y-axis labels
    const yAxisLabels = [0, maxRevenue * 0.25, maxRevenue * 0.5, maxRevenue * 0.75, maxRevenue];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-200">
                        <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
                        <p className="text-sm text-slate-500">
                            Tổng: {formatRevenue(totalRevenue)} • Trung bình: {formatRevenue(avgRevenue)}/ngày
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+12.5%</span>
                </div>
            </div>

            {/* Chart */}
            <div className="relative overflow-x-auto">
                <svg
                    width="100%"
                    height={chartHeight}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="overflow-visible"
                >
                    {/* Definitions for gradient */}
                    <defs>
                        <linearGradient id="revenueAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="revenueLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="50%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>

                    {/* Grid lines (horizontal) */}
                    {yAxisLabels.map((value, i) => (
                        <g key={i}>
                            <line
                                x1={padding.left}
                                y1={yScale(value)}
                                x2={chartWidth - padding.right}
                                y2={yScale(value)}
                                stroke="#e2e8f0"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                            <text
                                x={padding.left - 10}
                                y={yScale(value)}
                                textAnchor="end"
                                alignmentBaseline="middle"
                                className="text-xs fill-slate-400"
                            >
                                {formatRevenue(value)}
                            </text>
                        </g>
                    ))}

                    {/* Area fill */}
                    <path
                        d={generateAreaPath()}
                        fill="url(#revenueAreaGradient)"
                        className="transition-all duration-300"
                    />

                    {/* Line */}
                    <path
                        d={generatePath()}
                        fill="none"
                        stroke="url(#revenueLineGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-300"
                    />

                    {/* Data points and interaction areas */}
                    {data.map((item, i) => (
                        <g key={i}>
                            {/* Invisible larger area for easier hover */}
                            <rect
                                x={xScale(i) - 15}
                                y={padding.top}
                                width={30}
                                height={graphHeight}
                                fill="transparent"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer"
                            />

                            {/* Visible dot on hover */}
                            {hoveredIndex === i && (
                                <>
                                    {/* Vertical line */}
                                    <line
                                        x1={xScale(i)}
                                        y1={padding.top}
                                        x2={xScale(i)}
                                        y2={chartHeight - padding.bottom}
                                        stroke="#10b981"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                        opacity="0.5"
                                    />

                                    {/* Dot with glow effect */}
                                    <circle
                                        cx={xScale(i)}
                                        cy={yScale(item.revenue)}
                                        r="8"
                                        fill="#10b981"
                                        opacity="0.2"
                                    />
                                    <circle
                                        cx={xScale(i)}
                                        cy={yScale(item.revenue)}
                                        r="5"
                                        fill="#10b981"
                                        stroke="white"
                                        strokeWidth="2"
                                        className="drop-shadow-lg"
                                    />
                                </>
                            )}
                        </g>
                    ))}

                    {/* X-axis labels (show every 3rd day) */}
                    {data.map((item, i) => (
                        i % 3 === 0 && (
                            <text
                                key={i}
                                x={xScale(i)}
                                y={chartHeight - 8}
                                textAnchor="middle"
                                className="text-xs fill-slate-400"
                            >
                                {formatDate(item.date)}
                            </text>
                        )
                    ))}
                </svg>

                {/* Tooltip */}
                {hoveredIndex !== null && (
                    <div
                        className="absolute bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xl pointer-events-none z-20"
                        style={{
                            left: `${(xScale(hoveredIndex) / chartWidth) * 100}%`,
                            top: '20px',
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <p className="text-sm font-bold text-slate-800">
                            Ngày: {formatFullDate(data[hoveredIndex].date)}
                        </p>
                        <p className="text-sm text-emerald-600 font-medium">
                            Doanh thu: <span className="font-bold">{formatRevenue(data[hoveredIndex].revenue)}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <span className="text-sm text-slate-600">Doanh thu hàng ngày</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded" />
                    <span className="text-sm text-slate-600">Xu hướng</span>
                </div>
            </div>
        </div>
    );
};

export default RevenueAreaChart;
