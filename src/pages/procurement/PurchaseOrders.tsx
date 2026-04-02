import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  DollarSign, 
  Truck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Tag, Button, Input, Table, Badge, ConfigProvider, Progress } from 'antd';

const PURCHASE_ORDERS = [
  { 
    id: 'PO-2024-001', 
    vendor: 'Công ty Công nghệ Toàn Cầu', 
    date: '2024-03-20', 
    deliveryDate: '2024-03-25', 
    total: 12500, 
    status: 'Đã nhận hàng', 
    paymentStatus: 'Đã thanh toán',
    items: 12
  },
  { 
    id: 'PO-2024-002', 
    vendor: 'Phụ kiện Minh Anh', 
    date: '2024-03-22', 
    deliveryDate: '2024-03-28', 
    total: 4200, 
    status: 'Đang vận chuyển', 
    paymentStatus: 'Chờ thanh toán',
    items: 45
  },
  { 
    id: 'PO-2024-003', 
    vendor: 'Logistics Xuyên Việt', 
    date: '2024-03-24', 
    deliveryDate: '2024-03-30', 
    total: 850, 
    status: 'Chờ phê duyệt', 
    paymentStatus: 'Chưa thanh toán',
    items: 1
  },
  { 
    id: 'PO-2024-004', 
    vendor: 'Văn phòng phẩm Hồng Hà', 
    date: '2024-03-25', 
    deliveryDate: '2024-03-27', 
    total: 1200, 
    status: 'Bản nháp', 
    paymentStatus: 'Chưa thanh toán',
    items: 8
  }
];

const PurchaseOrders = () => {
  const [search, setSearch] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã nhận hàng': return 'success';
      case 'Đang vận chuyển': return 'processing';
      case 'Chờ phê duyệt': return 'warning';
      case 'Bản nháp': return 'default';
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
            <h1 className="text-xl font-bold text-gray-800">Đơn mua hàng (PO)</h1>
            <p className="text-xs text-gray-400">Quản lý quy trình mua sắm và theo dõi đơn hàng từ nhà cung cấp</p>
          </div>
          <Button type="primary" icon={<Plus className="w-3.5 h-3.5 mr-2 inline" />} size="large">
            Tạo đơn PO mới
          </Button>
        </div>

        {/* PO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Tổng PO</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">42</h3>
            <div className="text-[10px] text-emerald-500 font-bold mt-1">+12% so với tháng trước</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Đang xử lý</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">15</h3>
            <div className="text-[10px] text-gray-400 font-bold mt-1">8 đơn chờ phê duyệt</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Đã nhận hàng</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">24</h3>
            <div className="text-[10px] text-emerald-500 font-bold mt-1">Tỷ lệ đúng hạn 92%</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-rose-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Tổng chi tiêu</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">$185.4k</h3>
            <div className="text-[10px] text-rose-500 font-bold mt-1">-5% so với ngân sách</div>
          </div>
        </div>

        {/* PO List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <Input 
                placeholder="Tìm theo mã PO, nhà cung cấp..." 
                className="pl-9 py-2 border-none bg-gray-50 rounded-xl text-xs"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button icon={<Filter className="w-3.5 h-3.5 mr-2 inline" />}>Lọc</Button>
              <Button icon={<ArrowRight className="w-3.5 h-3.5 mr-2 inline" />}>Xuất báo cáo</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Mã PO</th>
                  <th className="px-6 py-3">Nhà cung cấp</th>
                  <th className="px-6 py-3">Ngày đặt</th>
                  <th className="px-6 py-3">Giá trị</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Thanh toán</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PURCHASE_ORDERS.map((po) => (
                  <tr key={po.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-blue-600 group-hover:underline">{po.id}</div>
                      <div className="text-[10px] text-gray-400">{po.items} mặt hàng</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-gray-800">{po.vendor}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        Giao hàng: {po.deliveryDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{po.date}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-800">${po.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Tag color={getStatusColor(po.status)} className="text-[10px] border-none font-bold px-2 py-0.5 rounded-lg">
                        {po.status}
                      </Tag>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        status={po.paymentStatus === 'Đã thanh toán' ? 'success' : po.paymentStatus === 'Chờ thanh toán' ? 'processing' : 'error'} 
                        text={<span className="text-[11px] font-medium text-gray-600">{po.paymentStatus}</span>} 
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

export default PurchaseOrders;
