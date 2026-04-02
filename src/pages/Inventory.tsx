import React from 'react';
import { 
  Package, 
  Box, 
  Truck, 
  RefreshCw, 
  AlertTriangle,
  Plus,
  Search,
  ArrowRight
} from 'lucide-react';

const Inventory = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Quản lý Kho hàng</h1>
          <p className="text-xs text-gray-400">Theo dõi tồn kho, nhập xuất và kiểm kê</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Kiểm kê
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Nhập kho mới
          </button>
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-2 bg-rose-500 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-rose-900">Sắp hết hàng (Low Stock)</h3>
            <p className="text-[10px] text-rose-700">Có 12 sản phẩm đang ở mức báo động dưới 10 đơn vị.</p>
          </div>
          <button className="ml-auto p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-2 bg-blue-500 rounded-xl">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-blue-900">Đang vận chuyển</h3>
            <p className="text-[10px] text-blue-700">Có 5 đơn hàng nhập kho dự kiến sẽ đến trong hôm nay.</p>
          </div>
          <button className="ml-auto p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stock List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800">Danh mục sản phẩm</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm sản phẩm..." 
              className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Sản phẩm</th>
                <th className="px-6 py-3">Danh mục</th>
                <th className="px-6 py-3">Tồn kho</th>
                <th className="px-6 py-3">Đơn giá</th>
                <th className="px-6 py-3">Vị trí</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Laptop Dell XPS 13', category: 'Điện tử', stock: 15, price: '$1,200', location: 'Khu A-01' },
                { name: 'Màn hình LG 27 inch', category: 'Điện tử', stock: 5, price: '$350', location: 'Khu A-05', low: true },
                { name: 'Bàn phím Cơ Keychron', category: 'Phụ kiện', stock: 42, price: '$80', location: 'Khu B-12' },
                { name: 'Chuột Logitech MX', category: 'Phụ kiện', stock: 8, price: '$99', location: 'Khu B-14', low: true },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Box className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-xs font-bold text-gray-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{item.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${item.low ? 'text-rose-500' : 'text-gray-800'}`}>
                        {item.stock}
                      </span>
                      {item.low && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-800">{item.price}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 font-medium">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
