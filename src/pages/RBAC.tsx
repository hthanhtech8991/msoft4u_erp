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
  { id: 'dashboard', name: 'Bảng điều khiển', description: 'Xem tổng quan hệ thống và biểu đồ' },
  { id: 'finance', name: 'Tài chính', description: 'Quản lý hóa đơn, ngân sách và báo cáo' },
  { id: 'sales', name: 'Bán hàng', description: 'Quản lý CRM, cơ hội và đơn hàng' },
  { id: 'inventory', name: 'Kho hàng', description: 'Theo dõi tồn kho và nhập xuất' },
  { id: 'hr', name: 'Nhân sự', description: 'Hồ sơ nhân viên và bảng lương' },
  { id: 'settings', name: 'Cài đặt', description: 'Cấu hình hệ thống và người dùng' },
];

const roles = [
  { id: 'admin', name: 'Quản trị viên', color: 'bg-blue-100 text-blue-700' },
  { id: 'manager', name: 'Quản lý module', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'staff', name: 'Nhân viên', color: 'bg-gray-100 text-gray-700' },
];

const RBAC = () => {
  const [selectedRole, setSelectedRole] = useState('admin');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Phân quyền người dùng (RBAC)</h1>
          <p className="text-xs text-gray-400">Thiết lập quyền truy cập chi tiết cho từng vai trò trong hệ thống</p>
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
                <span className="text-xs font-bold text-gray-700">Ma trận quyền hạn: <span className="text-blue-600">{roles.find(r => r.id === selectedRole)?.name}</span></span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-gray-400 font-medium">Có quyền</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                  <span className="text-[10px] text-gray-400 font-medium">Không có quyền</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Module / Chức năng</th>
                    <th className="px-6 py-3 text-center">Xem (Read)</th>
                    <th className="px-6 py-3 text-center">Thêm (Create)</th>
                    <th className="px-6 py-3 text-center">Sửa (Update)</th>
                    <th className="px-6 py-3 text-center">Xóa (Delete)</th>
                    <th className="px-6 py-3 text-center">Duyệt (Approve)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {modules.map((module) => (
                    <tr key={module.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-800">{module.name}</span>
                          <span className="text-[10px] text-gray-400">{module.description}</span>
                        </div>
                      </td>
                      {[Eye, Plus, Edit3, Trash2, CheckCircle2].map((Icon, idx) => {
                        // Mock logic for permissions based on role
                        const hasPermission = selectedRole === 'admin' || 
                          (selectedRole === 'manager' && idx < 4) || 
                          (selectedRole === 'staff' && idx < 1);
                        
                        return (
                          <td key={idx} className="px-6 py-4 text-center">
                            <button className={cn(
                              "p-1.5 rounded-lg transition-colors",
                              hasPermission ? "text-emerald-500 bg-emerald-50 hover:bg-emerald-100" : "text-gray-200 bg-gray-50 hover:bg-gray-100"
                            )}>
                              <Icon className="w-4 h-4" />
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
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
