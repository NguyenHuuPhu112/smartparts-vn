import { useState, useMemo, useCallback } from 'react';
import type { Product, ProductFormData, StockFilter } from '../types';
import { CATEGORIES, BRANDS, ITEMS_PER_PAGE } from '../types';
import {
    phonePartsProducts,
    ipadPartsProducts,
    glassSuppliesProducts,
    toolsEquipmentProducts,
    accessoriesProducts
} from '../../../../data/mockData';

// Initialize products from mock data
const initializeProducts = (): Product[] => {
    const allProducts = [
        ...phonePartsProducts,
        ...ipadPartsProducts,
        ...glassSuppliesProducts,
        ...toolsEquipmentProducts,
        ...accessoriesProducts
    ];

    return allProducts.map((p, i) => ({
        ...p,
        sku: p.sku || `SKU-${String(i + 1).padStart(5, '0')}`,
        stock: Math.floor(p.sold * 1.5) + 10,
        description: p.description || `Mô tả sản phẩm ${p.name}`
    }));
};

const getEmptyFormData = (productCount: number): ProductFormData => ({
    name: '',
    sku: `SKU-${String(productCount + 1).padStart(5, '0')}`,
    category: CATEGORIES[0],
    brand: BRANDS[0],
    price: 0,
    originalPrice: 0,
    stock: 0,
    inStock: true,
    image: '',
    description: ''
});

export const useProducts = () => {
    // Data state
    const [products, setProducts] = useState<Product[]>(initializeProducts);

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [stockFilter, setStockFilter] = useState<StockFilter>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Form state
    const [formData, setFormData] = useState<ProductFormData>(getEmptyFormData(products.length));

    // Filtered products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesStock =
                stockFilter === 'all' ||
                (stockFilter === 'inStock' && product.inStock) ||
                (stockFilter === 'outOfStock' && !product.inStock);
            return matchesSearch && matchesCategory && matchesStock;
        });
    }, [products, searchTerm, selectedCategory, stockFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const displayedProducts = useMemo(() => {
        return filteredProducts.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    // CRUD Handlers
    const handleAdd = useCallback(() => {
        setFormData(getEmptyFormData(products.length));
        setShowAddModal(true);
    }, [products.length]);

    const handleEdit = useCallback((product: Product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            sku: product.sku || '',
            category: product.category,
            brand: product.brand || '',
            price: product.price,
            originalPrice: product.originalPrice || 0,
            stock: product.stock || 0,
            inStock: product.inStock,
            image: product.image,
            description: product.description || ''
        });
        setShowEditModal(true);
    }, []);

    const handleView = useCallback((product: Product) => {
        setSelectedProduct(product);
        setShowViewModal(true);
    }, []);

    const handleDelete = useCallback((id: number | string) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    }, []);

    const handleSaveAdd = useCallback(() => {
        const newProduct: Product = {
            id: Date.now(),
            name: formData.name,
            sku: formData.sku,
            category: formData.category,
            brand: formData.brand,
            price: formData.price,
            originalPrice: formData.originalPrice,
            discount: formData.originalPrice && formData.price
                ? Math.round((1 - formData.price / formData.originalPrice) * 100)
                : 0,
            sold: 0,
            rating: 5,
            inStock: formData.stock > 0,
            stock: formData.stock,
            image: formData.image || 'https://via.placeholder.com/100',
            description: formData.description
        };
        setProducts(prev => [newProduct, ...prev]);
        setShowAddModal(false);
        alert('Thêm sản phẩm thành công!');
    }, [formData]);

    const handleSaveEdit = useCallback(() => {
        if (!selectedProduct) return;
        setProducts(prev => prev.map(p => {
            if (p.id === selectedProduct.id) {
                return {
                    ...p,
                    name: formData.name || p.name,
                    sku: formData.sku,
                    category: formData.category || p.category,
                    brand: formData.brand || p.brand,
                    price: formData.price || p.price,
                    originalPrice: formData.originalPrice,
                    stock: formData.stock,
                    inStock: formData.stock > 0,
                    image: formData.image || p.image,
                    description: formData.description
                };
            }
            return p;
        }));
        setShowEditModal(false);
        alert('Cập nhật sản phẩm thành công!');
    }, [formData, selectedProduct]);

    const closeModals = useCallback(() => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowViewModal(false);
        setSelectedProduct(null);
    }, []);

    const updateFormData = useCallback((updates: Partial<ProductFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    }, []);

    const handleCategoryChange = useCallback((value: string) => {
        setSelectedCategory(value);
        setCurrentPage(1);
    }, []);

    const handleStockFilterChange = useCallback((value: StockFilter) => {
        setStockFilter(value);
        setCurrentPage(1);
    }, []);

    return {
        // Data
        products,
        filteredProducts,
        displayedProducts,
        selectedProduct,
        formData,

        // Filters
        searchTerm,
        selectedCategory,
        stockFilter,

        // Pagination
        currentPage,
        totalPages,
        setCurrentPage,

        // Modal states
        showAddModal,
        showEditModal,
        showViewModal,

        // Handlers
        handleAdd,
        handleEdit,
        handleView,
        handleDelete,
        handleSaveAdd,
        handleSaveEdit,
        closeModals,
        updateFormData,
        handleSearchChange,
        handleCategoryChange,
        handleStockFilterChange,
        setShowAddModal,
        setShowEditModal,
        setShowViewModal
    };
};
