// Customer Types
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar?: string;
    createdAt: string;
    totalOrders: number;
    totalSpent: number;
    status: CustomerStatus;
    lastOrder?: string;
    tier: CustomerTier;
    notes?: string;
}

export type CustomerStatus = 'active' | 'inactive' | 'blocked';
export type CustomerTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type CustomerFilterStatus = 'all' | CustomerStatus;
export type CustomerFilterTier = 'all' | CustomerTier;

export interface CustomerFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    status: CustomerStatus;
    tier: CustomerTier;
    notes: string;
}

export interface CustomerStats {
    total: number;
    active: number;
    inactive: number;
    blocked: number;
    totalRevenue: number;
    avgSpent: number;
}

// Constants
export const ITEMS_PER_PAGE = 10;

export const STATUS_LABELS: Record<CustomerStatus, string> = {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    blocked: 'Đã khóa'
};

export const STATUS_STYLES: Record<CustomerStatus, string> = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-yellow-100 text-yellow-700',
    blocked: 'bg-red-100 text-red-700'
};

export const TIER_LABELS: Record<CustomerTier, string> = {
    bronze: '🥉 Bronze',
    silver: '🥈 Silver',
    gold: '🥇 Gold',
    platinum: '💎 Platinum'
};

export const TIER_STYLES: Record<CustomerTier, string> = {
    bronze: 'bg-orange-100 text-orange-700 border-orange-200',
    silver: 'bg-slate-100 text-slate-700 border-slate-200',
    gold: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    platinum: 'bg-purple-100 text-purple-700 border-purple-200'
};

// Helper functions
export const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M₫`;
    }
    return `${(value / 1000).toFixed(0)}K₫`;
};

export const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('vi-VN');
};

// Mock Data
export const MOCK_CUSTOMERS: Customer[] = [
    {
        id: 1,
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@gmail.com',
        phone: '0901234567',
        address: '123 Nguyễn Huệ, Q.1, TP.HCM',
        createdAt: '2025-01-15',
        totalOrders: 25,
        totalSpent: 45500000,
        status: 'active',
        lastOrder: '2026-02-07',
        tier: 'gold',
        notes: 'Khách hàng VIP, ưu tiên giao hàng nhanh'
    },
    {
        id: 2,
        name: 'Trần Thị Bình',
        email: 'tranthbinh@gmail.com',
        phone: '0912345678',
        address: '456 Lê Lợi, Q.3, TP.HCM',
        createdAt: '2025-03-20',
        totalOrders: 12,
        totalSpent: 18200000,
        status: 'active',
        lastOrder: '2026-02-05',
        tier: 'silver'
    },
    {
        id: 3,
        name: 'Lê Hoàng Cường',
        email: 'lehoangcuong@gmail.com',
        phone: '0923456789',
        address: '789 Võ Văn Tần, Q.10, TP.HCM',
        createdAt: '2025-06-10',
        totalOrders: 45,
        totalSpent: 125000000,
        status: 'active',
        lastOrder: '2026-02-08',
        tier: 'platinum',
        notes: 'Đại lý cấp 1, chiết khấu 15%'
    },
    {
        id: 4,
        name: 'Phạm Minh Đức',
        email: 'phamminhduc@gmail.com',
        phone: '0934567890',
        address: '321 Hai Bà Trưng, Q.1, TP.HCM',
        createdAt: '2025-08-05',
        totalOrders: 5,
        totalSpent: 8500000,
        status: 'inactive',
        lastOrder: '2025-12-20',
        tier: 'bronze'
    },
    {
        id: 5,
        name: 'Hoàng Thị Em',
        email: 'hoangthiem@gmail.com',
        phone: '0945678901',
        address: '654 Điện Biên Phủ, Bình Thạnh, TP.HCM',
        createdAt: '2025-02-28',
        totalOrders: 18,
        totalSpent: 32000000,
        status: 'active',
        lastOrder: '2026-02-06',
        tier: 'gold'
    },
    {
        id: 6,
        name: 'Võ Văn Phát',
        email: 'vovanphat@gmail.com',
        phone: '0956789012',
        address: '987 CMT8, Q.Tân Bình, TP.HCM',
        createdAt: '2025-11-15',
        totalOrders: 2,
        totalSpent: 3200000,
        status: 'blocked',
        tier: 'bronze',
        notes: 'Đã hủy đơn nhiều lần, tạm khóa tài khoản'
    },
    {
        id: 7,
        name: 'Đặng Quốc Huy',
        email: 'dangquochuy@gmail.com',
        phone: '0967890123',
        address: '147 Trường Chinh, Q.Tân Phú, TP.HCM',
        createdAt: '2025-04-12',
        totalOrders: 8,
        totalSpent: 15600000,
        status: 'active',
        lastOrder: '2026-01-28',
        tier: 'silver'
    },
    {
        id: 8,
        name: 'Ngô Thanh Hà',
        email: 'ngothanhha@gmail.com',
        phone: '0978901234',
        address: '258 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
        createdAt: '2025-07-22',
        totalOrders: 15,
        totalSpent: 28900000,
        status: 'active',
        lastOrder: '2026-02-03',
        tier: 'silver'
    },
];
