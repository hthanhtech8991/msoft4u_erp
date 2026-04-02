import React from 'react';
import { 
  ShoppingCart, 
  Users, 
  Target, 
  FileCheck, 
  Plus,
  Search,
  MoreVertical
} from 'lucide-react';

const Sales = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Quản lý Bán hàng</h1>
          <p className="text-xs text-gray-400">Quản lý khách hàng, cơ hội và đơn hàng</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Thêm cơ hội mới
        </button>
      </div>

      {/* Sales Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: 'Mới', count: 12, amount: '$120k', color: 'bg-blue-500' },
          { label: 'Đang đàm phán', count: 8, amount: '$85k', color: 'bg-amber-500' },
          { label: 'Chờ ký kết', count: 5, amount: '$210k', color: 'bg-violet-500' },
          { label: 'Thành công', count: 24, amount: '$1.2M', color: 'bg-emerald-500' },
        ].map((stage, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase">{stage.label}</span>
              <span className="text-[10px] font-bold bg-gray-50 px-2 py-0.5 rounded-full text-gray-400">{stage.count}</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{stage.amount}</div>
            <div className={`h-1 w-full ${stage.color} rounded-full mt-3 opacity-20`} />
          </div>
        ))}
      </div>

      {/* CRM List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm khách hàng..." 
              className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Users className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Target className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="p-2 space-y-2">
          {[
            { name: 'Nguyễn Văn A', company: 'Tech Solutions', value: '$12,000', stage: 'Đang đàm phán', avatar: '1' },
            { name: 'Trần Thị B', company: 'Green Garden', value: '$5,500', stage: 'Mới', avatar: '2' },
            { name: 'Lê Văn C', company: 'Global Logistics', value: '$25,000', stage: 'Chờ ký kết', avatar: '3' },
            { name: 'Phạm Minh D', company: 'Smart Home', value: '$8,200', stage: 'Đang đàm phán', avatar: '4' },
          ].map((contact, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800">{contact.name}</div>
                  <div className="text-[10px] text-gray-400">{contact.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-800">{contact.value}</div>
                  <div className="text-[10px] text-blue-500 font-medium">{contact.stage}</div>
                </div>
                <button className="p-1 text-gray-300 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;
