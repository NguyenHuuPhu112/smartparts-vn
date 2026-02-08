import type { Product, Category, NewsArticle, Specification } from '../types';

// ============================================
// CATEGORIES DATA
// ============================================
export const categories: Category[] = [
    {
        id: 'phone-parts',
        name: 'Linh kiện điện thoại',
        slug: 'phone-parts',
        icon: '📱',
        color: 'from-brand-500 to-brand-600',
        description: 'Màn hình, pin, camera, bo mạch...',
        productCount: 156
    },
    {
        id: 'ipad-parts',
        name: 'Linh kiện iPad',
        slug: 'ipad-parts',
        icon: '📱',
        color: 'from-purple-500 to-purple-600',
        description: 'Phụ kiện iPad chính hãng',
        productCount: 78
    },
    {
        id: 'glass-supplies',
        name: 'Vật tư ép kính',
        slug: 'glass-supplies',
        icon: '🔧',
        color: 'from-green-500 to-green-600',
        description: 'Kính cường lực, OCA, keo...',
        productCount: 234
    },
    {
        id: 'tools-equipment',
        name: 'Dụng cụ thiết bị',
        slug: 'tools-equipment',
        icon: '🛠️',
        color: 'from-orange-500 to-orange-600',
        description: 'Máy ép kính, tua vít, dụng cụ...',
        productCount: 89
    },
    {
        id: 'accessories',
        name: 'Phụ kiện',
        slug: 'accessories',
        icon: '🎧',
        color: 'from-blue-500 to-blue-600',
        description: 'Tai nghe, cáp sạc, ốp lưng...',
        productCount: 345
    },
    {
        id: 'sale',
        name: 'Hàng bán rẻ',
        slug: 'sale',
        icon: '🔥',
        color: 'from-red-500 to-red-600',
        description: 'Giảm giá sốc, thanh lý',
        productCount: 67
    }
];

