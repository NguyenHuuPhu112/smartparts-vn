import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Calendar, Clock, User, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/mockData';

const NewsPage: React.FC = () => {
    const newsCategories = [
        { name: 'Tất cả', count: newsArticles.length, active: true },
        { name: 'Hướng dẫn', count: 12, active: false },
        { name: 'Review', count: 8, active: false },
        { name: 'Tips & Tricks', count: 15, active: false },
        { name: 'Tin tức', count: 6, active: false },
    ];

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-10 text-white shadow-brand">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-black mb-3">📰 Tin tức & Hướng dẫn</h1>
                        <p className="text-brand-100 text-lg leading-relaxed">
                            Cập nhật tin tức công nghệ mới nhất, hướng dẫn sửa chữa chi tiết, mẹo vặt và review sản phẩm từ đội ngũ chuyên gia SmartParts.
                        </p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {newsCategories.map((cat, index) => (
                        <button
                            key={index}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${cat.active
                                ? 'bg-brand-600 text-white shadow-brand'
                                : 'bg-white text-gray-700 border border-border-medium hover:border-brand-300 hover:text-brand-600'
                                }`}
                        >
                            {cat.name} ({cat.count})
                        </button>
                    ))}
                </div>

                {/* Featured Articles */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-6 h-6 text-accent-500" />
                        <h2 className="text-2xl font-black text-gray-900">Bài viết nổi bật</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                        {newsArticles.filter(article => article.featured).map((article) => (
                            <Link
                                key={article.id}
                                to={`/news/${article.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-border-light hover:border-brand-300 transition-all duration-300 shadow-subtle hover:shadow-brand"
                            >
                                {/* Article Image */}
                                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-brand-50 group-hover:to-brand-100 transition-all duration-300">
                                    <span className="text-gray-500 font-bold text-xl group-hover:text-brand-600">
                                        {article.title}
                                    </span>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-brand-600 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="p-6">
                                    <h3 className="font-black text-gray-900 mb-3 group-hover:text-brand-700 transition-colors text-xl leading-tight line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-border-light">
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5" />
                                                <span>{article.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{article.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{article.readTime}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* All Articles Grid */}
                <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-6">Tất cả bài viết</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsArticles.map((article) => (
                            <Link
                                key={article.id}
                                to={`/news/${article.id}`}
                                className="group bg-white rounded-xl overflow-hidden border border-border-light hover:border-brand-300 transition-all duration-300 cursor-pointer shadow-subtle hover:shadow-brand"
                            >
                                {/* Article Image */}
                                <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-brand-50 group-hover:to-brand-100 transition-all duration-300">
                                    <span className="text-gray-500 font-bold group-hover:text-brand-600 text-center px-4">
                                        Tin tức {article.id}
                                    </span>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-brand-100 text-brand-700 px-2.5 py-1 rounded-lg font-semibold text-xs">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{article.date}</span>
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors line-clamp-2 leading-tight">
                                        {article.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-3 border-t border-border-light">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <User className="w-3.5 h-3.5" />
                                            <span className="font-medium">{article.author}</span>
                                        </div>
                                        <button className="text-brand-600 hover:text-brand-700 font-bold text-sm hover:underline flex items-center gap-1">
                                            Đọc thêm
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            className={`w-11 h-11 rounded-lg font-bold text-sm transition-all duration-200 ${page === 1
                                ? 'bg-brand-600 text-white shadow-brand'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-border-medium hover:border-brand-300'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default NewsPage;
