const fs = require('fs');
const path = require('path');

const files = {
    'src/pages/admin/AdminCategories.tsx': `import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Tag, Smartphone } from 'lucide-react';

const AdminCategories: React.FC = () => {
    // Mock Data for Categories & Brands
    const [categories, setCategories] = useState([
        { id: 1, name: 'Linh kiện điện thoại', count: 156 },
        { id: 2, name: 'Linh kiện iPad', count: 89 },
        { id: 3, name: 'Vật tư ép kính', count: 234 },
        { id: 4, name: 'Dụng cụ thiết bị', count: 45 },
        { id: 5, name: 'Phụ kiện', count: 120 },
    ]);

    const [brands, setBrands] = useState([
        { id: 1, name: 'Apple', count: 320 },
        { id: 2, name: 'Samsung', count: 210 },
        { id: 3, name: 'Xiaomi', count: 150 },
        { id: 4, name: 'Oppo', count: 98 },
        { id: 5, name: 'Vivo', count: 76 },
        { id: 6, name: 'Realme', count: 54 },
    ]);

    const [newCategory, setNewCategory] = useState('');
    const [newBrand, setNewBrand] = useState('');

    const handleAddCategory = () => {
        if (newCategory) {
            setCategories([...categories, { id: Date.now(), name: newCategory, count: 0 }]);
            setNewCategory('');
        }
    };

    const handleAddBrand = () => {
        if (newBrand) {
            setBrands([...brands, { id: Date.now(), name: newBrand, count: 0 }]);
            setNewBrand('');
        }
    };

    const handleDeleteCategory = (id: number) => {
        if (confirm('Xóa danh mục này?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    const handleDeleteBrand = (id: number) => {
        if (confirm('Xóa thương hiệu này?')) {
            setBrands(brands.filter(b => b.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Danh mục & Thương hiệu</h1>
                <p className="text-slate-500 text-sm">Quản lý các loại sản phẩm và hãng sản xuất</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Categories Management */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Tag className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Danh mục sản phẩm</h2>
                    </div>

                    {/* Add Category Form */}
                    <div className="flex gap-2 mb-6">
                        <input 
                            type="text" 
                            placeholder="Tên danh mục mới..." 
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        <button 
                            onClick={handleAddCategory}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Thêm
                        </button>
                    </div>

                    {/* Categories List */}
                    <div className="space-y-3">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-slate-700">{cat.name}</span>
                                    <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">{cat.count} SP</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCategory(cat.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brands Management */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Smartphone className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Thương hiệu</h2>
                    </div>

                    {/* Add Brand Form */}
                    <div className="flex gap-2 mb-6">
                        <input 
                            type="text" 
                            placeholder="Tên thương hiệu mới..." 
                            value={newBrand}
                            onChange={(e) => setNewBrand(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                        <button 
                            onClick={handleAddBrand}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Thêm
                        </button>
                    </div>

                    {/* Brands List */}
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                        {brands.map((brand) => (
                            <div key={brand.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-slate-700">{brand.name}</span>
                                    <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">{brand.count} SP</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteBrand(brand.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;`,
    'src/pages/admin/AdminLogin.tsx': `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Loader2, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (username === 'admin' && password === '123123') {
            localStorage.setItem('admin_token', 'true');
            navigate('/admin');
        } else {
            setError('Sai tên đăng nhập hoặc mật khẩu!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Quản Trị Viên</h1>
                    <p className="text-orange-100 text-sm opacity-90">Đăng nhập để vào hệ thống</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="p-8 space-y-6">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 text-red-400 text-sm animate-shake">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Username */}
                        <div className="relative group">
                            <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-600"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : (
                            'Đăng nhập'
                        )}
                    </button>
                    
                    <p className="text-center text-slate-500 text-xs mt-6">
                        SmartParts Admin Panel &copy; 2026
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;`,
    'src/components/admin/AdminSidebar.tsx': `import React from 'react';
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
                        className={({ isActive }) => \`
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            \${isActive 
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }
                        \`}
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

export default AdminSidebar;`,
    'src/layouts/admin/AdminLayout.tsx': `import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Bell, Search, User, Menu } from 'lucide-react';

const AdminLayout: React.FC = () => {
    // Check authentication (simple mock check)
    const isAdmin = localStorage.getItem('admin_token');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex bg-slate-100 min-h-screen font-sans antialiased text-slate-800">
            {/* Sidebar (Desktop: Fixed, Mobile: Toggle) */}
            <div className={\`\${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-slate-900 border-r border-slate-800 overflow-hidden\`}>
                <div className="h-full w-64">
                    <AdminSidebar />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
                
                {/* Admin Header */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm">
                    {/* Left: Sidebar Toggle & Breadcrumbs */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="font-bold text-lg text-slate-800 hidden md:block">
                            Quản trị viên
                        </h1>
                    </div>

                    {/* Right: Search, Notifications, Profile */}
                    <div className="flex items-center gap-6">
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center relative group">
                            <Search className="w-4 h-4 absolute left-3 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm..." 
                                className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none w-64 text-sm transition-all"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors group">
                            <Bell className="w-5 h-5 text-slate-600 group-hover:text-orange-600" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-800">Admin</p>
                                <p className="text-xs text-slate-500">Super User</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-200 ring-2 ring-white cursor-pointer hover:scale-105 transition-transform">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;`
};

// Write files with explicit utf8 encoding
Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(__dirname, filePath);
    try {
        fs.writeFileSync(fullPath, content, { encoding: 'utf8' });
        console.log(`Rewrote ${filePath} successfully.`);
    } catch (err) {
        console.error(`Failed to rewrite ${filePath}:`, err);
    }
});