// ============================================
// PHONE PARTS PRODUCTS
// ============================================
export const phonePartsProducts: Product[] = [
    {
        id: 1,
        name: 'Màn hình iPhone 15 Pro Max OLED zin bóc máy',
        slug: 'man-hinh-iphone-15-pro-max',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 12500000,
        originalPrice: 15000000,
        discount: 17,
        sold: 342,
        rating: 4.9,
        reviews: 89,
        image: 'https://loremflickr.com/400/400/iphone,screen?lock=1',
        images: [
            'https://picsum.photos/seed/iphone15pro1/800/800',
            'https://picsum.photos/seed/iphone15pro2/800/800',
            'https://picsum.photos/seed/iphone15pro3/800/800',
        ],
        inStock: true,
        isFeatured: true,
        isNew: true,
        brand: 'Apple',
        sku: 'MH-IP15PM-OLED',
        warranty: '12 tháng',
        description: 'Màn hình iPhone 15 Pro Max OLED chính hãng Apple, zin bóc máy. Độ sáng cao, màu sắc chân thực, True Tone chuẩn. Bảo hành 12 tháng, đổi mới trong 7 ngày.',
        specifications: [
            { label: 'Loại màn hình', value: 'OLED Super Retina XDR' },
            { label: 'Kích thước', value: '6.7 inch' },
            { label: 'Độ phân giải', value: '2796 x 1290 pixels' },
            { label: 'Tần số quét', value: '120Hz ProMotion' },
        ]
    },
    {
        id: 2,
        name: 'Pin iPhone 14 Plus dung lượng cao chính hãng',
        slug: 'pin-iphone-14-plus',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 850000,
        originalPrice: 1200000,
        discount: 29,
        sold: 528,
        rating: 4.8,
        reviews: 156,
        image: 'https://loremflickr.com/400/400/battery,technology?lock=2',
        images: ['https://picsum.photos/seed/battery14-1/800/800'],
        inStock: true,
        isHot: true,
        brand: 'Apple',
        sku: 'PIN-IP14PLUS',
        warranty: '12 tháng',
        description: 'Pin iPhone 14 Plus dung lượng cao, chính hãng Apple. Chu kỳ sạc bền bỉ, an toàn tuyệt đối.',
        specifications: [
            { label: 'Dung lượng', value: '4325 mAh' },
            { label: 'Điện áp', value: '3.87V' },
            { label: 'Tương thích', value: 'iPhone 14 Plus' },
        ]
    },
    {
        id: 3,
        name: 'Camera sau iPhone 13 Pro zin bóc máy',
        slug: 'camera-sau-iphone-13-pro',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 2800000,
        originalPrice: 3500000,
        discount: 20,
        sold: 156,
        rating: 4.7,
        reviews: 45,
        image: 'https://loremflickr.com/400/400/camera,lens?lock=3',
        inStock: true,
        brand: 'Apple',
        sku: 'CAM-IP13PRO-REAR',
        warranty: '6 tháng'
    },
    {
        id: 4,
        name: 'Loa trong iPhone 12 Pro Max chính hãng Apple',
        slug: 'loa-trong-iphone-12-pro-max',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 450000,
        originalPrice: 650000,
        discount: 31,
        sold: 289,
        rating: 4.6,
        image: 'https://loremflickr.com/400/400/speaker,audio?lock=4',
        inStock: true,
        brand: 'Apple',
        sku: 'LOA-IP12PM',
        warranty: '6 tháng'
    },
    {
        id: 5,
        name: 'Bo mạch iPhone 11 64GB quốc tế zin 100%',
        slug: 'bo-mach-iphone-11-64gb',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 4500000,
        originalPrice: 5500000,
        discount: 18,
        sold: 45,
        rating: 4.8,
        image: 'https://picsum.photos/seed/board11/400/400',
        inStock: false,
        brand: 'Apple',
        sku: 'BOARD-IP11-64GB',
        warranty: '3 tháng'
    },
    {
        id: 6,
        name: 'Tai nghe iPhone 13 chính hãng Apple',
        slug: 'tai-nghe-iphone-13',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 320000,
        originalPrice: 450000,
        discount: 29,
        sold: 891,
        rating: 4.9,
        image: 'https://picsum.photos/seed/earphone13/400/400',
        inStock: true,
        isHot: true,
        brand: 'Apple',
        sku: 'EAR-IP13',
        warranty: '6 tháng'
    },
    {
        id: 7,
        name: 'Flex sạc iPhone 12 Pro zin theo máy',
        slug: 'flex-sac-iphone-12-pro',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 180000,
        originalPrice: 250000,
        discount: 28,
        sold: 234,
        rating: 4.5,
        image: 'https://picsum.photos/seed/flex12/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'FLEX-IP12PRO',
        warranty: '3 tháng'
    },
    {
        id: 8,
        name: 'Mặt kính iPhone 14 Pro Max Ceramic Shield',
        slug: 'mat-kinh-iphone-14-pro-max',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 980000,
        originalPrice: 1300000,
        discount: 25,
        sold: 167,
        rating: 4.7,
        image: 'https://picsum.photos/seed/glass14pm/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'GLASS-IP14PM',
        warranty: '6 tháng'
    },
    {
        id: 9,
        name: 'Khay sim iPhone 13 Mini các màu',
        slug: 'khay-sim-iphone-13-mini',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 85000,
        originalPrice: 120000,
        discount: 29,
        sold: 423,
        rating: 4.6,
        image: 'https://picsum.photos/seed/simtray13/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'SIMTRAY-IP13MINI'
    },
    {
        id: 10,
        name: 'Nút nguồn iPhone 11 Pro Max zin',
        slug: 'nut-nguon-iphone-11-pro-max',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 95000,
        originalPrice: 150000,
        discount: 37,
        sold: 312,
        rating: 4.5,
        image: 'https://picsum.photos/seed/powerbutton11/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'PWR-IP11PM'
    },
    {
        id: 11,
        name: 'Mic iPhone 12 chính hãng Apple',
        slug: 'mic-iphone-12',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 120000,
        originalPrice: 180000,
        discount: 33,
        sold: 198,
        rating: 4.6,
        image: 'https://picsum.photos/seed/mic12/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'MIC-IP12'
    },
    {
        id: 12,
        name: 'Sườn iPhone 13 Pro màu Xanh dương',
        slug: 'suon-iphone-13-pro-xanh',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 650000,
        originalPrice: 850000,
        discount: 24,
        sold: 67,
        rating: 4.7,
        image: 'https://picsum.photos/seed/frame13/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'FRAME-IP13PRO-BLUE'
    },
    {
        id: 101,
        name: 'Màn hình Samsung Galaxy S23 Ultra zin hãng',
        slug: 'man-hinh-samsung-s23-ultra',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 4500000,
        originalPrice: 5200000,
        discount: 13,
        sold: 120,
        rating: 4.8,
        image: 'https://picsum.photos/seed/samsungs23/400/400',
        inStock: true,
        brand: 'Samsung',
        sku: 'MH-S23U'
    },
    {
        id: 102,
        name: 'Pin Xiaomi Redmi Note 12 Pro 5000mAh',
        slug: 'pin-xiaomi-redmi-note-12-pro',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 350000,
        originalPrice: 450000,
        discount: 22,
        sold: 340,
        rating: 4.6,
        image: 'https://picsum.photos/seed/xiaomibat/400/400',
        inStock: true,
        brand: 'Xiaomi',
        sku: 'PIN-RN12PRO'
    },
    {
        id: 103,
        name: 'Màn hình Oppo Reno 8 Pro OLED zin',
        slug: 'man-hinh-oppo-reno-8-pro',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 1800000,
        originalPrice: 2200000,
        discount: 18,
        sold: 85,
        rating: 4.7,
        image: 'https://picsum.photos/seed/opporeno8/400/400',
        inStock: true,
        brand: 'Oppo',
        sku: 'MH-RENO8PRO'
    },
    {
        id: 104,
        name: 'Cụm chân sạc Samsung Galaxy A54 5G',
        slug: 'chan-sac-samsung-a54',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 150000,
        originalPrice: 250000,
        discount: 40,
        sold: 450,
        rating: 4.5,
        image: 'https://picsum.photos/seed/samsungcharge/400/400',
        inStock: true,
        brand: 'Samsung',
        sku: 'PORT-A54'
    },
    {
        id: 105,
        name: 'Kính lưng Xiaomi 13 Pro zin new',
        slug: 'kinh-lung-xiaomi-13-pro',
        category: 'Linh kiện điện thoại',
        categoryId: 'phone-parts',
        price: 250000,
        originalPrice: 350000,
        discount: 28,
        sold: 112,
        rating: 4.8,
        image: 'https://picsum.photos/seed/xiaomiglass/400/400',
        inStock: true,
        brand: 'Xiaomi',
        sku: 'GLASS-MI13PRO'
    }
];

