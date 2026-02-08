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
        <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-center border-b border-slate-700 bg-slate-950">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    ADMIN PANEL
                </span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive 
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }
                        `}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-700 bg-slate-950">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;