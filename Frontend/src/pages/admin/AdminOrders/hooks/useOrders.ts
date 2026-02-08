import { useState, useMemo, useRef, useCallback } from 'react';
import { read, utils } from 'xlsx';
import type { Order, PaginationResult } from '../OrderTypes';
import { MOCK_ORDERS, ITEMS_PER_PAGE, initialOrderForm } from '../OrderTypes';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal & Selection State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [formData, setFormData] = useState<Partial<Order>>(initialOrderForm);

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Computed: Filtered Orders
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [orders, searchTerm]);

    // Computed: Pagination
    const paginationResult: PaginationResult = useMemo(() => {
        const totalItems = filteredOrders.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentOrders = filteredOrders.slice(startIndex, endIndex);

        return {
            totalItems,
            totalPages,
            currentOrders,
            startIndex,
            endIndex
        };
    }, [filteredOrders, currentPage]);

    // Effect: Reset page when search changes (handled via useMemo/useEffect logic usually, but here setter is fine)
    // In React 18, better to just set page to 1 when search changes via the handler or useEffect.
    // We'll use a simple approach: whenever searchTerm changes, we manually set currentPage(1) in the handler or useEffect.

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    // Actions
    const handleAdd = useCallback(() => {
        setEditingOrder(null);
        setFormData(initialOrderForm);
        setIsModalOpen(true);
    }, []);

    const handleEdit = useCallback((order: Order) => {
        setEditingOrder(order);
        setFormData({
            customer: order.customer,
            email: order.email,
            payment: order.payment,
            total: order.total,
            items: order.items
        });
        setIsModalOpen(true);
    }, []);

    const handleView = useCallback((order: Order) => {
        setViewingOrder(order);
    }, []);

    const handleDelete = useCallback((id: string) => {
        if (window.confirm(`Bạn có chắc muốn xóa đơn hàng ${id}?`)) {
            setOrders(prev => prev.filter(o => o.id !== id));
        }
    }, []);

    const handleSave = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (editingOrder) {
            // Update existing
            setOrders(prev => prev.map(o =>
                o.id === editingOrder.id
                    ? { ...o, ...formData } as Order
                    : o
            ));
        } else {
            // Create new
            const newOrder: Order = {
                id: `#ORD-${1000 + orders.length + 1}`, // Simple ID generation
                date: new Date().toISOString().split('T')[0],
                status: 'pending', // Default status (internal)
                phone: '',
                address: '',
                employee: 'Admin',
                note: '',
                productList: [],
                ...formData as any
            };
            setOrders(prev => [newOrder, ...prev]);
        }
        setIsModalOpen(false);
    }, [editingOrder, formData, orders.length]);

    const handlePrintInvoice = useCallback((orderId: string) => {
        window.alert(`In hóa đơn cho đơn hàng ${orderId}`);
    }, []);

    const handleImportClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = utils.sheet_to_json(ws);

            const newOrders = data.map((item: any, index: number) => ({
                id: `#ORD-${1000 + orders.length + index + 1}`,
                customer: item['Khách hàng'] || item['Customer'] || 'Khách lẻ',
                phone: item['SĐT'] || item['Phone'] || '',
                address: item['Địa chỉ'] || item['Address'] || '',
                email: item['Email'] || '',
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                employee: item['Nhân viên'] || 'Admin',
                note: item['Ghi chú'] || '',
                total: Number(item['Tổng tiền'] || item['Total'] || 0),
                payment: item['Thanh toán'] || 'COD',
                status: 'pending' as const,
                items: Number(item['Số lượng'] || 1),
                productList: []
            }));

            setOrders(prev => [...newOrders, ...prev]);
            alert(`Đã nhập thành công ${newOrders.length} đơn hàng!`);
        };
        reader.readAsBinaryString(file);

        // Reset input logic is handled by parent or by resetting ref value if possible, 
        // but here e.target.value = '' works if event persists.
        e.target.value = '';
    }, [orders.length]);

    const updateFormData = useCallback((data: Partial<Order>) => {
        setFormData(prev => ({ ...prev, ...data }));
    }, []);

    return {
        // State
        orders,
        searchTerm,
        paginationResult,
        currentPage,
        isModalOpen,
        viewingOrder,
        editingOrder,
        formData,
        fileInputRef,

        // Setters
        setSearchTerm: handleSearchChange, // Use wrapper to reset page
        setCurrentPage,
        setIsModalOpen,
        setViewingOrder,
        setEditingOrder,
        updateFormData, // Exposed for form

        // Handlers
        handleAdd,
        handleEdit,
        handleView,
        handleDelete,
        handleSave,
        handlePrintInvoice,
        handleImportClick,
        handleFileChange
    };
};
