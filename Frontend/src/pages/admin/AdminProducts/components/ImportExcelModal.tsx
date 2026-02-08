import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import type { Product } from '../types';

interface ImportExcelModalProps {
    onClose: () => void;
    onImport: (products: Partial<Product>[]) => void;
}

interface ImportPreview {
    data: Partial<Product>[];
    errors: string[];
    fileName: string;
}

// Mapping các cột từ file Shopee
const SHOPEE_COLUMN_MAP: Record<string, keyof Product> = {
    'Tên sản phẩm': 'name',
    'Tên Sản phẩm': 'name',
    'Product Name': 'name',
    'Mã sản phẩm': 'sku',
    'SKU': 'sku',
    'SKU sản phẩm': 'sku',
    'Giá': 'price',
    'Giá bán': 'price',
    'Price': 'price',
    'Giá gốc': 'originalPrice',
    'Original Price': 'originalPrice',
    'Tồn kho': 'stock',
    'Số lượng': 'stock',
    'Stock': 'stock',
    'Danh mục': 'category',
    'Category': 'category',
    'Thương hiệu': 'brand',
    'Brand': 'brand',
    'Đã bán': 'sold',
    'Sold': 'sold',
    'Mô tả': 'description',
    'Description': 'description',
    'Hình ảnh': 'image',
    'Image': 'image',
    'Link hình ảnh': 'image',
};