// ============================================
// IPAD PARTS PRODUCTS
// ============================================
export const ipadPartsProducts: Product[] = [
    {
        id: 13,
        name: 'Màn hình iPad Pro 12.9 inch (2021) zin bóc máy',
        slug: 'man-hinh-ipad-pro-129-2021',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 18500000,
        originalPrice: 22000000,
        discount: 16,
        sold: 78,
        rating: 4.9,
        image: 'https://loremflickr.com/400/400/ipad,screen?lock=13',
        inStock: true,
        isFeatured: true,
        brand: 'Apple',
        sku: 'MH-IPADPRO129-21'
    },
    {
        id: 14,
        name: 'Pin iPad Air 4 dung lượng chuẩn Apple',
        slug: 'pin-ipad-air-4',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 1250000,
        originalPrice: 1600000,
        discount: 22,
        sold: 145,
        rating: 4.8,
        image: 'https://picsum.photos/seed/ipadair4bat/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'PIN-IPADAIR4'
    },
    {
        id: 15,
        name: 'Mặt kính cảm ứng iPad 10.2 inch Gen 9',
        slug: 'mat-kinh-ipad-102-gen9',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 890000,
        originalPrice: 1200000,
        discount: 26,
        sold: 234,
        rating: 4.7,
        image: 'https://picsum.photos/seed/ipad102/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'GLASS-IPAD102-G9'
    },
    {
        id: 16,
        name: 'Bo mạch iPad Mini 6 64GB WiFi zin 100%',
        slug: 'bo-mach-ipad-mini-6',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 6800000,
        originalPrice: 8500000,
        discount: 20,
        sold: 23,
        rating: 4.9,
        image: 'https://picsum.photos/seed/ipadmini6/400/400',
        inStock: false,
        brand: 'Apple',
        sku: 'BOARD-IPADMINI6'
    },
    {
        id: 17,
        name: 'Flex sạc iPad Pro 11 inch M1 chính hãng',
        slug: 'flex-sac-ipad-pro-11-m1',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 450000,
        originalPrice: 650000,
        discount: 31,
        sold: 89,
        rating: 4.6,
        image: 'https://picsum.photos/seed/ipadpro11flex/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'FLEX-IPADPRO11M1'
    },
    {
        id: 18,
        name: 'Loa ngoài iPad Air 5 (2022) Apple',
        slug: 'loa-ngoai-ipad-air-5',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 580000,
        originalPrice: 750000,
        discount: 23,
        sold: 67,
        rating: 4.7,
        image: 'https://picsum.photos/seed/ipadair5spk/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'SPK-IPADAIR5'
    },
    {
        id: 19,
        name: 'Camera sau iPad Pro 12.9 inch M2',
        slug: 'camera-sau-ipad-pro-129-m2',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 3200000,
        originalPrice: 4100000,
        discount: 22,
        sold: 34,
        rating: 4.8,
        image: 'https://picsum.photos/seed/ipadprom2cam/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'CAM-IPADPRO129M2'
    },
    {
        id: 20,
        name: 'Nút nguồn iPad 10.9 inch Gen 10',
        slug: 'nut-nguon-ipad-109-gen10',
        category: 'Linh kiện iPad',
        categoryId: 'ipad-parts',
        price: 180000,
        originalPrice: 250000,
        discount: 28,
        sold: 156,
        rating: 4.5,
        image: 'https://picsum.photos/seed/ipad109pwr/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'PWR-IPAD109G10'
    }
];

