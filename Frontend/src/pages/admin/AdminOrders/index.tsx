import React from 'react';
import { Search, FileInput } from 'lucide-react';
import { useOrders } from './hooks/useOrders';
import { OrderTable, OrderDetailModal, OrderFormModal } from './components';

const AdminOrders: React.FC = () => {
    const {
        // State
        searchTerm,
        paginationResult,
        currentPage,
        isModalOpen,
        viewingOrder,
        editingOrder,
        formData,
        fileInputRef,

        // Setters
        setSearchTerm,
        setCurrentPage,
        setIsModalOpen,
        setViewingOrder,
        setEditingOrder,
        updateFormData,

        // Handlers
        handleAdd,
        handleEdit,
        handleView,
        handleDelete,
        handleSave,
        handlePrintInvoice,
        handleImportClick,
        handleFileChange
    } = useOrders();

    return (
        <div className="space-y-6 bg-[#F3F4F6] p-6 min-h-screen">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx, .xls"
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-[#D70018] uppercase">Đơn hàng</h1>
                    <p className="text-[#444444] text-sm font-medium">Quản lý và theo dõi đơn đặt hàng</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleImportClick}
                        className="bg-white border border-[#D70018] text-[#D70018] hover:bg-[#FEF2F2] px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                        <FileInput className="w-4 h-4" /> Nhập Excel
                    </button>
                    <button
                        onClick={handleAdd}
                        className="bg-[#D70018] hover:bg-[#C00015] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-100"
                    >
                        <Search className="w-4 h-4" /> Thêm đơn hàng
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo Mã đơn, Khách hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#D70018] focus:ring-2 focus:ring-red-50 outline-none transition-all text-[#444444] font-medium placeholder-gray-400 bg-[#F3F4F6]"
                    />
                </div>
            </div>

            {/* List */}
            <OrderTable
                paginationResult={paginationResult}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* View Modal */}
            {viewingOrder && (
                <OrderDetailModal
                    order={viewingOrder}
                    onClose={() => setViewingOrder(null)}
                    onEdit={() => {
                        setEditingOrder(viewingOrder);
                        setIsModalOpen(true);
                        setViewingOrder(null);
                    }}
                    onDelete={() => {
                        handleDelete(viewingOrder.id);
                        setViewingOrder(null);
                    }}
                    onPrintInvoice={handlePrintInvoice}
                />
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <OrderFormModal
                    isEditing={!!editingOrder}
                    formData={formData}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    // Wrap updateFormData to handle Partial<Order> correctly if necessary, 
                    // though hook exposes directly compatible signature.
                    onUpdateFormData={updateFormData}
                />
            )}
        </div>
    );
};

export default AdminOrders;
