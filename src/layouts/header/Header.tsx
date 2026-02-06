import React, { useState } from 'react';
import { Search, Phone, Users, Gift, ShoppingCart, Smartphone, Tablet, Settings, Wrench, Tag, Headphones, Newspaper, Menu, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="w-full font-sans sticky top-0 z-50">
            {/* --- MAIN HEADER BAR - Professional Design --- */}
            <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 shadow-2xl">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-6">

                        {/* Logo Section - Ultra Professional */}
                        <div className="flex-shrink-0">
                            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl px-8 py-4 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 cursor-pointer group relative overflow-hidden">
                                {/* Animated background shine */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                <div className="relative">
                                    {/* Main Logo Text */}
                                    <div className="text-center">
                                        <h1 className="text-3xl font-black leading-none tracking-tight">
                                            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                                                Linh Phụ Kiện Hcm
                                            </span>
                                        </h1>
                                        {/* Subtitle */}
                                        <p className="text-xs font-bold text-amber-400 tracking-[0.3em] uppercase mt-1.5 drop-shadow-md">
                                            Liệu Ng
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar - Ultra Modern & Clean */}
                        <div className="flex-1 max-w-3xl">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm, linh kiện, phụ kiện..."
                                    className="w-full py-4 pl-6 pr-16 rounded-full bg-white shadow-lg border-2 border-white focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-200/50 transition-all duration-300 text-base placeholder:text-gray-400 font-medium hover:shadow-xl"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full p-3.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                                    <Search className="text-white w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Right Side Actions - Professional Layout */}
                        <div className="flex items-center gap-4">

                            {/* Hotline - Featured */}
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                                <div className="flex items-center gap-3 px-5 py-3">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Hotline</p>
                                        <p className="text-xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent leading-none">
                                            1900 2667
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Action Icons */}
                            <div className="flex items-center gap-3">
                                <ActionIcon icon={Users} label="Group" />
                                <ActionIcon icon={Gift} label="Sale" badge="HOT" />
                                <ActionIcon icon={ShoppingCart} label="Giỏ" count={0} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- NAVIGATION BAR - Clean & Modern --- */}
            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="container mx-auto">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center justify-center gap-1 py-3 px-4">
                        <NavItem icon={Smartphone} text="Linh kiện điện thoại" color="blue" />
                        <NavItem icon={Tablet} text="Linh kiện iPad" color="purple" />
                        <NavItem icon={Settings} text="Vật tư ép kính" color="green" />
                        <NavItem icon={Wrench} text="Dụng cụ thiết bị" color="orange" />
                        <NavItem icon={Tag} text="Hàng bán RẺ" color="red" isHot />
                        <NavItem icon={Headphones} text="Phụ kiện" color="indigo" />
                        <NavItem icon={Newspaper} text="Tin tức" color="gray" />
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200">
                        <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">Danh mục</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden bg-white border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-2 p-4">
                                <NavItem icon={Smartphone} text="Điện thoại" color="blue" mobile />
                                <NavItem icon={Tablet} text="iPad" color="purple" mobile />
                                <NavItem icon={Settings} text="Vật tư" color="green" mobile />
                                <NavItem icon={Wrench} text="Dụng cụ" color="orange" mobile />
                                <NavItem icon={Tag} text="Sale" color="red" isHot mobile />
                                <NavItem icon={Headphones} text="Phụ kiện" color="indigo" mobile />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

// Action Icon Component
interface ActionIconProps {
    icon: LucideIcon;
    label: string;
    badge?: string;
    count?: number;
}

const ActionIcon: React.FC<ActionIconProps> = ({ icon: Icon, label, badge, count }) => (
    <div className="relative group cursor-pointer">
        <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border-2 border-transparent hover:border-orange-200">
            <Icon className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
        </div>

        {/* Label - Hidden on mobile */}
        <span className="hidden lg:block absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-600 whitespace-nowrap">
            {label}
        </span>

        {/* Hot Badge */}
        {badge && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                {badge}
            </span>
        )}

        {/* Count Badge */}
        {count !== undefined && count > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {count > 9 ? '9+' : count}
            </span>
        )}
    </div>
);

// Navigation Item Component
interface NavItemProps {
    icon: LucideIcon;
    text: string;
    color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo' | 'gray';
    isHot?: boolean;
    mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text, color, isHot, mobile }) => {
    const colorMap = {
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-green-500 to-emerald-500',
        orange: 'from-orange-500 to-red-500',
        red: 'from-red-500 to-pink-600',
        indigo: 'from-indigo-500 to-purple-500',
        gray: 'from-gray-600 to-gray-800',
    };

    const hoverColorMap = {
        blue: 'group-hover:text-blue-600',
        purple: 'group-hover:text-purple-600',
        green: 'group-hover:text-green-600',
        orange: 'group-hover:text-orange-600',
        red: 'group-hover:text-red-600',
        indigo: 'group-hover:text-indigo-600',
        gray: 'group-hover:text-gray-700',
    };

    return (
        <div className="relative group">
            <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-50 ${mobile ? 'justify-start' : ''}`}>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${colorMap[color]} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <span className={`text-sm font-bold text-gray-800 ${hoverColorMap[color]} transition-colors uppercase tracking-tight`}>
                    {text}
                </span>
            </div>

            {/* Hot Badge */}
            {isHot && !mobile && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-xl animate-bounce">
                    🔥 HOT
                </span>
            )}

            {/* Bottom Border Indicator */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorMap[color]} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`}></div>
        </div>
    );
};

export default Header;
