import React from 'react';
import { useProducts } from './hooks/useProducts';
import {
    ProductHeader,
    ProductFilters,
    ProductTable,
    ProductFormModal,
    ProductViewModal
} from './components';

const AdminProducts: React.FC = () => {
    const {
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
        updateFormData,
        handleSearchChange,
        handleCategoryChange,
        handleStockFilterChange,
        setShowAddModal,
        setShowEditModal,
        setShowViewModal
    } = useProducts();

    return (
        <div className="space-y-6">
            {/* Header */}
            <ProductHeader
                totalProducts={products.length}
                onAdd={handleAdd}
            />

            {/* Filters & Search */}
            <ProductFilters
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                stockFilter={stockFilter}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                onStockFilterChange={handleStockFilterChange}
            />

            {/* Products Table */}
            <ProductTable
                products={displayedProducts}
                filteredCount={filteredProducts.length}
                currentPage={currentPage}
                totalPages={totalPages}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPageChange={setCurrentPage}
            />

            {/* Modals */}
            {showAddModal && (
                <ProductFormModal
                    isEdit={false}
                    formData={formData}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleSaveAdd}
                    onFormChange={updateFormData}
                />
            )}

            {showEditModal && (
                <ProductFormModal
                    isEdit={true}
                    formData={formData}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveEdit}
                    onFormChange={updateFormData}
                />
            )}

            {showViewModal && selectedProduct && (
                <ProductViewModal
                    product={selectedProduct}
                    onClose={() => setShowViewModal(false)}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

export default AdminProducts;
