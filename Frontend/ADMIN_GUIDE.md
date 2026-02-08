# 🛡️ ADMIN PANEL DOCUMENTATION

## 🚀 Accessing the Admin Panel
- **Login URL**: `/admin/login`
- **Dashboard URL**: `/admin`
- **Demo Credentials**:
  - **Username**: `admin`
  - **Password**: `123123`

## 🛠️ Features Implemented

### 1. Security (Mock Auth)
- **Protected Routes**: Accessing `/admin` without logging in will redirect to `/admin/login`.
- **Session Management**: Uses `localStorage` to persist login state.
- **Logout**: Button in the sidebar clears the session.

### 2. Dashboard (`/admin`)
- **Key Metrics**: Daily Revenue, New Orders, Customer Count.
- **Charts**: Visual Bar Chart for revenue trends.
- **Recent Orders**: Quick list of latest orders needing attention.

### 3. Product Management (`/admin/products`)
- **List View**: Table display of all products with image, SKU, price, stock status.
- **Search & Filter**: Find products by name or filer by category.
- **CRUD Actions**: 
  - **Add**: Button to add new product (Demo UI).
  - **Delete**: Remove product from the list (Local state only).
  - **Edit**: Edit product details (Demo UI).

### 4. Order Management (`/admin/orders`)
- **Order List**: Full list of orders with status (Pending, Shipping, Completed, Cancelled).
- **Status Filtering**: Tab-based filtering for quick workflow.
- **Invoice**: Print button implementation (Mock).

### 5. Categories & Brands (`/admin/categories`)
- **Dynamic Management**: Add new Categories (e.g., "Mainboard") or Brands (e.g., "Google Pixel").
- **Edit/Delete**: Manage existing taxonomies.
- **Purpose**: Allows flexibility to expand the store later without touching code.

## 📝 Notes for Developers
- **Data Source**: Currently using `mockData.ts` and local component state. In a real backend implementation, replace `useState` with API calls (e.g., `useQuery`, `axios`).
- **Icons**: Using `lucide-react` for consistent UI.
- **Styling**: Tailwind CSS with a dedicated Admin Layout (`AdminLayout.tsx`).

---
**Status**: Ready for Demo! 🚀
