import { useState, useMemo, useCallback } from 'react';
import type {
    Customer,
    CustomerFilterTier,
    CustomerFormData,
    CustomerStats
} from '../types';
import { MOCK_CUSTOMERS, ITEMS_PER_PAGE } from '../types';

const initialFormData: CustomerFormData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    tier: 'bronze',
    notes: ''
};

export const useCustomers = () => {
    // State
    const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [tierFilter, setTierFilter] = useState<CustomerFilterTier>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Form state
    const [formData, setFormData] = useState<CustomerFormData>(initialFormData);

    // Computed: Stats
    const stats: CustomerStats = useMemo(() => ({
        total: customers.length,
        active: customers.filter(c => c.status === 'active').length,
        inactive: customers.filter(c => c.status === 'inactive').length,
        blocked: customers.filter(c => c.status === 'blocked').length,
        totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
        avgSpent: Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)
    }), [customers]);

    // Computed: Filtered customers
    const filteredCustomers = useMemo(() => {
        return customers.filter(customer => {
            const matchesSearch =
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phone.includes(searchTerm);
            const matchesTier = tierFilter === 'all' || customer.tier === tierFilter;
            return matchesSearch && matchesTier;
        });
    }, [customers, searchTerm, tierFilter]);

    // Computed: Pagination
    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handlers
    const handleView = useCallback((customer: Customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    }, []);

    const handleEdit = useCallback((customer: Customer) => {
        setSelectedCustomer(customer);
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            status: customer.status,
            tier: customer.tier,
            notes: customer.notes || ''
        });
        setShowEditModal(true);
    }, []);

    const handleAdd = useCallback(() => {
        setFormData(initialFormData);
        setShowAddModal(true);
    }, []);

    const handleDelete = useCallback((id: number) => {
        if (window.confirm('Bạn có chắc muốn xóa khách hàng này?')) {
            setCustomers(prev => prev.filter(c => c.id !== id));
        }
    }, []);

    const handleSaveEdit = useCallback(() => {
        if (selectedCustomer) {
            setCustomers(prev => prev.map(c =>
                c.id === selectedCustomer.id
                    ? { ...c, ...formData }
                    : c
            ));
            setShowEditModal(false);
            setSelectedCustomer(null);
        }
    }, [selectedCustomer, formData]);

    const handleSaveAdd = useCallback(() => {
        const newCustomer: Customer = {
            id: Math.max(...customers.map(c => c.id)) + 1,
            ...formData,
            createdAt: new Date().toISOString().split('T')[0],
            totalOrders: 0,
            totalSpent: 0
        };
        setCustomers(prev => [...prev, newCustomer]);
        setShowAddModal(false);
    }, [customers, formData]);

    const importCustomers = useCallback((data: any[]) => {
        const newCustomers = data.map((item, index) => ({
            id: Math.max(...customers.map(c => c.id)) + 1 + index,
            name: item['Tên khách hàng'] || item['Name'] || 'Khách hàng mới',
            email: item['Email'] || '',
            phone: item['SĐT'] || item['Phone'] || '',
            address: item['Địa chỉ'] || item['Address'] || '',
            status: 'active' as const,
            tier: 'bronze' as const,
            createdAt: new Date().toISOString().split('T')[0],
            totalOrders: 0,
            totalSpent: 0,
            notes: item['Ghi chú'] || item['Notes'] || ''
        }));
        setCustomers(prev => [...prev, ...newCustomers]);
    }, [customers]);

    const closeViewModal = useCallback(() => {
        setShowViewModal(false);
        setSelectedCustomer(null);
    }, []);

    const closeEditModal = useCallback(() => {
        setShowEditModal(false);
        setSelectedCustomer(null);
    }, []);

    const closeAddModal = useCallback(() => {
        setShowAddModal(false);
    }, []);

    const updateFormField = useCallback(<K extends keyof CustomerFormData>(
        field: K,
        value: CustomerFormData[K]
    ) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    return {
        // State
        customers: paginatedCustomers,
        searchTerm,
        tierFilter,
        currentPage,
        totalPages,
        filteredCount: filteredCustomers.length,

        // Modal state
        showViewModal,
        showEditModal,
        showAddModal,
        selectedCustomer,
        formData,

        // Computed
        stats,

        // Setters
        setSearchTerm,
        setTierFilter,
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
    };
};