// ============================================
// GLASS SUPPLIES PRODUCTS
// ============================================
export const glassSuppliesProducts: Product[] = [
    {
        id: 21,
        name: 'Kính cường lực iPhone 15 Pro Max full màn hình',
        slug: 'kinh-cuong-luc-iphone-15-pro-max',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 85000,
        originalPrice: 150000,
        discount: 43,
        sold: 1245,
        rating: 4.8,
        image: 'https://loremflickr.com/400/400/glass,texture?lock=21',
        inStock: true,
        isHot: true,
        brand: 'Nillkin',
        sku: 'GLASS-IP15PM-FULL'
    },
    {
        id: 22,
        name: 'OCA iPhone 14 Pro chính hãng Mitsubishi',
        slug: 'oca-iphone-14-pro',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 120000,
        originalPrice: 180000,
        discount: 33,
        sold: 890,
        rating: 4.9,
        image: 'https://picsum.photos/seed/oca14pro/400/400',
        inStock: true,
        brand: 'Mitsubishi',
        sku: 'OCA-IP14PRO'
    },
    {
        id: 23,
        name: 'Keo T7000 đen 110ml chuyên dụng điện thoại',
        slug: 'keo-t7000-den-110ml',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 45000,
        originalPrice: 70000,
        discount: 36,
        sold: 2134,
        rating: 4.7,
        image: 'https://picsum.photos/seed/t7000/400/400',
        inStock: true,
        isHot: true,
        brand: 'T7000',
        sku: 'T7000-110ML'
    },
    {
        id: 24,
        name: 'Băng dính 2 mặt chuyên dụng 3M cho màn hình',
        slug: 'bang-dinh-2-mat-3m',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 35000,
        originalPrice: 55000,
        discount: 36,
        sold: 1567,
        rating: 4.6,
        image: 'https://picsum.photos/seed/3mtape/400/400',
        inStock: true,
        brand: '3M',
        sku: '3M-TAPE-2SIDE'
    },
    {
        id: 25,
        name: 'Kính cường lực iPad Pro 12.9 inch',
        slug: 'kinh-cuong-luc-ipad-pro-129',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 150000,
        originalPrice: 250000,
        discount: 40,
        sold: 456,
        rating: 4.8,
        image: 'https://picsum.photos/seed/glassipad129/400/400',
        inStock: true,
        brand: 'Baseus',
        sku: 'GLASS-IPADPRO129'
    },
    {
        id: 26,
        name: 'Frame ép kính iPhone 12 Pro Max nhôm CNC',
        slug: 'frame-ep-kinh-iphone-12-pro-max',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 280000,
        originalPrice: 400000,
        discount: 30,
        sold: 234,
        rating: 4.7,
        image: 'https://picsum.photos/seed/frame12pm/400/400',
        inStock: true,
        brand: 'Generic',
        sku: 'FRAME-IP12PM'
    },
    {
        id: 27,
        name: 'Dung dịch tẩy keo UV 500ml chuyên nghiệp',
        slug: 'dung-dich-tay-keo-uv',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 65000,
        originalPrice: 95000,
        discount: 32,
        sold: 789,
        rating: 4.6,
        image: 'https://picsum.photos/seed/uvremover/400/400',
        inStock: true,
        brand: 'Generic',
        sku: 'UV-REMOVER-500ML'
    },
    {
        id: 28,
        name: 'Kính cường lực Samsung S23 Ultra full keo UV',
        slug: 'kinh-cuong-luc-samsung-s23-ultra',
        category: 'Vật tư ép kính',
        categoryId: 'glass-supplies',
        price: 95000,
        originalPrice: 150000,
        discount: 37,
        sold: 678,
        rating: 4.8,
        image: 'https://picsum.photos/seed/glasss23/400/400',
        inStock: true,
        brand: 'Nillkin',
        sku: 'GLASS-S23U-UV'
    }
];

