import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import PhonePartsPage from './pages/category/PhonePartsPage';
import IPadPartsPage from './pages/category/IPadPartsPage';
import GlassSuppliesPage from './pages/category/GlassSuppliesPage';
import ToolsEquipmentPage from './pages/category/ToolsEquipmentPage';
import SalePage from './pages/category/SalePage';
import AccessoriesPage from './pages/category/AccessoriesPage';
import NewsPage from './pages/NewsPage';
import SearchPage from './pages/SearchPage';

// Admin Pages
import AdminLayout from './layouts/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminReports from './pages/admin/AdminReports';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phone-parts" element={<PhonePartsPage />} />
        <Route path="/ipad-parts" element={<IPadPartsPage />} />
        <Route path="/glass-supplies" element={<GlassSuppliesPage />} />
        <Route path="/tools-equipment" element={<ToolsEquipmentPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* --- Admin Routes --- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
