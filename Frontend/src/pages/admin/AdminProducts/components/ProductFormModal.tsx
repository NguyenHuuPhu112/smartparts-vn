import React from 'react';
import { X, Save, ImagePlus, Package } from 'lucide-react';
import type { ProductFormData } from '../types';
import { CATEGORIES, BRANDS } from '../types';

interface ProductFormModalProps {
    isEdit: boolean;
    formData: ProductFormData;
    onClose: () => void;
    onSave: () => void;
    onFormChange: (updates: Partial<ProductFormData>) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
    isEdit,
    formData,
    onClose,
    onSave,
    onFormChange
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Package className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">
                            {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-5">
                    {/* Name & SKU */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Tên sản phẩm *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => onFormChange({ name: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                placeholder="Nhập tên sản phẩm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">SKU</label>
                            <input
                                type="text"
                                value={formData.sku}
                                onChange={(e) => onFormChange({ sku: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all font-mono"
                                placeholder="SKU-00001"
                            />
                        </div>
                    </div>

                    {/* Category & Brand */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Danh mục *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => onFormChange({ category: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all cursor-pointer"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Thương hiệu</label>
                            <select
                                value={formData.brand}
                                onChange={(e) => onFormChange({ brand: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all cursor-pointer"
                            >
                                {BRANDS.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Prices */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá bán *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => onFormChange({ price: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá gốc</label>
                            <input
                                type="number"
                                value={formData.originalPrice}
                                onChange={(e) => onFormChange({ originalPrice: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Tồn kho</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => onFormChange({ stock: Number(e.target.value) })}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">URL Hình ảnh</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => onFormChange({ image: e.target.value })}
                                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                placeholder="https://example.com/image.jpg"
                            />
                            <button className="px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-600">
                                <ImagePlus className="w-4 h-4" />
                                Upload
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả sản phẩm</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => onFormChange({ description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                            placeholder="Nhập mô tả chi tiết sản phẩm..."
                        />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSave}
                        className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-lg shadow-orange-200"
                    >
                        <Save className="w-4 h-4" />
                        {isEdit ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;
