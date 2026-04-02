import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { name: 'Quảng cáo', value: 45, color: '#3b82f6' },
  { name: 'Tiền lương', value: 35, color: '#06b6d4' },
  { name: 'Khác', value: 20, color: '#bfdbfe' },
];

export const ExpenseChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 font-bold text-base">Chi phí cao nhất</h3>
        <button className="flex items-center gap-1 bg-blue-600 text-white px-2 py-0.5 rounded-lg text-[9px] font-bold shadow-sm shadow-blue-100">
          Hôm nay
          <ChevronDown className="w-2.5 h-2.5" />
        </button>
      </div>

      <div className="flex-1 relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-sm font-medium text-gray-400">Tổng cộng</div>
          <div className="text-xl font-bold text-gray-800">100%</div>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-medium text-gray-500">{item.name}</span>
            </div>
            <span className="text-xs font-bold text-gray-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
