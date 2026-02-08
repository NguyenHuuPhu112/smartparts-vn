import React from 'react';
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../types';

interface ProductTableProps {
    products: Product[];
    filteredCount: number;
    currentPage: number;
    totalPages: number;
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (id: number | string) => void;
    onPageChange: (page: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
    products,
    filteredCount,
    currentPage,
    totalPages,
    onView,
    onEdit,
    onDelete,
    onPageChange
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                            <th className="p-4 w-12 text-center">
                                <input type="checkbox" className="rounded border-slate-300 text-orange-600 focus:ring-orange-200" />
                            </th>
                            <th className="p-4">Sản phẩm</th>
                            <th className="p-4">SKU</th>
                            <th className="p-4">Danh mục</th>
                            <th className="p-4 text-right">Giá bán</th>
                            <th className="p-4 text-center">Tồn kho</th>
                            <th className="p-4 text-center">Trạng thái</th>
                            <th className="p-4 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-slate-500">
                                    Không tìm thấy sản phẩm nào
                                </td>
                            </tr>
                        ) : products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-4 text-center">
                                    <input type="checkbox" className="rounded border-slate-300 text-orange-600 focus:ring-orange-200" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 p-1 flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded"
                                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40'; }}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm line-clamp-1 max-w-[200px]" title={product.name}>
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-slate-400">{product.brand}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600 font-mono">
                                    {product.sku || 'N/A'}
                                </td>
                                <td className="p-4 text-sm text-slate-600">
                                    <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-sm font-bold text-slate-800">
                                    {product.price.toLocaleString('vi-VN')}₫
                                </td>
                                <td className="p-4 text-center text-sm text-slate-600">
                                    {product.stock || 0}
                                </td>
                                <td className="p-4 text-center">
                                    {product.inStock ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            Còn hàng
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            Hết hàng
                                        </span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            onClick={() => onView(product)}
                                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-500 transition-colors"
                                            title="Xem chi tiết"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-orange-500 transition-colors"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                                            title="Xóa"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Hiển thị <span className="font-bold text-slate-800">{products.length}</span> trên tổng số <span className="font-bold text-slate-800">{filteredCount}</span> sản phẩm
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                                        ${currentPage === page
                                            ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        {totalPages > 5 && <span className="text-slate-400">...</span>}
                    </div>
                    <button
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
