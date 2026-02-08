import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Tag, Smartphone } from 'lucide-react';

const AdminCategories: React.FC = () => {
    // Mock Data for Categories & Brands
    const [categories, setCategories] = useState([
        { id: 1, name: 'Linh kiện điện thoại', count: 156 },
        { id: 2, name: 'Linh kiện iPad', count: 89 },
        { id: 3, name: 'Vật tư ép kính', count: 234 },
        { id: 4, name: 'Dụng cụ thiết bị', count: 45 },
        { id: 5, name: 'Phụ kiện', count: 120 },
    ]);

    const [brands, setBrands] = useState([
        { id: 1, name: 'Apple', count: 320 },
        { id: 2, name: 'Samsung', count: 210 },
        { id: 3, name: 'Xiaomi', count: 150 },
        { id: 4, name: 'Oppo', count: 98 },
        { id: 5, name: 'Vivo', count: 76 },
        { id: 6, name: 'Realme', count: 54 },
    ]);

    const [newCategory, setNewCategory] = useState('');
    const [newBrand, setNewBrand] = useState('');

    const handleAddCategory = () => {
        if (newCategory) {
            setCategories([...categories, { id: Date.now(), name: newCategory, count: 0 }]);
            setNewCategory('');
        }
    };

    const handleAddBrand = () => {
        if (newBrand) {
            setBrands([...brands, { id: Date.now(), name: newBrand, count: 0 }]);
            setNewBrand('');
        }
    };

    const handleDeleteCategory = (id: number) => {
        if (confirm('Xóa danh mục này?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    const handleDeleteBrand = (id: number) => {
        if (confirm('Xóa thương hiệu này?')) {
            setBrands(brands.filter(b => b.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Danh mục & Thương hiệu</h1>
                <p className="text-slate-500 text-sm">Quản lý các loại sản phẩm và hãng sản xuất</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Categories Management */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Tag className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Danh mục sản phẩm</h2>
                    </div>

                    {/* Add Category Form */}
                    <div className="flex gap-2 mb-6">
                        <input 
                            type="text" 
                            placeholder="Tên danh mục mới..." 
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        <button 
                            onClick={handleAddCategory}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Thêm
                        </button>
                    </div>

                    {/* Categories List */}
                    <div className="space-y-3">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-slate-700">{cat.name}</span>
                                    <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">{cat.count} SP</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCategory(cat.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brands Management */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Smartphone className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Thương hiệu</h2>
                    </div>

                    {/* Add Brand Form */}
                    <div className="flex gap-2 mb-6">
                        <input 
                            type="text" 
                            placeholder="Tên thương hiệu mới..." 
                            value={newBrand}
                            onChange={(e) => setNewBrand(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                        <button 
                            onClick={handleAddBrand}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Thêm
                        </button>
                    </div>

                    {/* Brands List */}
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                        {brands.map((brand) => (
                            <div key={brand.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-slate-700">{brand.name}</span>
                                    <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">{brand.count} SP</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteBrand(brand.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;