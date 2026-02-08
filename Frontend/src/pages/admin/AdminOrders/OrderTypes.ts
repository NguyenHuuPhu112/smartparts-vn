export interface OrderItem {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customer: string;
    phone: string;
    address: string;
    email: string;
    date: string;
    employee: string;
    note: string;
    total: number;
    payment: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: number;
    productList: OrderItem[];
}

export interface PaginationResult {
    totalItems: number;
    totalPages: number;
    currentOrders: Order[];
    startIndex: number;
    endIndex: number;
}

export const ITEMS_PER_PAGE = 10;

// Default initial state for a new order form
export const initialOrderForm: Partial<Order> = {
    customer: '',
    email: '',
    payment: 'COD',
    total: 0,
    items: 1
};

export const MOCK_ORDERS: Order[] = Array.from({ length: 20 }, (_, i) => {
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const productList: OrderItem[] = Array.from({ length: itemCount }, (__, j) => ({
        id: j,
        name: ['Màn hình iPhone 13 Pro Max', 'Pin Pisen iPhone 11', 'Vỏ máy iPhone X', 'Kính cường lực Kingkong', 'Cáp sạc nhanh 20W', 'Tai nghe AirPods Pro'][Math.floor(Math.random() * 6)],
        image: `https://loremflickr.com/100/100/tech?lock=${i * 10 + j}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        price: [150000, 350000, 500000, 1200000, 85000].map(p => p)[Math.floor(Math.random() * 5)]
    }));

    const total = productList.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
        id: `#ORD-${1000 + i}`,
        customer: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'][Math.floor(Math.random() * 5)],
        phone: '09' + Math.floor(Math.random() * 100000000),
        address: ['123 Nguyễn Huệ, Q1, HCM', '456 Lê Lợi, Đà Nẵng', '789 Cầu Giấy, Hà Nội', '32 Đường 3/2, Cần Thơ'][Math.floor(Math.random() * 4)],
        email: `customer${i}@example.com`,
        date: `2023-10-${Math.floor(Math.random() * 30) + 1} 14:30`,
        employee: ['Không có', 'Nguyễn NV'][Math.floor(Math.random() * 2)],
        note: '',
        total: total,
        payment: Math.random() > 0.5 ? 'COD' : 'Momo',
        status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)] as Order['status'],
        items: itemCount,
        productList: productList
    };
});
