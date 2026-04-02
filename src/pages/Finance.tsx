import React from 'react';
import { 
  Wallet, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  Filter,
  Download
} from 'lucide-react';

const Finance = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Quản lý Tài chính</h1>
          <p className="text-xs text-gray-400">Theo dõi dòng tiền, hóa đơn và báo cáo kế toán</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Xuất báo cáo
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Tạo hóa đơn mới
          </button>
        </div>
      </div>

      {/* Finance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wallet className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tổng ngân sách</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">$1,284,500</div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +12.5% so với tháng trước
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-50 rounded-lg">
              <ArrowDownLeft className="w-4 h-4 text-rose-600" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tổng chi phí</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">$452,300</div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-rose-500 font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +5.2% so với tháng trước
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lợi nhuận ròng</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">$832,200</div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
            <ArrowUpRight className="w-3 h-3" />
            +18.3% so với tháng trước
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800">Giao dịch gần đây</h3>
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Mã hóa đơn</th>
                <th className="px-6 py-3">Khách hàng</th>
                <th className="px-6 py-3">Ngày</th>
                <th className="px-6 py-3">Số tiền</th>
                <th className="px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { id: '#INV-001', client: 'Công ty ABC', date: '02/04/2026', amount: '$12,500', status: 'Đã thanh toán', statusColor: 'text-emerald-600 bg-emerald-50' },
                { id: '#INV-002', client: 'Nguyễn Văn A', date: '01/04/2026', amount: '$3,200', status: 'Chờ xử lý', statusColor: 'text-amber-600 bg-amber-50' },
                { id: '#INV-003', client: 'Tập đoàn XYZ', date: '31/03/2026', amount: '$45,000', status: 'Quá hạn', statusColor: 'text-rose-600 bg-rose-50' },
                { id: '#INV-004', client: 'Cửa hàng B', date: '30/03/2026', amount: '$8,900', status: 'Đã thanh toán', statusColor: 'text-emerald-600 bg-emerald-50' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-blue-600">{row.id}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600">{row.client}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{row.date}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-800">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
