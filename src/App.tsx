import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Products from './pages/Products';
import Vendors from './pages/procurement/Vendors';
import PurchaseOrders from './pages/procurement/PurchaseOrders';
import PurchaseRequests from './pages/procurement/PurchaseRequests';
import RBAC from './pages/RBAC';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="finance" element={<Finance />} />
          <Route path="sales" element={<Sales />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/products" element={<Products />} />
          
          {/* Procurement Routes */}
          <Route path="procurement/vendors" element={<Vendors />} />
          <Route path="procurement/po" element={<PurchaseOrders />} />
          <Route path="procurement/requests" element={<PurchaseRequests />} />
          
          <Route path="settings/rbac" element={<RBAC />} />
          
          {/* Placeholder routes for other modules */}
          <Route path="procurement" element={<div className="p-8 text-center text-gray-400">Module Mua hàng đang được phát triển...</div>} />
          <Route path="hr" element={<div className="p-8 text-center text-gray-400">Module Nhân sự đang được phát triển...</div>} />
          <Route path="manufacturing" element={<div className="p-8 text-center text-gray-400">Module Sản xuất đang được phát triển...</div>} />
          <Route path="projects" element={<div className="p-8 text-center text-gray-400">Module Dự án đang được phát triển...</div>} />
          <Route path="settings" element={<div className="p-8 text-center text-gray-400">Module Cài đặt đang được phát triển...</div>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
