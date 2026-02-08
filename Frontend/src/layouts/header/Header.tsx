import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Phone, Users, Gift, ShoppingCart, Smartphone, Tablet, Settings, Wrench, Tag, Headphones, Newspaper, Menu, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import LogoImage from '../../assets/Logo.png';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { totalItems } = useCart();

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            // Optional: clear search after navigation
            // setSearchTerm('');
        }
    };

    return (
        <header className="w-full font-sans z-50">
            {/* --- MAIN HEADER BAR - Orange Theme --- */}
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 shadow-xl">
                <div className="container mx-auto px-4 py-1.5">
                    <div className="flex items-center justify-between gap-6">

                        {/* Logo Section - Image Logo with Effects */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="cursor-pointer group relative block">
                                {/* Glow background effect */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-2xl opacity-30 blur-lg group-hover:opacity-60 group-hover:blur-xl transition-all duration-500 animate-pulse"></div>

                                {/* Border glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>

                                {/* Logo container with rounded corners */}
                                <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl p-3 shadow-2xl group-hover:shadow-orange-500/50 transition-all duration-500 overflow-hidden border-2 border-orange-400/30 group-hover:border-orange-400/80">
                                    {/* Shine effect overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                                    {/* Logo image */}
                                    <img
                                        src={LogoImage}
                                        alt="Linh Phụ Kiện Hcm - Liệu Ng"
                                        className="h-8 w-auto object-contain relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 drop-shadow-md"
                                    />
                                </div>
                            </Link>
                        </div>
                        {/* Search Bar - Orange Theme */}
                        <div className="flex-1 max-w-3xl">
                            <form onSubmit={handleSearch} className="relative group">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    className="w-full py-2 pl-4 pr-12 rounded-full bg-white shadow-md border-2 border-white focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200/50 transition-all duration-300 text-sm placeholder:text-gray-400 font-medium hover:shadow-lg"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full p-1.5 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                                >
                                    <Search className="text-white w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        {/* Right Side Actions - Orange Theme */}
                        <div className="flex items-center gap-4">

                            {/* Hotline - Orange Theme */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-orange-200 hover:border-orange-400">
                                <div className="flex items-center gap-2 px-3 py-1.5">
                                    <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg p-1.5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider leading-none mb-0.5">Hotline</p>
                                        <p className="text-sm font-black bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent leading-none">
                                            0902962497
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Action Icons - Orange Theme */}
                            <div className="flex items-center gap-3">
                                <ActionIcon icon={Users} label="Group" />
                                <ActionIcon icon={Gift} label="Sale" badge="HOT" />
                                <Link to="/cart">
                                    <ActionIcon icon={ShoppingCart} label="Giỏ" count={totalItems} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- NAVIGATION BAR - Orange Accents --- */}
            <div className="bg-white shadow-md border-b-2 border-orange-200">
                <div className="container mx-auto">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center justify-center gap-1 py-1.5 px-4">
                        <NavItem icon={Smartphone} text="Linh kiện điện thoại" color="orange" href="/phone-parts" />
                        <NavItem icon={Tablet} text="Linh kiện iPad" color="orange" href="/ipad-parts" />
                        <NavItem icon={Settings} text="Vật tư ép kính" color="orange" href="/glass-supplies" />
                        <NavItem icon={Wrench} text="Dụng cụ thiết bị" color="orange" href="/tools-equipment" />
                        <NavItem icon={Tag} text="Hàng bán RẺ" color="red" isHot href="/sale" />
                        <NavItem icon={Headphones} text="Phụ kiện" color="orange" href="/accessories" />
                        <NavItem icon={Newspaper} text="Tin tức" color="gray" href="/news" />
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-orange-200">
                        <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">Danh mục</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-orange-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-orange-600" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden bg-white border-t border-orange-200">
                            <div className="grid grid-cols-2 gap-2 p-4">
                                <NavItem icon={Smartphone} text="Điện thoại" color="orange" mobile href="/phone-parts" />
                                <NavItem icon={Tablet} text="iPad" color="orange" mobile href="/ipad-parts" />
                                <NavItem icon={Settings} text="Vật tư" color="orange" mobile href="/glass-supplies" />
                                <NavItem icon={Wrench} text="Dụng cụ" color="orange" mobile href="/tools-equipment" />
                                <NavItem icon={Tag} text="Sale" color="red" isHot mobile href="/sale" />
                                <NavItem icon={Headphones} text="Phụ kiện" color="orange" mobile href="/accessories" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

// Action Icon Component - Orange Theme
interface ActionIconProps {
    icon: LucideIcon;
    label: string;
    badge?: string;
    count?: number;
}

const ActionIcon: React.FC<ActionIconProps> = ({ icon: Icon, label, badge, count }) => (
    <div className="relative group cursor-pointer">
        <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 border border-transparent hover:border-orange-300 hover:bg-orange-50">
            <Icon className="w-4 h-4 text-gray-700 group-hover:text-orange-600 transition-colors" />
        </div>

        {/* Label - Hidden on mobile */}
        <span className="hidden lg:block absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-600 whitespace-nowrap">
            {label}
        </span>

        {/* Hot Badge */}
        {badge && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse border-2 border-white">
                {badge}
            </span>
        )}

        {/* Count Badge */}
        {count !== undefined && count > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-700 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                {count > 9 ? '9+' : count}
            </span>
        )}
    </div>
);

// Navigation Item Component - Orange Theme
interface NavItemProps {
    icon: LucideIcon;
    text: string;
    color: 'orange' | 'red' | 'gray';
    isHot?: boolean;
    mobile?: boolean;
    href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text, color, isHot, mobile, href }) => {
    const colorMap = {
        orange: 'from-orange-500 to-orange-600',
        red: 'from-red-500 to-pink-600',
        gray: 'from-gray-600 to-gray-800',
    };

    const hoverColorMap = {
        orange: 'group-hover:text-orange-600',
        red: 'group-hover:text-red-600',
        gray: 'group-hover:text-gray-700',
    };

    const bgHoverMap = {
        orange: 'hover:bg-orange-50',
        red: 'hover:bg-red-50',
        gray: 'hover:bg-gray-50',
    };

    return (
        <Link to={href} className="relative group">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 ${bgHoverMap[color]} ${mobile ? 'justify-start' : ''}`}>
                <div className={`p-1.5 rounded-md bg-gradient-to-br ${colorMap[color]} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className={`text-xs font-bold text-gray-800 ${hoverColorMap[color]} transition-colors uppercase tracking-tight`}>
                    {text}
                </span>
            </div>

            {/* Hot Badge */}
            {isHot && !mobile && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-xl animate-bounce border-2 border-white">
                    🔥 HOT
                </span>
            )}

            {/* Bottom Border Indicator - Orange Theme */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorMap[color]} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full shadow-lg`}></div>
        </Link>
    );
};

export default React.memo(Header);
