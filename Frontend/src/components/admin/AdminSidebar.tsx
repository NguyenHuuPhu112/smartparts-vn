import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Tag,
    BarChart3
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login state (mock for now)
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', label: 'Tổng quan', icon: LayoutDashboard, exact: true },
        { path: '/admin/products', label: 'Sản phẩm', icon: Package },
        { path: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart },
        { path: '/admin/categories', label: 'Danh mục', icon: Tag },
        { path: '/admin/customers', label: 'Khách hàng', icon: Users },
        { path: '/admin/reports', label: 'Báo cáo', icon: BarChart3 },
        { path: '/admin/settings', label: 'Cài đặt', icon: Settings },
    ];

    return (
        <aside className="w-full h-full bg-slate-900 text-slate-300 flex flex-col">
            {/* Logo Area */}
            <div className="h-14 flex items-center justify-center border-b border-slate-800 bg-slate-950/50">
                <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent tracking-tight">
                    SMARTPARTS ADMIN
                </span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm group
                            ${isActive
                                ? 'bg-orange-600/90 text-white shadow-md shadow-orange-900/20 font-semibold'
                                : 'hover:bg-slate-800 hover:text-white'
                            }
                        `}
                    >
                        <item.icon className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/50">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200 text-sm font-medium group"
                >
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;