import React from 'react';
import { Plus, Download, Upload } from 'lucide-react';

interface ProductHeaderProps {
    totalProducts: number;
    onAdd: () => void;
    onImport?: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ totalProducts, onAdd, onImport }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Sản phẩm</h1>
                <p className="text-slate-500 text-sm">
                    Quản lý danh mục sản phẩm của cửa hàng ({totalProducts} sản phẩm)
                </p>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors font-medium">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Xuất Excel</span>
                </button>
                {onImport && (
                    <button
                        onClick={onImport}
                        className="flex items-center gap-2 px-4 py-2 border border-green-500 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
                    >
                        <Upload className="w-4 h-4" />
                        <span className="hidden sm:inline">Import Excel</span>
                    </button>
                )}
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200 font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>Thêm sản phẩm</span>
                </button>
            </div>
        </div>
    );
};

export default ProductHeader;