// ============================================
// TOOLS & EQUIPMENT PRODUCTS
// ============================================
export const toolsEquipmentProducts: Product[] = [
    {
        id: 29,
        name: 'Máy ép kính chân không tự động Sunshine SS-890C',
        slug: 'may-ep-kinh-sunshine-ss890c',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 12500000,
        originalPrice: 15000000,
        discount: 17,
        sold: 45,
        rating: 4.9,
        image: 'https://loremflickr.com/400/400/machine,industrial?lock=29',
        inStock: true,
        isFeatured: true,
        brand: 'Sunshine',
        sku: 'MACHINE-SS890C'
    },
    {
        id: 30,
        name: 'Bộ tua vít sửa điện thoại 120 món Jackly',
        slug: 'bo-tua-vit-120-mon-jackly',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 450000,
        originalPrice: 650000,
        discount: 31,
        sold: 567,
        rating: 4.8,
        image: 'https://loremflickr.com/400/400/tools,repair?lock=30',
        inStock: true,
        isHot: true,
        brand: 'Jackly',
        sku: 'SCREWSET-JACKLY120'
    },
    {
        id: 31,
        name: 'Đèn UV soi keo 9W chuyên dụng ép kính',
        slug: 'den-uv-soi-keo-9w',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 180000,
        originalPrice: 280000,
        discount: 36,
        sold: 890,
        rating: 4.7,
        image: 'https://loremflickr.com/400/400/light,uv?lock=31',
        inStock: true,
        brand: 'Generic',
        sku: 'UV-LAMP-9W'
    },
    {
        id: 32,
        name: 'Máy khoan mini mài tay cầm 30000 vòng/phút',
        slug: 'may-khoan-mini-30000rpm',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 580000,
        originalPrice: 850000,
        discount: 32,
        sold: 234,
        rating: 4.6,
        image: 'https://picsum.photos/seed/drill30k/400/400',
        inStock: true,
        brand: 'Generic',
        sku: 'DRILL-MINI-30K'
    },
    {
        id: 33,
        name: 'Bàn soi kính chuyên nghiệp có đèn LED',
        slug: 'ban-soi-kinh-chuyen-nghiep',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 3200000,
        originalPrice: 4500000,
        discount: 29,
        sold: 67,
        rating: 4.8,
        image: 'https://picsum.photos/seed/ledtable/400/400',
        inStock: true,
        brand: 'Generic',
        sku: 'TABLE-LED-PRO'
    },
    {
        id: 34,
        name: 'Máy hàn thiếc Hakko FX-888D 70W',
        slug: 'may-han-thiec-hakko-fx888d',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 1850000,
        originalPrice: 2500000,
        discount: 26,
        sold: 123,
        rating: 4.9,
        image: 'https://picsum.photos/seed/hakko888/400/400',
        inStock: false,
        brand: 'Hakko',
        sku: 'SOLDER-HAKKO-FX888D'
    },
    {
        id: 35,
        name: 'Kìm mở màn hình điện thoại chuyên dụng',
        slug: 'kim-mo-man-hinh',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 85000,
        originalPrice: 150000,
        discount: 43,
        sold: 1234,
        rating: 4.5,
        image: 'https://loremflickr.com/400/400/pliers,tools?lock=35',
        inStock: true,
        isHot: true,
        brand: 'Generic',
        sku: 'PLIER-SCREEN'
    },
    {
        id: 36,
        name: 'Máy thổi hơi nóng Quick 861DW 1000W',
        slug: 'may-thoi-hoi-nong-quick-861dw',
        category: 'Dụng cụ thiết bị',
        categoryId: 'tools-equipment',
        price: 2200000,
        originalPrice: 3000000,
        discount: 27,
        sold: 89,
        rating: 4.8,
        image: 'https://picsum.photos/seed/quick861/400/400',
        inStock: true,
        brand: 'Quick',
        sku: 'HEATGUN-QUICK861DW'
    }
];

