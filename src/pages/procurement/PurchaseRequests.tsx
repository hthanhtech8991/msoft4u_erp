import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  Layers,
  Info
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Tag, Button, Input, Table, Badge, ConfigProvider, Steps, Card } from 'antd';

const PURCHASE_REQUESTS = [
  { 
    id: 'PR-2024-001', 
    requester: 'Nguyễn Văn A', 
    department: 'Kỹ thuật', 
    date: '2024-03-25', 
    priority: 'Cao', 
    status: 'Chờ phê duyệt', 
    items: [
      { name: 'Laptop Dell XPS 15', quantity: 2, estimatedPrice: 4000 },
      { name: 'Màn hình Dell UltraSharp', quantity: 4, estimatedPrice: 2000 }
    ],
    total: 6000
  },
  { 
    id: 'PR-2024-002', 
    requester: 'Trần Thị B', 
    department: 'Nhân sự', 
    date: '2024-03-24', 
    priority: 'Trung bình', 
    status: 'Đã phê duyệt', 
    items: [
      { name: 'Văn phòng phẩm quý 2', quantity: 1, estimatedPrice: 500 }
    ],
    total: 500
  },
  { 
    id: 'PR-2024-003', 
    requester: 'Lê Văn C', 
    department: 'Sản xuất', 
    date: '2024-03-22', 
    priority: 'Thấp', 
    status: 'Đã tạo PO', 
    items: [
      { name: 'Linh kiện máy móc A', quantity: 100, estimatedPrice: 1500 }
    ],
    total: 1500
  }
];

const PurchaseRequests = () => {
  const [search, setSearch] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Cao': return 'rose';
      case 'Trung bình': return 'amber';
      case 'Thấp': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã phê duyệt': return 'success';
      case 'Chờ phê duyệt': return 'warning';
      case 'Đã tạo PO': return 'processing';
      case 'Từ chối': return 'error';
      default: return 'default';
    }
  };

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
            <h1 className="text-xl font-bold text-gray-800">Yêu cầu mua hàng (PR)</h1>
            <p className="text-xs text-gray-400">Quản lý các yêu cầu mua sắm nội bộ từ các phòng ban</p>
          </div>
          <Button type="primary" icon={<Plus className="w-3.5 h-3.5 mr-2 inline" />} size="large">
            Tạo yêu cầu mới
          </Button>
        </div>

        {/* PR Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Tổng yêu cầu</p>
              <h3 className="text-lg font-bold text-gray-800">18</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Chờ phê duyệt</p>
              <h3 className="text-lg font-bold text-gray-800">5</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Đã phê duyệt</p>
              <h3 className="text-lg font-bold text-gray-800">12</h3>
            </div>
          </div>
        </div>

        {/* PR List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input 
                placeholder="Tìm theo mã PR, người yêu cầu..." 
                className="pl-9 py-2 border-none bg-gray-50 rounded-xl text-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button icon={<Filter className="w-3.5 h-3.5 mr-2 inline" />}>Bộ lọc</Button>
          </div>

          <div className="p-4 space-y-4">
            {PURCHASE_REQUESTS.map((pr) => (
              <div key={pr.id} className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <ClipboardList className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-800">{pr.id}</span>
                        <span className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase",
                          pr.priority === 'Cao' ? "bg-rose-50 text-rose-600" : 
                          pr.priority === 'Trung bình' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                        )}>
                          Ưu tiên {pr.priority}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
                        <User className="w-2.5 h-2.5" /> {pr.requester} • {pr.department}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-gray-800">${pr.total.toLocaleString()}</div>
                    <Tag color={getStatusColor(pr.status)} className="text-[10px] border-none font-bold px-2 py-0.5 rounded-lg mt-1">
                      {pr.status}
                    </Tag>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Danh sách mặt hàng:</div>
                  <div className="space-y-2">
                    {pr.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-600">{item.name} x {item.quantity}</span>
                        <span className="font-bold text-gray-800">${item.estimatedPrice.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                      <Clock className="w-3 h-3" /> {pr.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                      <Layers className="w-3 h-3" /> {pr.items.length} mặt hàng
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 hover:underline">
                    Xem chi tiết <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PurchaseRequests;
