import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { StatCard } from '../types';

interface StatsCardsProps {
    stats: StatCard[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
                <div key={index} className={`${stat.bgColor} rounded-2xl p-5 border border-white/50`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm">
                        <span className={`flex items-center font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.isPositive ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
                            {stat.change}
                        </span>
                        <span className="text-slate-500 ml-2">so với kỳ trước</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