// ============================================
// ACCESSORIES PRODUCTS
// ============================================
export const accessoriesProducts: Product[] = [
    {
        id: 49,
        name: 'Cáp sạc iPhone Lightning MFI chính hãng Apple 1m',
        slug: 'cap-sac-iphone-lightning-1m',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 350000,
        originalPrice: 550000,
        discount: 36,
        sold: 2345,
        rating: 4.9,
        image: 'https://picsum.photos/seed/lightning1m/400/400',
        inStock: true,
        isHot: true,
        brand: 'Apple',
        sku: 'CABLE-LIGHTNING-1M'
    },
    {
        id: 50,
        name: 'Củ sạc iPhone 20W USB-C Power Adapter',
        slug: 'cu-sac-iphone-20w-usbc',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 420000,
        originalPrice: 650000,
        discount: 35,
        sold: 1890,
        rating: 4.8,
        image: 'https://picsum.photos/seed/adapter20w/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'ADAPTER-20W-USBC'
    },
    {
        id: 51,
        name: 'Ốp lưng iPhone 15 Pro Max Silicone chính hãng Apple',
        slug: 'op-lung-iphone-15-pro-max-silicone',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 680000,
        originalPrice: 950000,
        discount: 28,
        sold: 567,
        rating: 4.9,
        image: 'https://picsum.photos/seed/case15pm/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'CASE-IP15PM-SILICONE'
    },
    {
        id: 52,
        name: 'Tai nghe AirPods Pro 2023 chip H2 chính hãng',
        slug: 'airpods-pro-2023-h2',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 5800000,
        originalPrice: 7500000,
        discount: 23,
        sold: 234,
        rating: 4.9,
        image: 'https://picsum.photos/seed/airpodspro2023/400/400',
        inStock: true,
        isFeatured: true,
        brand: 'Apple',
        sku: 'AIRPODS-PRO-2023'
    },
    {
        id: 53,
        name: 'Dán PPF iPhone 14 Pro Max full body cao cấp',
        slug: 'dan-ppf-iphone-14-pro-max',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 380000,
        originalPrice: 600000,
        discount: 37,
        sold: 890,
        rating: 4.7,
        image: 'https://picsum.photos/seed/ppf14pm/400/400',
        inStock: true,
        brand: 'Generic',
        sku: 'PPF-IP14PM-FULL'
    },
    {
        id: 54,
        name: 'Pin dự phòng Anker 20000mAh sạc nhanh PD 30W',
        slug: 'pin-du-phong-anker-20000mah',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 980000,
        originalPrice: 1350000,
        discount: 27,
        sold: 456,
        rating: 4.8,
        image: 'https://picsum.photos/seed/anker20k/400/400',
        inStock: false,
        brand: 'Anker',
        sku: 'POWERBANK-ANKER-20K'
    },
    {
        id: 55,
        name: 'Giá đỡ điện thoại ô tô hút chân không Baseus',
        slug: 'gia-do-dien-thoai-oto-baseus',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 180000,
        originalPrice: 320000,
        discount: 44,
        sold: 1234,
        rating: 4.6,
        image: 'https://picsum.photos/seed/carholder/400/400',
        inStock: true,
        brand: 'Baseus',
        sku: 'CARHOLDER-BASEUS'
    },
    {
        id: 56,
        name: 'Miếng dán camera iPhone 13 Pro Max sapphire',
        slug: 'dan-camera-iphone-13-pro-max',
        category: 'Phụ kiện',
        categoryId: 'accessories',
        price: 120000,
        originalPrice: 200000,
        discount: 40,
        sold: 2890,
        rating: 4.7,
        image: 'https://picsum.photos/seed/camlens13pm/400/400',
        inStock: true,
        isHot: true,
        brand: 'Generic',
        sku: 'CAMLENS-IP13PM'
    }
];

