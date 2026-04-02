import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-5 space-y-5">
          <Outlet />
          
          {/* Footer with Developer Info */}
          <footer className="pt-8 pb-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">ERP</span>
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Hệ thống ERP System v1.0</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-medium">Phát triển bởi</p>
                <p className="text-[11px] font-bold text-gray-700">Andy Warhol & Team</p>
              </div>
              <div className="h-8 w-px bg-gray-100" />
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-medium">Hỗ trợ kỹ thuật</p>
                <p className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">support@erpsystem.com</p>
              </div>
            </div>
            
            <p className="text-[10px] text-gray-400 font-medium">© 2026 ERP System. Bảo lưu mọi quyền.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};
