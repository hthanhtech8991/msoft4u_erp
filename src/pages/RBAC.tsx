import React, { useState } from 'react';
import { 
  Shield, 
  UserPlus, 
  Search, 
  Lock, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2,
  XCircle,
  ChevronDown,
  Info,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const modules = [
  { 
    id: 'dashboard', 
    name: 'Bảng điều khiển', 
    description: 'Xem tổng quan hệ thống và biểu đồ',
    permissions: [
      { id: 'view_analytics', name: 'Xem phân tích dữ liệu' },
      { id: 'view_realtime', name: 'Xem báo cáo thời gian thực' },
      { id: 'export_dashboard', name: 'Xuất dữ liệu Dashboard' }
    ]
  },
  { 
    id: 'finance', 
    name: 'Tài chính', 
    description: 'Quản lý hóa đơn, ngân sách và báo cáo',
    permissions: [
      { id: 'view_invoices', name: 'Xem danh sách hóa đơn' },
      { id: 'create_invoice', name: 'Tạo hóa đơn mới' },
      { id: 'approve_invoice', name: 'Duyệt hóa đơn' },
      { id: 'view_reports', name: 'Xem báo cáo tài chính' },
      { id: 'manage_assets', name: 'Quản lý tài sản cố định' }
    ]
  },
  { 
    id: 'sales', 
    name: 'Bán hàng', 
    description: 'Quản lý CRM, cơ hội và đơn hàng',
    permissions: [
      { id: 'view_crm', name: 'Xem danh sách khách hàng' },
      { id: 'manage_opportunities', name: 'Quản lý cơ hội kinh doanh' },
      { id: 'create_sales_order', name: 'Tạo đơn hàng bán' },
      { id: 'approve_sales_order', name: 'Duyệt đơn hàng bán' },
      { id: 'view_sales_reports', name: 'Xem báo cáo doanh số' }
    ]
  },
  { 
    id: 'inventory', 
    name: 'Kho hàng', 
    description: 'Theo dõi tồn kho và nhập xuất',
    permissions: [
      { id: 'view_stock', name: 'Xem tồn kho' },
      { id: 'create_stock_in', name: 'Tạo phiếu nhập kho' },
      { id: 'approve_stock_in', name: 'Duyệt phiếu nhập kho' },
      { id: 'perform_audit', name: 'Thực hiện kiểm kê' }
    ]
  },
];

const roles = [
  { id: 'admin', name: 'Quản trị viên', color: 'bg-blue-100 text-blue-700' },
  { id: 'manager', name: 'Quản lý module', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'staff', name: 'Nhân viên', color: 'bg-gray-100 text-gray-700' },
];

const RBAC = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({
    admin: {
      view_analytics: true, view_realtime: true, export_dashboard: true,
      view_invoices: true, create_invoice: true, approve_invoice: true, view_reports: true, manage_assets: true,
      view_crm: true, manage_opportunities: true, create_sales_order: true, approve_sales_order: true, view_sales_reports: true,
      view_stock: true, create_stock_in: true, approve_stock_in: true, perform_audit: true
    },
    manager: {
      view_analytics: true, view_realtime: true,
      view_invoices: true, create_invoice: true, view_reports: true,
      view_crm: true, manage_opportunities: true, create_sales_order: true, view_sales_reports: true,
      view_stock: true, create_stock_in: true
    },
    staff: {
      view_analytics: true,
      view_invoices: true,
      view_crm: true,
      view_stock: true
    }
  });

  const togglePermission = (roleId: string, permissionId: string) => {
    setPermissions(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: !prev[roleId]?.[permissionId]
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Phân quyền chi tiết (Granular RBAC)</h1>
          <p className="text-xs text-gray-400">Thiết lập quyền hạn cụ thể cho từng hành động trong module</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
          <UserPlus className="w-3.5 h-3.5" />
          Thêm vai trò mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">Vai trò hệ thống</h3>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl border transition-all",
                selectedRole === role.id 
                  ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-50" 
                  : "bg-transparent border-transparent text-gray-500 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-2 h-2 rounded-full", role.id === 'admin' ? 'bg-blue-500' : role.id === 'manager' ? 'bg-emerald-500' : 'bg-gray-400')} />
                <span className="text-xs font-bold">{role.name}</span>
              </div>
              {selectedRole === role.id && <Shield className="w-3.5 h-3.5 text-blue-500" />}
            </button>
          ))}
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-700">Quyền hạn cụ thể: <span className="text-blue-600">{roles.find(r => r.id === selectedRole)?.name}</span></span>
              </div>
            </div>

            <div className="p-2">
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="border border-gray-50 rounded-xl overflow-hidden">
                    <div className="bg-gray-50/50 px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-800">{module.name}</span>
                        <span className="text-[10px] text-gray-400">({module.description})</span>
                      </div>
                    </div>
                    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.permissions.map((perm) => {
                        const isEnabled = permissions[selectedRole]?.[perm.id];
                        return (
                          <div 
                            key={perm.id}
                            onClick={() => togglePermission(selectedRole, perm.id)}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group",
                              isEnabled ? "bg-emerald-50/30 border-emerald-100" : "bg-white border-gray-100 hover:border-gray-200"
                            )}
                          >
                            <span className={cn(
                              "text-xs font-medium transition-colors",
                              isEnabled ? "text-emerald-700" : "text-gray-600"
                            )}>
                              {perm.name}
                            </span>
                            <div className={cn(
                              "w-8 h-4 rounded-full relative transition-colors",
                              isEnabled ? "bg-emerald-500" : "bg-gray-200"
                            )}>
                              <div className={cn(
                                "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all shadow-sm",
                                isEnabled ? "left-4.5" : "left-0.5"
                              )} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <p className="text-[11px] text-blue-700 leading-relaxed">
              <strong>Lưu ý:</strong> Mọi thay đổi về quyền hạn sẽ có hiệu lực ngay lập tức sau khi bạn nhấn "Lưu thay đổi". Người dùng đang đăng nhập có thể cần tải lại trang để cập nhật quyền mới.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700">Hủy bỏ</button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RBAC;
