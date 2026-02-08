import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { staticContent } from '../../data/staticContent';
import { ChevronRight, Home } from 'lucide-react';

const StaticPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Nếu không có slug hoặc slug không tồn tại trong staticContent
    if (!slug || !staticContent[slug]) {
        return <Navigate to="/" replace />;
    }

    const { title, content } = staticContent[slug];

    // Sidebar navigation items
    const clientSupportLinks = [
        { slug: 'payment-methods', label: 'Phương thức thanh toán' },
        { slug: 'ordering-guide', label: 'Hướng dẫn mua hàng' },
        { slug: 'return-policy', label: 'Chính sách đổi trả' },
        { slug: 'warranty-policy', label: 'Chính sách bảo hành' },
        { slug: 'privacy-policy', label: 'Chính sách bảo mật' },
        { slug: 'cooperation', label: 'Hợp tác phát triển' },
        { slug: 'loyalty-program', label: 'Khách hàng thân thiết' },
    ];

    const aboutUsLinks = [
        { slug: 'about-us', label: 'Giới thiệu công ty' },
        { slug: 'careers', label: 'Tuyển dụng' },
        { slug: 'complaints', label: 'Góp ý - Khiếu nại' },
        { slug: 'contact', label: 'Liên hệ' },
    ];

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                        <Link to="/" className="hover:text-brand-600 flex items-center gap-1 transition-colors">
                            <Home className="w-4 h-4" />
                            Trang chủ
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        <span className="text-gray-900 font-medium truncate">{title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Hỗ trợ khách hàng */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900">Hỗ trợ khách hàng</h3>
                                </div>
                                <div className="p-2">
                                    {clientSupportLinks.map(link => (
                                        <Link
                                            key={link.slug}
                                            to={`/policy/${link.slug}`}
                                            className={`block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${slug === link.slug
                                                ? 'bg-brand-50 text-brand-700 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Về chúng tôi */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900">Về chúng tôi</h3>
                                </div>
                                <div className="p-2">
                                    {aboutUsLinks.map(link => (
                                        <Link
                                            key={link.slug}
                                            to={`/policy/${link.slug}`}
                                            className={`block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${slug === link.slug
                                                ? 'bg-brand-50 text-brand-700 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
                                <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                    {title}
                                </h1>

                                <div
                                    className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-h3:text-gray-800 prose-p:text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />

                                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                                    <span>Cập nhật lần cuối: 08/02/2026</span>
                                    <Link to="/contact" className="text-brand-600 hover:underline hover:text-brand-700 font-medium flex items-center gap-1">
                                        Cần hỗ trợ thêm? Liên hệ ngay <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default StaticPage;
