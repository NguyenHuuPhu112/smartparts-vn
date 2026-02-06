import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Content will go here */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Danh sách sản phẩm
                            </h2>
                            <p className="text-gray-600">
                                Nội dung chính sẽ hiển thị ở đây...
                            </p>

                            {/* Placeholder for product grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <div
                                        key={item}
                                        className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                                            <span className="text-gray-500 font-semibold">
                                                Sản phẩm {item}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 mb-2">
                                            Tên sản phẩm {item}
                                        </h3>
                                        <p className="text-red-600 font-bold text-lg">
                                            {(Math.random() * 1000000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
