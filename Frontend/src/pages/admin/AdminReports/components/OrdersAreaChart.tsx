import React, { useState, useMemo } from 'react';
import { TrendingUp, Droplet } from 'lucide-react';

interface OrderData {
    date: string;
    orders: number;
}

interface OrdersAreaChartProps {
    title?: string;
}

const OrdersAreaChart: React.FC<OrdersAreaChartProps> = ({
    title = "Lượng đơn hàng 30 ngày gần nhất"
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Generate mock data for last 30 days
    const data: OrderData[] = useMemo(() => {
        const result: OrderData[] = [];
        const today = new Date();

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Generate realistic order patterns (weekends lower, occasional spikes)
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const baseOrders = isWeekend ? 15 : 30;
            const randomFactor = Math.random();

            // Occasional spikes
            let orders = baseOrders + Math.floor(Math.random() * 20);
            if (randomFactor > 0.85) {
                orders = 70 + Math.floor(Math.random() * 50); // Spike days
            }

            result.push({
                date: date.toISOString().split('T')[0],
                orders
            });
        }
        return result;
    }, []);

    const maxOrders = Math.max(...data.map(d => d.orders));
    const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
    const avgOrders = Math.round(totalOrders / data.length);

    // Chart dimensions
    const chartWidth = 900;
    const chartHeight = 200;
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const graphWidth = chartWidth - padding.left - padding.right;
    const graphHeight = chartHeight - padding.top - padding.bottom;

    // Scale functions
    const xScale = (index: number) => padding.left + (index / (data.length - 1)) * graphWidth;
    const yScale = (value: number) => {
        const normalized = (value - 0) / (maxOrders * 1.2 - 0);
        return chartHeight - padding.bottom - normalized * graphHeight;
    };

    // Generate smooth curve path using bezier curves
    const generatePath = () => {
        if (data.length < 2) return '';

        let path = `M ${xScale(0)} ${yScale(data[0].orders)}`;

        for (let i = 0; i < data.length - 1; i++) {
            const x0 = xScale(i);
            const y0 = yScale(data[i].orders);
            const x1 = xScale(i + 1);
            const y1 = yScale(data[i + 1].orders);

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

    // Y-axis labels
    const yAxisLabels = [0, 30, 60, 90, 120];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-200">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
                        <p className="text-sm text-slate-500">Tổng: {totalOrders.toLocaleString()} đơn • Trung bình: {avgOrders} đơn/ngày</p>
                    </div>
                </div>
                <div className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                    <Droplet className="w-5 h-5" />
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
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#6366f1" />
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
                                {value}
                            </text>
                        </g>
                    ))}

                    {/* Area fill */}
                    <path
                        d={generateAreaPath()}
                        fill="url(#areaGradient)"
                        className="transition-all duration-300"
                    />

                    {/* Line */}
                    <path
                        d={generatePath()}
                        fill="none"
                        stroke="url(#lineGradient)"
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
                                        stroke="#6366f1"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                        opacity="0.5"
                                    />

                                    {/* Dot */}
                                    <circle
                                        cx={xScale(i)}
                                        cy={yScale(item.orders)}
                                        r="6"
                                        fill="#6366f1"
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
                        <p className="text-sm text-blue-600 font-medium">
                            Số đơn hàng: <span className="font-bold">{data[hoveredIndex].orders}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersAreaChart;
