import { useState, useMemo, useCallback } from 'react';
import type { Product, ProductFormData, StockFilter } from '../types';
import { CATEGORIES, BRANDS, ITEMS_PER_PAGE } from '../types';
import { ProductService } from '../../../../services/productService';

// Initialize products from Local Storage via Service
// ProductService is now async, so we'll load in useEffect
import { useEffect } from 'react';

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
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await ProductService.getAll();
            setProducts(data);
        };
        loadProducts();
    }, []);

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [stockFilter, setStockFilter] = useState<StockFilter>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
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

    const handleDelete = useCallback(async (id: number | string) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            const newProducts = await ProductService.delete(id);
            setProducts(newProducts);
        }
    }, []);

    const handleSaveAdd = useCallback(async () => {
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
        const updatedProducts = await ProductService.add(newProduct);
        setProducts(updatedProducts);
        setShowAddModal(false);
        alert('Thêm sản phẩm thành công!');
    }, [formData]);

    const handleSaveEdit = useCallback(async () => {
        if (!selectedProduct) return;

        const updatedProduct: Product = {
            ...selectedProduct,
            name: formData.name || selectedProduct.name,
            sku: formData.sku || selectedProduct.sku,
            category: formData.category || selectedProduct.category,
            brand: formData.brand || selectedProduct.brand,
            price: formData.price || selectedProduct.price,
            originalPrice: formData.originalPrice,
            stock: formData.stock,
            inStock: formData.stock > 0,
            image: formData.image || selectedProduct.image,
            description: formData.description
        };

        const newProducts = await ProductService.update(updatedProduct);
        setProducts(newProducts);
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

    // Import from Excel
    // Import from Excel
    const handleImportProducts = useCallback(async (importedProducts: Partial<Product>[]) => {
        const newProductsToAdd: Product[] = importedProducts.map((p, index) => ({
            id: Date.now() + index,
            name: p.name || 'Sản phẩm không tên',
            sku: p.sku || `IMP-${String(Date.now() + index).slice(-6)}`,
            category: p.category || CATEGORIES[0],
            brand: p.brand || 'Generic',
            price: p.price || 0,
            originalPrice: p.originalPrice,
            discount: p.originalPrice && p.price
                ? Math.round((1 - p.price / p.originalPrice) * 100)
                : 0,
            sold: p.sold || 0,
            rating: p.rating || '5',
            inStock: (p.stock ?? 0) > 0,
            stock: p.stock || 0,
            image: p.image || 'https://via.placeholder.com/100',
            description: p.description || ''
        }));

        const updatedProducts = await ProductService.addBatch(newProductsToAdd);
        setProducts(updatedProducts);
        setShowImportModal(false);
        alert(`Import thành công ${newProductsToAdd.length} sản phẩm!`);
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
        showImportModal,

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
        handleImportProducts,
        setShowAddModal,
        setShowEditModal,
        setShowViewModal,
        setShowImportModal
    };
};
