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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