// ============================================
// SALE PRODUCTS
// ============================================
export const saleProducts: Product[] = [
    {
        id: 37,
        name: 'Pin iPhone 11 Pro Max NOHON dung lượng cao - GIẢM SỐC',
        slug: 'pin-iphone-11-pro-max-sale',
        category: 'Hàng bán rẻ',
        categoryId: 'sale',
        price: 450000,
        originalPrice: 850000,
        discount: 47,
        sold: 789,
        rating: 4.8,
        image: 'https://picsum.photos/seed/sale1/400/400',
        inStock: true,
        isHot: true,
        brand: 'NOHON',
        sku: 'SALE-PIN-IP11PM'
    },
    {
        id: 38,
        name: 'Màn hình iPhone XS Max liền bo nhẹ mốc góc - THANH LÝ',
        slug: 'man-hinh-iphone-xs-max-sale',
        category: 'Hàng bán rẻ',
        categoryId: 'sale',
        price: 1200000,
        originalPrice: 2500000,
        discount: 52,
        sold: 234,
        rating: 4.5,
        image: 'https://picsum.photos/seed/sale2/400/400',
        inStock: true,
        brand: 'Apple',
        sku: 'SALE-MH-XSMAX'
    },
    {
        id: 39,
        name: 'Combo 10 ốp lưng iPhone 13 các màu - GIÁ SỈ CHÁY HÀNG',
        slug: 'combo-op-lung-iphone-13-sale',
        category: 'Hàng bán rẻ',
        categoryId: 'sale',
        price: 180000,
        originalPrice: 400000,
        discount: 55,
        sold: 1456,
        rating: 4.7,
        image: 'https://picsum.photos/seed/sale3/400/400',
        inStock: true,
        isHot: true,
        brand: 'Generic',
        sku: 'SALE-CASE-IP13-COMBO'
    },
    {
        id: 40,
        name: 'Kính cường lực iPhone 12 Series - MUA 10 TẶNG 2',
        slug: 'kinh-cuong-luc-iphone-12-sale',
        category: 'Hàng bán rẻ',
        categoryId: 'sale',
        price: 50000,
        originalPrice: 120000,
        discount: 58,
        sold: 2345,
        rating: 4.6,
        image: 'https://picsum.photos/seed/sale4/400/400',
        inStock: true,
        brand: 'Generic',
        sku: 'SALE-GLASS-IP12'
    }
];

// ============================================
// NEWS ARTICLES
// ============================================
export const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: 'Hướng dẫn thay màn hình iPhone 15 Pro Max chi tiết từ A-Z',
        slug: 'huong-dan-thay-man-hinh-iphone-15-pro-max',
        excerpt: 'Hướng dẫn chi tiết các bước thay màn hình iPhone 15 Pro Max một cách an toàn, chuyên nghiệp với các công cụ cần thiết và mẹo hay...',
        content: '',
        category: 'Hướng dẫn',
        author: 'SmartParts Team',
        authorAvatar: 'https://i.pravatar.cc/150?img=1',
        date: '05/02/2026',
        readTime: '8 phút đọc',
        views: 2456,
        image: 'https://picsum.photos/seed/news1/800/500',
        featured: true,
        tags: ['iPhone 15', 'Màn hình', 'Hướng dẫn']
    },
    {
        id: 2,
        title: 'So sánh màn hình OLED và LCD trên iPhone: Nên chọn loại nào?',
        slug: 'so-sanh-man-hinh-oled-lcd-iphone',
        excerpt: 'Phân tích chi tiết ưu nhược điểm của màn hình OLED và LCD, giúp bạn đưa ra quyết định đúng đắn khi thay màn hình...',
        category: 'Review',
        author: 'Nguyễn Văn A',
        authorAvatar: 'https://i.pravatar.cc/150?img=2',
        date: '03/02/2026',
        readTime: '6 phút đọc',
        views: 3421,
        image: 'https://picsum.photos/seed/news2/800/500',
        featured: true,
        tags: ['OLED', 'LCD', 'So sánh']
    },
    {
        id: 3,
        title: 'Top 5 lỗi thường gặp khi thay pin iPhone và cách khắc phục',
        slug: 'top-5-loi-thuong-gap-khi-thay-pin-iphone',
        excerpt: 'Tổng hợp những lỗi phổ biến nhất khi thay pin iPhone như pin phồng, không nhận sạc, tụt pin nhanh và cách giải quyết hiệu quả...',
        category: 'Tips & Tricks',
        author: 'Lê Thị B',
        authorAvatar: 'https://i.pravatar.cc/150?img=3',
        date: '01/02/2026',
        readTime: '5 phút đọc',
        views: 1890,
        image: 'https://picsum.photos/seed/news3/800/500',
        featured: false,
        tags: ['Pin', 'Lỗi', 'Khắc phục']
    },
    {
        id: 4,
        title: 'Cách kiểm tra linh kiện iPhone zin hay fake chính xác 100%',
        slug: 'cach-kiem-tra-linh-kien-iphone-zin-fake',
        excerpt: 'Bí kíp nhận biết linh kiện iPhone chính hãng, zin bóc máy hay hàng fake thông qua serial number, mã vạch và các dấu hiệu khác...',
        category: 'Kiến thức',
        author: 'Trần Văn C',
        authorAvatar: 'https://i.pravatar.cc/150?img=4',
        date: '28/01/2026',
        readTime: '7 phút đọc',
        views: 5234,
        image: 'https://picsum.photos/seed/news4/800/500',
        featured: false,
        tags: ['Zin', 'Fake', 'Kiểm tra']
    },
    {
        id: 5,
        title: 'Bảo quản pin điện thoại đúng cách để tăng tuổi thọ gấp đôi',
        slug: 'bao-quan-pin-dien-thoai-dung-cach',
        excerpt: 'Những mẹo hay giúp bảo quản và sử dụng pin điện thoại hiệu quả, kéo dài tuổi thọ pin lên gấp 2-3 lần...',
        category: 'Tips & Tricks',
        author: 'Phạm Thị D',
        authorAvatar: 'https://i.pravatar.cc/150?img=5',
        date: '25/01/2026',
        readTime: '4 phút đọc',
        views: 4567,
        image: 'https://picsum.photos/seed/news5/800/500',
        featured: false,
        tags: ['Pin', 'Bảo quản', 'Tuổi thọ']
    },
    {
        id: 6,
        title: 'Xu hướng thay linh kiện điện thoại năm 2026: Điều gì đáng chú ý?',
        slug: 'xu-huong-thay-linh-kien-2026',
        excerpt: 'Phân tích xu hướng công nghệ và thay linh kiện điện thoại trong năm 2026, từ màn hình LTPO đến pin graphene...',
        category: 'Tin tức',
        author: 'SmartParts Team',
        authorAvatar: 'https://i.pravatar.cc/150?img=1',
        date: '22/01/2026',
        readTime: '10 phút đọc',
        views: 2890,
        image: 'https://picsum.photos/seed/news6/800/500',
        featured: false,
        tags: ['Xu hướng', '2026', 'Công nghệ']
    }
];