const ImportExcelModal: React.FC<ImportExcelModalProps> = ({ onClose, onImport }) => {
    const [preview, setPreview] = useState<ImportPreview | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const parseExcelFile = async (file: File) => {
        setIsLoading(true);
        const errors: string[] = [];

        try {
            const arrayBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            // Lấy sheet đầu tiên
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON
            const rawData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

            if (rawData.length === 0) {
                errors.push('File không có dữ liệu');
                setPreview({ data: [], errors, fileName: file.name });
                return;
            }

            // Map columns to product fields
            const products: Partial<Product>[] = rawData.map((row, index) => {
                const product: Partial<Product> = {};

                Object.entries(row).forEach(([key, value]) => {
                    const cleanKey = key.trim();
                    const mappedField = SHOPEE_COLUMN_MAP[cleanKey];

                    if (mappedField) {
                        if (mappedField === 'price' || mappedField === 'originalPrice' || mappedField === 'stock' || mappedField === 'sold') {
                            const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d.-]/g, ''));
                            if (!isNaN(numValue)) {
                                (product as Record<string, unknown>)[mappedField] = numValue;
                            }
                        } else {
                            (product as Record<string, unknown>)[mappedField] = String(value);
                        }
                    }
                });

                // Validate required fields
                if (!product.name) {
                    errors.push(`Dòng ${index + 2}: Thiếu tên sản phẩm`);
                }

                // Set defaults
                product.inStock = (product.stock ?? 0) > 0;
                product.rating = product.rating ?? '0';
                product.sold = product.sold ?? 0;
                product.category = product.category || 'Linh kiện điện thoại';
                product.image = product.image || '/placeholder.png';

                return product;
            }).filter(p => p.name); // Only keep products with names

            setPreview({
                data: products,
                errors,
                fileName: file.name
            });
        } catch (error) {
            errors.push(`Lỗi đọc file: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setPreview({ data: [], errors, fileName: file.name });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            parseExcelFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
            parseExcelFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleImport = () => {
        if (preview?.data.length) {
            onImport(preview.data);
            onClose();
        }
    };

    const downloadTemplate = () => {
        const template = [
            {
                'Tên sản phẩm': 'Màn hình iPhone 13 Pro',
                'Mã sản phẩm': 'IP13PRO-LCD',
                'Giá': 2500000,
                'Giá gốc': 3000000,
                'Tồn kho': 50,
                'Danh mục': 'Linh kiện điện thoại',
                'Thương hiệu': 'Apple',
                'Mô tả': 'Màn hình chính hãng'
            },
            {
                'Tên sản phẩm': 'Pin Samsung S21',
                'Mã sản phẩm': 'SS-S21-BAT',
                'Giá': 450000,
                'Giá gốc': 550000,
                'Tồn kho': 100,
                'Danh mục': 'Linh kiện điện thoại',
                'Thương hiệu': 'Samsung',
                'Mô tả': 'Pin dung lượng cao'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        XLSX.writeFile(wb, 'template_import_products.xlsx');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <FileSpreadsheet className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Import sản phẩm từ Excel</h2>
                            <p className="text-sm text-slate-500">Hỗ trợ file .xlsx, .xls, .csv từ Shopee</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {!preview ? (
                        <div className="space-y-4">
                            {/* Upload Area */}
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-slate-300 hover:border-orange-400'
                                    }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                {isLoading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                        <p className="text-slate-600">Đang xử lý file...</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-lg font-medium text-slate-700 mb-2">
                                            Kéo thả file Excel vào đây
                                        </p>
                                        <p className="text-sm text-slate-500 mb-4">
                                            hoặc click để chọn file
                                        </p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".xlsx,.xls,.csv"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                        >
                                            Chọn file Excel
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Template Download */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-blue-800">Tải file mẫu</p>
                                        <p className="text-sm text-blue-600">File Excel mẫu với định dạng chuẩn</p>
                                    </div>
                                </div>
                                <button
                                    onClick={downloadTemplate}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Tải về
                                </button>
                            </div>

                            {/* Column Guide */}
                            <div className="bg-slate-50 rounded-xl p-4">
                                <h3 className="font-medium text-slate-800 mb-3">Hướng dẫn cột dữ liệu:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                    <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
                                        <span className="text-slate-500">Bắt buộc:</span> Tên sản phẩm
                                    </div>
                                    <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
                                        <span className="text-slate-500">SKU:</span> Mã sản phẩm
                                    </div>
                                    <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
                                        <span className="text-slate-500">Giá:</span> Giá / Giá bán
                                    </div>
                                    <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
                                        <span className="text-slate-500">Kho:</span> Tồn kho / Số lượng
                                    </div>
                                    <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
                                        <span className="text-slate-500">Phân loại:</span> Danh mục
                                    </div>
                                    <div className="bg-white px-3 py-2 rounded-lg border border-slate-200">
                                        <span className="text-slate-500">Khác:</span> Thương hiệu, Mô tả
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* File Info */}
                            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                                <div className="flex items-center gap-3">
                                    <FileSpreadsheet className="w-8 h-8 text-green-600" />
                                    <div>
                                        <p className="font-medium text-slate-800">{preview.fileName}</p>
                                        <p className="text-sm text-slate-500">
                                            {preview.data.length} sản phẩm được nhận dạng
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPreview(null)}
                                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100"
                                >
                                    Chọn file khác
                                </button>
                            </div>

                            {/* Errors */}
                            {preview.errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        <p className="font-medium text-red-800">Có {preview.errors.length} cảnh báo</p>
                                    </div>
                                    <ul className="text-sm text-red-600 space-y-1 max-h-24 overflow-y-auto">
                                        {preview.errors.slice(0, 5).map((error, i) => (
                                            <li key={i}>• {error}</li>
                                        ))}
                                        {preview.errors.length > 5 && (
                                            <li>... và {preview.errors.length - 5} cảnh báo khác</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Preview Table */}
                            {preview.data.length > 0 && (
                                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="bg-green-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-green-800">
                                            Xem trước {Math.min(preview.data.length, 10)} sản phẩm đầu tiên
                                        </span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-slate-50 border-b border-slate-200">
                                                <tr>
                                                    <th className="text-left py-3 px-4 font-medium text-slate-600">#</th>
                                                    <th className="text-left py-3 px-4 font-medium text-slate-600">Tên sản phẩm</th>
                                                    <th className="text-left py-3 px-4 font-medium text-slate-600">SKU</th>
                                                    <th className="text-right py-3 px-4 font-medium text-slate-600">Giá</th>
                                                    <th className="text-center py-3 px-4 font-medium text-slate-600">Tồn kho</th>
                                                    <th className="text-left py-3 px-4 font-medium text-slate-600">Danh mục</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {preview.data.slice(0, 10).map((product, i) => (
                                                    <tr key={i} className="hover:bg-slate-50">
                                                        <td className="py-3 px-4 text-slate-500">{i + 1}</td>
                                                        <td className="py-3 px-4 font-medium text-slate-800 max-w-xs truncate">
                                                            {product.name}
                                                        </td>
                                                        <td className="py-3 px-4 text-slate-600">{product.sku || '-'}</td>
                                                        <td className="py-3 px-4 text-right text-green-600 font-medium">
                                                            {product.price ? formatPrice(product.price) : '-'}
                                                        </td>
                                                        <td className="py-3 px-4 text-center">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${(product.stock ?? 0) > 0
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-red-100 text-red-700'
                                                                }`}>
                                                                {product.stock ?? 0}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-slate-600">{product.category}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {preview.data.length > 10 && (
                                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-center text-sm text-slate-500">
                                            ... và {preview.data.length - 10} sản phẩm khác
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex gap-3 justify-end bg-slate-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-white transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={!preview?.data.length}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${preview?.data.length
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        <Upload className="w-4 h-4" />
                        Import {preview?.data.length || 0} sản phẩm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImportExcelModal;
