import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Star, 
  Database, 
  Store, 
  Package, 
  Wrench, 
  Users, 
  FileText, 
  Wallet, 
  MapPin, 
  Calculator, 
  Scale, 
  ClipboardList,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ShoppingCart,
  Truck,
  UserCheck,
  Factory,
  Briefcase,
  Settings,
  PieChart
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { 
    icon: LayoutDashboard, 
    label: 'Bảng điều khiển', 
    path: '/',
    children: [
      { label: 'Tổng quan', path: '/' },
      { label: 'Phân tích dữ liệu', path: '/analytics' },
      { label: 'Báo cáo thời gian thực', path: '/reports' }
    ]
  },
  { 
    icon: Wallet, 
    label: 'Tài chính',
    path: '/finance',
    children: [
      { label: 'Kế toán tổng hợp', path: '/finance' },
      { label: 'Quản lý hóa đơn', path: '/finance/invoices' },
      { label: 'Theo dõi chi phí', path: '/finance/expenses' },
      { label: 'Quản lý tài sản', path: '/finance/assets' }
    ]
  },
  { 
    icon: ShoppingCart, 
    label: 'Bán hàng',
    path: '/sales',
    children: [
      { label: 'Quản lý CRM', path: '/sales' },
      { label: 'Cơ hội kinh doanh', path: '/sales/opportunities' },
      { label: 'Báo giá & Hợp đồng', path: '/sales/quotes' },
      { label: 'Đơn hàng (Sales Order)', path: '/sales/orders' }
    ]
  },
  { 
    icon: Truck, 
    label: 'Mua hàng',
    path: '/procurement',
    children: [
      { label: 'Nhà cung cấp', path: '/procurement/vendors' },
      { label: 'Đơn mua hàng (PO)', path: '/procurement/po' },
      { label: 'Yêu cầu mua hàng', path: '/procurement/requests' }
    ]
  },
  { 
    icon: Package, 
    label: 'Kho hàng',
    path: '/inventory',
    children: [
      { label: 'Quản lý kho bãi', path: '/inventory' },
      { label: 'Kiểm kê tồn kho', path: '/inventory/audit' },
      { label: 'Chuyển kho nội bộ', path: '/inventory/transfer' }
    ]
  },
  { 
    icon: UserCheck, 
    label: 'Nhân sự & Lương',
    path: '/hr',
    children: [
      { label: 'Hồ sơ nhân viên', path: '/hr' },
      { label: 'Chấm công & Ca làm', path: '/hr/attendance' },
      { label: 'Quản lý nghỉ phép', path: '/hr/leave' },
      { label: 'Tính lương (Payroll)', path: '/hr/payroll' }
    ]
  },
  { 
    icon: Factory, 
    label: 'Sản xuất',
    path: '/manufacturing',
    children: [
      { label: 'Định mức nguyên liệu (BOM)', path: '/manufacturing/bom' },
      { label: 'Lệnh sản xuất', path: '/manufacturing/orders' },
      { label: 'Kế hoạch sản xuất', path: '/manufacturing/planning' }
    ]
  },
  { 
    icon: Briefcase, 
    label: 'Dự án',
    path: '/projects',
    children: [
      { label: 'Danh sách dự án', path: '/projects' },
      { label: 'Quản lý nhiệm vụ', path: '/projects/tasks' },
      { label: 'Bảng chấm công dự án', path: '/projects/timesheet' }
    ]
  },
  { 
    icon: Settings, 
    label: 'Cài đặt hệ thống',
    path: '/settings',
    children: [
      { label: 'Quản lý người dùng', path: '/settings/users' },
      { label: 'Phân quyền (RBAC)', path: '/settings/rbac' },
      { label: 'Cấu hình hệ thống', path: '/settings/config' }
    ]
  },
];

export const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>(['Bảng điều khiển']);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-y-auto scrollbar-hide">
      <div className="p-5 flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
          <ChevronLeft className="text-white w-5 h-5 -rotate-45" />
        </div>
        <span className="text-lg font-bold text-blue-600 tracking-tight uppercase">ERP System</span>
      </div>

      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm menu..." 
            className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 pb-8">
        {menuItems.map((item, index) => {
          const isOpen = openMenus.includes(item.label);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={index} className="space-y-0.5">
              <div
                onClick={() => hasChildren && toggleMenu(item.label)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all group cursor-pointer",
                  "text-gray-500 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={cn("w-4.5 h-4.5", "text-gray-400 group-hover:text-gray-600")} />
                  <span className="text-xs font-semibold">{item.label}</span>
                </div>
                {hasChildren && (
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200 text-gray-400",
                    isOpen && "rotate-180 text-blue-600"
                  )} />
                )}
              </div>

              <AnimatePresence initial={false}>
                {isOpen && hasChildren && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden pl-10 space-y-0.5"
                  >
                    {item.children?.map((child, childIdx) => (
                      <NavLink
                        key={childIdx}
                        to={child.path}
                        className={({ isActive }) => cn(
                          "w-full block px-3 py-1.5 rounded-lg text-[11px] transition-colors",
                          isActive 
                            ? "text-blue-600 font-bold bg-blue-50/50" 
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