// ============================================
// FEATURED PRODUCTS (for homepage)
// ============================================
export const featuredProducts: Product[] = [
    ...phonePartsProducts.filter(p => p.isFeatured).slice(0, 3),
    ...ipadPartsProducts.filter(p => p.isFeatured).slice(0, 1),
    ...accessoriesProducts.filter(p => p.isFeatured).slice(0, 1),
    ...phonePartsProducts.filter(p => p.isHot).slice(0, 3)
];

// ============================================
// HOT DEALS (for homepage flash sale)
// ============================================
export const hotDeals: Product[] = saleProducts.slice(0, 4);

// ============================================
// ALL PRODUCTS COMBINED
// ============================================
export const allProducts: Product[] = [
    ...phonePartsProducts,
    ...ipadPartsProducts,
    ...glassSuppliesProducts,
    ...toolsEquipmentProducts,
    ...accessoriesProducts,
    ...saleProducts
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
    return allProducts.filter(p => p.categoryId === categoryId);
};

// Get product by ID
export const getProductById = (id: number | string): Product | undefined => {
    return allProducts.find(p => p.id === id);
};

// Get featured products
export const getFeaturedProducts = (count: number = 8): Product[] => {
    return allProducts.filter(p => p.isFeatured || p.isHot).slice(0, count);
};

// Get products on sale
export const getSaleProducts = (count?: number): Product[] => {
    const products = allProducts.filter(p => p.discount > 30).sort((a, b) => b.discount - a.discount);
    return count ? products.slice(0, count) : products;
};

// Search products
export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.brand?.toLowerCase().includes(lowerQuery)
    );
};

// Filter products by price range
export const filterByPriceRange = (products: Product[], min: number, max: number): Product[] => {
    return products.filter(p => p.price >= min && p.price <= max);
};

// Sort products
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => Number(b.rating) - Number(a.rating));
        case 'sold':
            return sorted.sort((a, b) => b.sold - a.sold);
        case 'newest':
            return sorted.sort((a, b) => b.id > a.id ? 1 : -1);
        case 'popular':
        default:
            return sorted.sort((a, b) => b.sold - a.sold);
    }
};
