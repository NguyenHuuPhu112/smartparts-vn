import React from 'react';
import { Shield, Headphones, Truck, Clock, Phone, Facebook, Youtube, MapPin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 border-t-4 border-orange-500 mt-auto">
            {/* Top Banner - Orange Premium */}
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 py-6 shadow-2xl">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
                        <FeatureBadge icon={Shield} title="BẢO HÀNH 12 THÁNG" />
                        <FeatureBadge icon={Headphones} title="HƯỚNG DẪN KỸ THUẬT TRỌN ĐỜI" />
                        <FeatureBadge icon={Truck} title="GIAO HÀNG TẬN NƠI TOÀN QUỐC" />
                        <FeatureBadge icon={Clock} title="GIAO HÀNG NỘI THÀNH TRONG NGÀY" />
                    </div>
                </div>
            </div>

            {/* Tags/Categories - Modern Pills */}
            <div className="bg-white py-6 border-b-2 border-gray-200 shadow-inner">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            'Nội cạm điện Xiaomi',
                            'Máy lọc nước Xiaomi',
                            'Phụ gia dụ phòng Xiaomi',
                            'Xe máy Xiaomi',
                            'Máy hút mùi căm tay Xiaomi',
                            'Tả xế động Maxcol',
                            'Hóp điện tử Xiaomi'
                        ].map((tag, index) => (
                            <span
                                key={index}
                                className="group px-5 py-2.5 bg-white border-2 border-orange-400 text-gray-800 rounded-full text-xs font-bold hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-600 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content - Premium Grid */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Column 1: Company Info */}
                        <div className="space-y-4">
                            <h3 className="text-base font-black text-gray-900 mb-5 uppercase tracking-wide border-b-4 border-orange-500 pb-2 inline-block">
                                Về chúng tôi
                            </h3>
                            <div className="space-y-3">
                                <p className="text-sm font-black text-gray-900 leading-relaxed">
                                    CÔNG TY TNHH TMDV CHIẾM TÀI
                                </p>
                                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-4">
                                    Gọi mua hàng
                                </p>

                                <div className="flex items-center gap-3 mb-4 group">
                                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <a href="tel:19002667" className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:from-orange-700 hover:to-red-700 transition-all duration-300">
                                        1900 2667
                                    </a>
                                </div>
                                <p className="text-xs text-gray-500 italic mb-5 pl-1">
                                    (08:00-20:00 tất cả các ngày trong tuần)
                                </p>

                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200 space-y-2">
                                    <p className="text-sm font-black text-gray-800 uppercase tracking-wide">
                                        Khách mua sỉ
                                    </p>
                                    <p className="text-xs text-gray-700 font-semibold flex items-center gap-2">
                                        <Phone className="w-3 h-3 text-orange-600" />
                                        0908.810.881
                                    </p>
                                    <p className="text-xs text-gray-700 font-semibold flex items-center gap-2">
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
                            <h3 className="text-base font-black text-gray-900 mb-5 uppercase tracking-wide border-b-4 border-orange-500 pb-2 inline-block">
                                Hỗ trợ khách hàng
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Phương thức thanh toán',
                                    'Hướng dẫn cách thức mua hàng',
                                    'Chính sách đổi trả sản phẩm',
                                    'Chính sách bảo hành',
                                    'Chính sách bảo mật thông tin',
                                    'Hợp tác cùng phát triển',
                                    'Ưu đãi khách hàng thân thiết'
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium hover:translate-x-2 inline-block hover:font-bold">
                                            › {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: About Us */}
                        <div>
                            <h3 className="text-base font-black text-gray-900 mb-5 uppercase tracking-wide border-b-4 border-orange-500 pb-2 inline-block">
                                Về chúng tôi
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Giới thiệu công ty',
                                    'Hình ảnh công ty',
                                    'Tuyển dụng',
                                    'Góp ý - Khiếu nại',
                                    'Liên hệ',
                                    'Tài khoản'
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium hover:translate-x-2 inline-block hover:font-bold">
                                            › {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Store Locations */}
                        <div>
                            <h3 className="text-base font-black text-gray-900 mb-5 uppercase tracking-wide border-b-4 border-orange-500 pb-2 inline-block">
                                Hệ thống cửa hàng
                            </h3>
                            <div className="space-y-4">
                                <StoreLocation
                                    name="CN Q5"
                                    address="147 - 149 Nguyễn Thị Phương, P8, Q5, TPHCM"
                                />
                                <StoreLocation
                                    name="CN Q6"
                                    address="128 - 130 Hậu Giang, P6, Q6, TPHCM"
                                    workingHours="T2 - T7: 08h00 ~ 21h00"
                                    sundayHours="CN: 08h00 ~ 18h00"
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
                        <span className="font-black text-orange-400">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ CHIẾM TÀI</span>
                        <br className="sm:hidden" />
                        <span className="text-gray-400">
                            {' '}Bảng ký kinh doanh số 0305099036. Giấy Số Kế hoạch và Đầu tư thành phố TPHCM cấp ngày 22/01/2009
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
    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 cursor-pointer group hover:scale-105 shadow-lg hover:shadow-2xl border-2 border-white/20">
        <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 group-hover:rotate-12 transition-all duration-300 shadow-xl">
            <Icon className="w-7 h-7" />
        </div>
        <div>
            <p className="font-black text-sm uppercase tracking-tight leading-tight">
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

export default Footer;
