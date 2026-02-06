# 🛍️ Linh Phụ Kiện Hcm - E-commerce Platform

Website bán linh kiện điện thoại, phụ kiện công nghệ được xây dựng với React + TypeScript + Vite + Tailwind CSS.

## 🚀 Features

- ✅ **Giao diện hiện đại**: Design đẹp mắt với Tailwind CSS
- ✅ **Responsive**: Tối ưu cho mọi thiết bị (mobile, tablet, desktop)
- ✅ **Filter thông minh**: Lọc sản phẩm theo loại, thương hiệu
- ✅ **Search**: Tìm kiếm sản phẩm nhanh chóng
- ✅ **TypeScript**: Type-safe development
- ✅ **Performance**: Build with Vite (Rolldown)

## 📁 Cấu trúc dự án

Xem chi tiết tại [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

```
src/
├── components/     # Reusable components
├── layouts/        # Header, Footer, MainLayout
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── services/       # API services
├── utils/          # Utility functions
├── types/          # TypeScript types
└── constants/      # Constants & configs
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7 (Rolldown)
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Animation**: Framer Motion

## 📦 Installation

```bash
# Clone repository
git clone <repository-url>

# Navigate to project
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 🚦 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Environment Variables

Tạo file `.env` từ `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

- **Primary**: `#FFD700` (Vàng)
- **Secondary**: `#E31E24` (Đỏ)
- **Orange**: `#FF6B35` (Cam accent)
- **Gray**: Tailwind gray scale

## 📝 Code Style

- **Components**: PascalCase (`ProductCard.tsx`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🔧 Development Guidelines

1. **Component Structure**:
   ```tsx
   import React from 'react';
   import type { ComponentProps } from './types';
   
   const Component: React.FC<ComponentProps> = ({ ...props }) => {
     return <div>...</div>;
   };
   
   export default Component;
   ```

2. **Import Order**:
   - React imports
   - Third-party libraries
   - Local components
   - Utils/helpers
   - Types
   - Styles

3. **File Naming**:
   - Components: `ComponentName.tsx`
   - Hooks: `useHookName.ts`
   - Utils: `utilName.ts`
   - Types: `name.types.ts`

## 🐛 Known Issues

- CSS warnings về `@tailwind` là bình thường (IDE chưa nhận diện)
- Dev server có thể cần restart khi thay đổi config files

## 📄 License

Private - All rights reserved

## 👥 Contributors

- Your Name - Developer

## 📞 Contact

- **Phone**: 1900 2667
- **Email**: linhkienmcv@gmail.com
- **Address**: 147-149 Nguyễn Thị Phương, P8, Q5, TPHCM
