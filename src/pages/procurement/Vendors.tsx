import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  Globe,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Tag, Button, Input, Table, Badge, ConfigProvider } from 'antd';

const VENDORS = [
  { 
    id: 'VND001', 
    name: 'Công ty Công nghệ Toàn Cầu', 
    category: 'Thiết bị điện tử', 
    contact: 'Nguyễn Văn Nam', 
    email: 'nam.n@globaltech.com', 
    phone: '028 3844 1234',
    rating: 4.8,
    status: 'Đang hoạt động',
    address: 'Quận 1, TP. HCM'
  },
  { 
    id: 'VND002', 
    name: 'Phụ kiện Minh Anh', 
    category: 'Linh kiện', 
    contact: 'Lê Thị Mai', 
    email: 'mai.le@minhanh.vn', 
    phone: '024 3766 5678',
    rating: 4.2,
    status: 'Đang hoạt động',
    address: 'Quận Cầu Giấy, Hà Nội'
  },
  { 
    id: 'VND003', 
    name: 'Logistics Xuyên Việt', 
    category: 'Vận chuyển', 
    contact: 'Trần Minh Tâm', 
    email: 'tam.tm@xuyenviet.vn', 
    phone: '0236 3888 999',
    rating: 4.5,
    status: 'Tạm ngưng',
    address: 'Quận Hải Châu, Đà Nẵng'
  },
  { 
    id: 'VND004', 
    name: 'Văn phòng phẩm Hồng Hà', 
    category: 'Văn phòng phẩm', 
    contact: 'Phạm Thu Thủy', 
    email: 'thuy.pt@hongha.com.vn', 
    phone: '024 3822 1122',
    rating: 4.0,
    status: 'Đang hoạt động',
    address: 'Quận Hoàn Kiếm, Hà Nội'
  }
];

const Vendors = () => {
  const [search, setSearch] = useState('');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 12,
        },
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quản lý Nhà cung cấp</h1>
            <p className="text-xs text-gray-400">Danh sách đối tác và đánh giá năng lực cung ứng</p>
          </div>
          <Button type="primary" icon={<Plus className="w-3.5 h-3.5 mr-2 inline" />} size="large">
            Thêm nhà cung cấp
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Tổng đối tác</p>
              <h3 className="text-lg font-bold text-gray-800">124</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Đã xác minh</p>
              <h3 className="text-lg font-bold text-gray-800">98</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Đánh giá TB</p>
              <h3 className="text-lg font-bold text-gray-800">4.6/5.0</h3>
            </div>
          </div>
        </div>

        {/* Vendor List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input 
                placeholder="Tìm theo tên, mã hoặc lĩnh vực..." 
                className="pl-9 py-2 border-none bg-gray-50 rounded-xl text-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button icon={<Filter className="w-3.5 h-3.5 mr-2 inline" />}>Bộ lọc</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Nhà cung cấp</th>
                  <th className="px-6 py-3">Lĩnh vực</th>
                  <th className="px-6 py-3">Liên hệ</th>
                  <th className="px-6 py-3">Đánh giá</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {VENDORS.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xs">
                          {vendor.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{vendor.name}</div>
                          <div className="text-[10px] text-gray-400 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {vendor.address}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Tag color="blue" className="text-[10px] border-none font-bold px-2 py-0.5 rounded-lg">
                        {vendor.category}
                      </Tag>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700">{vendor.contact}</div>
                        <div className="text-[10px] text-gray-400 flex items-center gap-2">
                          <Mail className="w-2.5 h-2.5" /> {vendor.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        status={vendor.status === 'Đang hoạt động' ? 'success' : 'warning'} 
                        text={<span className="text-[11px] font-medium text-gray-600">{vendor.status}</span>} 
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Vendors;
