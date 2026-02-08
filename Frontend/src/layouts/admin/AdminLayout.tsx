import React, { useState } from 'react';
import { Outlet /*, Navigate */ } from 'react-router-dom'; // Navigate commented - auth bypassed
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Bell, Search, User, Menu } from 'lucide-react';

const AdminLayout: React.FC = () => {
    // TODO: Re-enable authentication when API is ready
    // const isAdmin = localStorage.getItem('admin_token');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Temporarily bypassed for development - uncomment when API is ready
    // if (!isAdmin) {
    //     return <Navigate to="/admin/login" replace />;
    // }

    return (
        <div className="flex bg-slate-100 min-h-screen font-sans antialiased text-slate-800">
            {/* Sidebar (Desktop: Fixed, Mobile: Toggle) */}
            <div className={`${sidebarOpen ? 'w-56' : 'w-0'} transition-all duration-300 bg-slate-900 border-r border-slate-800 overflow-hidden sticky top-0 h-screen z-50`}>
                <div className="h-full w-56">
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

export default AdminLayout;