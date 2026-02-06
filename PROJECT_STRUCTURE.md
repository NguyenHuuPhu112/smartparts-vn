# Cấu Trúc Thư Mục Dự Án

## 📁 Tổ chức thư mục chuẩn

```
d:\web\frontend\
├── public/                      # Static files
│   ├── favicon.ico
│   └── images/                 # Public images
│
├── src/
│   ├── assets/                 # Assets (images, fonts, icons)
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/             # Reusable components
│   │   ├── Sidebar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── ... (other shared components)
│   │
│   ├── layouts/                # Layout components
│   │   ├── header/
│   │   │   └── Header.tsx
│   │   ├── footer/
│   │   │   └── Footer.tsx
│   │   └── MainLayout.tsx
│   │
│   ├── pages/                  # Page components (Views)
│   │   ├── Home/
│   │   │   └── HomePage.tsx
│   │   ├── Products/
│   │   │   ├── ProductListPage.tsx
│   │   │   └── ProductDetailPage.tsx
│   │   ├── Cart/
│   │   │   └── CartPage.tsx
│   │   └── ... (other pages)
│   │
│   ├── features/               # Feature-based modules (optional)
│   │   ├── auth/
│   │   ├── products/
│   │   └── cart/
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useFetch.ts
│   │
│   ├── services/               # API services
│   │   ├── api.ts
│   │   ├── productService.ts
│   │   └── authService.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── formatPrice.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   │
│   ├── types/                  # TypeScript type definitions
│   │   ├── product.types.ts
│   │   ├── user.types.ts
│   │   └── index.ts
│   │
│   ├── constants/              # Constants & configs
│   │   ├── routes.ts
│   │   ├── apiEndpoints.ts
│   │   └── config.ts
│   │
│   ├── styles/                 # Global styles
│   │   ├── index.css
│   │   └── variables.css
│   │
│   ├── App.tsx                 # Main App component
│   ├── App.css
│   └── main.tsx                # Entry point
│
├── .env                        # Environment variables
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 📝 Mô tả chi tiết

### **`/src/components/`**
- Chứa các **reusable components** được sử dụng ở nhiều nơi
- Mỗi component phức tạp nên có folder riêng với:
  - `ComponentName.tsx` - Component chính
  - `ComponentName.test.tsx` - Unit tests (optional)
  - `index.ts` - Export barrel

### **`/src/layouts/`**
- Chứa các **layout components**:
  - `Header.tsx` - Header chung
  - `Footer.tsx` - Footer chung  
  - `MainLayout.tsx` - Layout tổng

### **`/src/pages/`**
- Chứa các **page components** (views/screens)
- Mỗi page nên có folder riêng
- Đặt tên theo route: `/products` → `ProductsPage.tsx`

### **`/src/hooks/`**
- Custom React hooks
- Đặt tên: `use[Name].ts`
- Example: `useAuth.ts`, `useLocalStorage.ts`

### **`/src/services/`**
- API calls và business logic
- Tách biệt khỏi UI components
- Example: `productService.ts`, `authService.ts`

### **`/src/utils/`**
- Helper functions, utilities
- Pure functions không có side effects

### **`/src/types/`**
- TypeScript interfaces và types
- Centralized type definitions

### **`/src/constants/`**
- Constants, configurations
- API endpoints, routes, etc.

## 🎯 Best Practices

1. **Single Responsibility**: Mỗi file/component chỉ làm 1 việc
2. **DRY (Don't Repeat Yourself)**: Tái sử dụng code thông qua components/hooks
3. **Naming Convention**:
   - Components: PascalCase (`ProductCard.tsx`)
   - Utilities/hooks: camelCase (`formatPrice.ts`)
   - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
4. **Barrel Exports**: Sử dụng `index.ts` để export nhiều items
5. **Co-location**: Đặt files liên quan gần nhau

## 📦 Import Paths

Sử dụng absolute imports với alias:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

Example import:
```typescript
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { ProductService } from '@/services/productService';
```
