# ✅ SIDEBAR PRICE FILTER REMOVED

## 🛠 Changes

### 1. `Sidebar/index.tsx`
- Removed **Price Range Filter** UI section.
- Removed `PriceRangeFilter` import.
- Removed `price` from `expandedSections` state.
- Kept `ActiveFilters` logic (it won't show anything since price range can't be selected from sidebar).

## 🎯 Result
- The "KHOẢNG GIÁ" section is gone from the sidebar.
- Other filters (Category, Brand) remain functional.
- Layout is cleaner.

## ⚠️ Note
- If there is a price filter in the **Toolbar** (top of products), it will still work independently if implemented separately.
- This change only affects the **Sidebar**.

**Status**: Ready to test!
