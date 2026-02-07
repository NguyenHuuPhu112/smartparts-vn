# 🔧 Quick Fix - Bộ Lọc Sản Phẩm

## ✅ Đã fix các lỗi chính:

### 1. **MainLayout** - Removed Sidebar
- MainLayout không cần Sidebar (dùng cho HomePage, NewsPage)
- CategoryLayout có Sidebar (dùng cho product category pages)

### 2. **Import paths** - Fixed
- `filterHelpers.ts` import paths đã được fix
- Type-only imports sử dụng đúng

### 3. **Module structure** - Cleaned up
- Sidebar.old.tsx là backup file cũ
- Sidebar/index.tsx là modular version mới

## 🧪 Cách test bộ lọc:

### Bước 1: Kiểm tra server đang chạy
```bash
# Terminal should show port number like:
➜  Local:   http://localhost:5174/
```

### Bước 2: Mở browser và navigate
```
1. Vào http://localhost:5174 (hoặc port khác)
2. Click vào "Linh kiện điện thoại" trong navigation
3. URL nên là: /phone-parts
```

### Bước 3: Test filters

#### ✅ Test filter theo loại sản phẩm:
1. Sidebar bên trái có section "LOẠI SẢN PHẨM"
2. Check "Pin" hoặc "Màn hình"
3. Danh sách sản phẩm nên chỉ hiện products có từ "Pin" hoặc "Màn hình"
4. Badge màu xanh hiện "Pin" ở dưới sidebar

#### ✅ Test filter theo khoảng giá:
1. Click vào "KHOẢNG GIÁ" section  
2. Click "500k - 1 triệu"
3. Chỉ products có giá 500,000-1,000,000 hiện ra
4. Badge màu xanh lá hiện khoảng giá

#### ✅ Test filter theo thương hiệu:
1. Click "THƯƠNG HIỆU" section
2. Check "Apple" hoặc "Samsung"
3. Chỉ products của brand đó hiện ra
4. Badge màu tím hiện brand name

#### ✅ Test reset:
1. Click nút "THIẾT LẬP LỚI" trong Brand section
2. Tất cả filters bị clear
3. Tất cả products hiện lại

#### ✅ Test multiple filters:
1. Check "Pin" trong Loại
2. Check "Apple" trong Thương hiệu  
3. Chỉ Apple batteries hiện ra
4. 2 badges màu khác nhau

## 🐛 Nếu filter không hoạt động:

### Triệu chứng 1: **Sidebar không hiển thị**
→ Bạn đang ở trang không có sidebar (HomePage, NewsPage)
→ Navigate tới /phone-parts hoặc category page khác

### Triệu chứng 2: **Click filter nhưng products không thay đổi**
Possible causes:
- Check console for errors (F12 → Console tab)
- useProductFilters hook có thể chưa được apply đúng

Debug:
```typescript
// In PhonePartsPage.tsx
{(filters) => {
    console.log('Current filters:', filters); // Check filters
    const { filteredProducts } = useProductFilters({
        products: phonePartsProducts,
        filters
    });
    console.log('Filtered count:', filteredProducts.length); // Check count
    // ...
}}
```

### Triệu chứng 3: **Compile error hoặc white screen**
→ Check terminal for error messages
→ Common issues:
  - Import path sai
  - Missing export
  - Type error

## 📱 Pages có filter:

✅ **Category pages** (có Sidebar filter):
- /phone-parts
- /ipad-parts
- /glass-supplies
- /tools-equipment
- /accessories
- /sale

❌ **Non-category pages** (KHÔNG có Sidebar):
- / (HomePage)
- /news

## 💡 Expected behavior:

Khi click checkbox trong Sidebar:
```
User clicks "Apple" checkbox
    ↓
Sidebar state updates (selectedBrands = ['Apple'])
    ↓  
useEffect triggers in Sidebar
    ↓
onFilterChange callback fires
    ↓
CategoryLayout state updates
    ↓
PhonePartsPage receives new filters
    ↓
useProductFilters hook runs
    ↓
applyFilters function filters products
    ↓
CategoryPageTemplate shows only Apple products
    ↓
User sees filtered results!
```

## 🔍 Debug checklist:

- [ ] Server running without errors?
- [ ] On /phone-parts page (not homepage)?
- [ ] Sidebar visible on left side?
- [ ] Can see checkboxes and buttons?
- [ ] Console has no errors? (F12)
- [ ] Clicking checkbox shows visual feedback?
- [ ] Badge appears when filter selected?

## ⚡ Quick reset if things broken:

```bash
# Stop server (Ctrl+C)
# Clean and restart
npm run dev
```

Then test trên /phone-parts page!

---

**Last Updated**: 07/02/2026 11:35 AM  
**Status**: ✅ Should be working now
