import React from 'react';
import { useCustomers } from './hooks/useCustomers';
import {
    CustomerTable,
    CustomerViewModal,
    CustomerFormModal
} from './components';
import { Search, Plus, FileInput, FileOutput, Trash2 } from 'lucide-react';

import { read, utils } from 'xlsx';

const AdminCustomers: React.FC = () => {
    const {
        // State
        customers,
        searchTerm,
        currentPage,
        totalPages,


        // Modal state
        showViewModal,
        showEditModal,
        showAddModal,
        selectedCustomer,
        formData,

        // Setters
        setSearchTerm,
        setCurrentPage,
        updateFormField,

        // Handlers
        handleView,
        handleEdit,
        handleAdd,
        handleDelete,
        handleSaveEdit,
        handleSaveAdd,
        importCustomers,
        closeViewModal,
        closeEditModal,
        closeAddModal
    } = useCustomers();

    // File input ref
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = utils.sheet_to_json(ws);

            importCustomers(data);
            alert(`Đã nhập thành công ${data.length} khách hàng!`);
        };
        reader.readAsBinaryString(file);

        // Reset input
        e.target.value = '';
    };

    const handleExport = () => alert('Chức năng Xuất Excel đang phát triển');
    const handleBulkDelete = () => alert('Chức năng Xóa nhiều đang phát triển');

    return (
        <div className="space-y-4 bg-slate-50 p-6 min-h-screen">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx, .xls"
            />

            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Tìm theo tên, sđt, mã số thuế, căn cước..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                    />
                    <button className="absolute right-0 top-0 h-full px-3 bg-green-600 text-white rounded-r hover:bg-green-700 transition-colors">
                        <Search className="w-4 h-4" />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Thêm
                    </button>
                    <button
                        onClick={handleImportClick}
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                    >
                        <FileInput className="w-4 h-4" /> Nhập Từ Excel
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                    >
                        <FileOutput className="w-4 h-4" /> Xuất Excel
                    </button>
                    <button
                        onClick={handleBulkDelete}
                        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" /> Xóa
                    </button>
                </div>
            </div>

            {/* Pagination Top */}
            <div className="flex justify-end bg-white px-4 py-2 border-b border-slate-200 rounded-t-lg">
                <div className="flex gap-1 items-center">
                    <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-50 text-xs"
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors ${currentPage === i + 1
                                ? 'bg-green-600 text-white'
                                : 'text-green-600 hover:bg-green-50'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-50 text-xs"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="-mt-4 bg-white rounded-b-lg shadow-sm overflow-hidden">
                <CustomerTable
                    customers={customers}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {/* View Modal */}
            {showViewModal && selectedCustomer && (
                <CustomerViewModal
                    customer={selectedCustomer}
                    onClose={closeViewModal}
                    onEdit={handleEdit}
                />
            )}

            {/* Add Modal */}
            {showAddModal && (
                <CustomerFormModal
                    isAdd={true}
                    formData={formData}
                    onClose={closeAddModal}
                    onSave={handleSaveAdd}
                    onFieldChange={updateFormField}
                />
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <CustomerFormModal
                    isAdd={false}
                    formData={formData}
                    onClose={closeEditModal}
                    onSave={handleSaveEdit}
                    onFieldChange={updateFormField}
                />
            )}
        </div>
    );
};

export default AdminCustomers;
