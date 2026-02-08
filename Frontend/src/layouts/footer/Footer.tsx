import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Headphones, Truck, Clock, Phone, Facebook, Youtube, MapPin, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    // Start confetti loop if not running
                    if (!intervalRef.current) {
                        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
                        const random = (min: number, max: number) => Math.random() * (max - min) + min;

                        intervalRef.current = setInterval(() => {
                            const particleCount = 20;
                            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
                            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
                        }, 500); // Trigger every 500ms
                    }
                } else {
                    // Stop confetti loop
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        confetti.reset(); // clear existing confetti immediately if desired, or let them fall
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            observer.disconnect();
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <footer ref={footerRef} className="w-full bg-gray-50 border-t-2 border-orange-500 mt-auto shadow-2xl">
            {/* Top Banner - Orange Premium Compact */}
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 py-3 shadow-md relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-white">
                        <FeatureBadge icon={Shield} title="BẢO HÀNH 12 THÁNG" />
                        <FeatureBadge icon={Headphones} title="HỖ TRỢ KỸ THUẬT" />
                        <FeatureBadge icon={Truck} title="GIAO HÀNG TOÀN QUỐC" />
                        <FeatureBadge icon={Clock} title="GIAO TRONG NGÀY" />
                    </div>
                </div>
            </div>



            {/* Main Footer Content - Premium Grid */}
            <div className="bg-white py-6 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Column 1: Company Info */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-500 pb-1 inline-block">
                                Về chúng tôi
                            </h3>
                            <div className="space-y-2">
                                <p className="text-xs font-black text-gray-900 leading-relaxed">
                                    CÔNG TY TNHH TMDV LINH KIỆN SÀI GÒN
                                </p>
                                <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wide mb-2">
                                    Gọi mua hàng
                                </p>

                                <div className="flex items-center gap-2 mb-3 group">
                                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <a href="tel:19002667" className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:from-orange-700 hover:to-red-700 transition-all duration-300">
                                        0902962497
                                    </a>
                                </div>
                                <p className="text-[10px] text-gray-500 italic mb-3 pl-1">
                                    (08:00-20:00 tất cả các ngày trong tuần)
                                </p>

                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200 space-y-1">
                                    <p className="text-xs font-black text-gray-800 uppercase tracking-wide">
                                        Khách mua sỉ
                                    </p>
                                    <p className="text-[11px] text-gray-700 font-semibold flex items-center gap-1.5">
                                        <Phone className="w-3 h-3 text-orange-600" />
                                        0902962497
                                    </p>
                                    <p className="text-[11px] text-gray-700 font-semibold flex items-center gap-1.5">
                                        <Mail className="w-3 h-3 text-orange-600" />
                                        linhkienmcv@gmail.com
                                    </p>
                                </div>

                                {/* Social Icons */}
                                <div className="flex items-center gap-3 mt-5">
                                    <a href="#" className="group bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110">
                                        <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                                    </a>
                                    <a href="#" className="group bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110">
                                        <Youtube className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Customer Support */}
                        <div>
                            <h3 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-500 pb-1 inline-block">
                                Hỗ trợ khách hàng
                            </h3>
                            <ul className="space-y-1.5">
                                {[
                                    { label: 'Phương thức thanh toán', path: '/policy/payment-methods' },
                                    { label: 'Hướng dẫn cách thức mua hàng', path: '/policy/ordering-guide' },
                                    { label: 'Chính sách đổi trả sản phẩm', path: '/policy/return-policy' },
                                    { label: 'Chính sách bảo hành', path: '/policy/warranty-policy' },
                                    { label: 'Chính sách bảo mật thông tin', path: '/policy/privacy-policy' },
                                    { label: 'Hợp tác cùng phát triển', path: '/policy/cooperation' },
                                    { label: 'Ưu đãi khách hàng thân thiết', path: '/policy/loyalty-program' }
                                ].map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path} className="text-xs text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium hover:translate-x-1 inline-block hover:font-bold">
                                            › {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: About Us */}
                        <div>
                            <h3 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-500 pb-1 inline-block">
                                Về chúng tôi
                            </h3>
                            <ul className="space-y-1.5">
                                {[
                                    { label: 'Giới thiệu công ty', path: '/policy/about-us' },
                                    { label: 'Hình ảnh công ty', path: '/policy/about-us' },
                                    { label: 'Tuyển dụng', path: '/policy/careers' },
                                    { label: 'Góp ý - Khiếu nại', path: '/policy/complaints' },
                                    { label: 'Liên hệ', path: '/policy/contact' },
                                    { label: 'Tài khoản', path: '/admin/login' }
                                ].map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path} className="text-xs text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium hover:translate-x-1 inline-block hover:font-bold">
                                            › {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Store Locations */}
                        <div>
                            <h3 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-orange-500 pb-1 inline-block">
                                Hệ thống cửa hàng
                            </h3>
                            <div className="space-y-3">
                                <StoreLocation
                                    name="CN Q12"
                                    address="73/312 Hiệp Thành 12, P.Hiệp Thành, Q12, TPHCM"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright - Elegant */}
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-5 border-t-2 border-gray-700 shadow-inner">
                <div className="container mx-auto px-4">
                    <p className="text-xs text-gray-300 text-center leading-relaxed">
                        Copyright © 2006 - {new Date().getFullYear()}{' '}
                        <span className="font-black text-orange-400">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ Linh Kiện Sài Gòn </span>
                        <br className="sm:hidden" />
                        <span className="text-gray-400">
                            {' '}Bảng ký kinh doanh số 0902962497.
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Feature Badge Component
interface FeatureBadgeProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer group hover:scale-105 border border-white/20">
        <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 group-hover:rotate-12 transition-all duration-300 shadow-sm flex-shrink-0">
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <p className="font-bold text-[10px] sm:text-xs uppercase tracking-tight leading-tight line-clamp-2">
                {title}
            </p>
        </div>
    </div>
);

// Store Location Component
interface StoreLocationProps {
    name: string;
    address: string;
    workingHours?: string;
    sundayHours?: string;
}

const StoreLocation: React.FC<StoreLocationProps> = ({ name, address, workingHours, sundayHours }) => (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-black text-orange-700 mb-2 uppercase tracking-wide">
                    {name}
                </p>
                <p className="text-xs text-gray-800 font-semibold leading-relaxed mb-2">
                    {address}
                </p>
                {workingHours && (
                    <p className="text-xs text-gray-600 font-medium">
                        {workingHours}
                    </p>
                )}
                {sundayHours && (
                    <p className="text-xs text-gray-600 font-medium">
                        {sundayHours}
                    </p>
                )}
            </div>
        </div>
    </div>
);

export default React.memo(Footer);
