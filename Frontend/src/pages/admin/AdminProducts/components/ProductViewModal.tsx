import React from 'react';
import { X, Edit } from 'lucide-react';
import type { Product } from '../types';

interface ProductViewModalProps {
    product: Product;
    onClose: () => void;
    onEdit: (product: Product) => void;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({ product, onClose, onEdit }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">Chi tiết sản phẩm</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 rounded-xl object-cover border border-slate-200"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100'; }}
                        />
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">{product.name}</h3>
                            <p className="text-sm text-slate-500">{product.brand} • {product.sku}</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-sm text-slate-500">Giá bán</p>
                            <p className="text-xl font-bold text-orange-600">{product.price.toLocaleString('vi-VN')}₫</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-sm text-slate-500">Tồn kho</p>
                            <p className="text-xl font-bold text-slate-800">{product.stock || 0}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-sm text-slate-500">Đã bán</p>
                            <p className="text-xl font-bold text-green-600">{product.sold}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-sm text-slate-500">Đánh giá</p>
                            <p className="text-xl font-bold text-yellow-600">⭐ {product.rating}</p>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-slate-500 mb-2">Danh mục</p>
                        <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-slate-700 border">
                            {product.category}
                        </span>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-sm text-slate-500 mb-2">Mô tả</p>
                            <p className="text-slate-700">{product.description}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={() => { onClose(); onEdit(product); }}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                        <Edit className="w-4 h-4" />
                        Chỉnh sửa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductViewModal;
