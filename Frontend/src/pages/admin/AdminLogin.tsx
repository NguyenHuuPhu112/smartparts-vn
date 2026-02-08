import React, { useState } from 'react';
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

export default AdminLogin;