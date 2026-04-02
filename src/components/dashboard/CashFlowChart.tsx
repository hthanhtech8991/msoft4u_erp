import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'CN', value: 1200, color: '#3b82f6' },
  { name: 'T2', value: 1800, color: '#10b981' },
  { name: 'T3', value: 2500, color: '#f59e0b' },
  { name: 'T4', value: 2200, color: '#ef4444' },
  { name: 'T5', value: 3500, color: '#8b5cf6' },
  { name: 'T6', value: 2400, color: '#3b82f6' },
  { name: 'T7', value: 2000, color: '#f97316' },
];

export const CashFlowChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-bold text-base">Dòng tiền</h3>
        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
          {[
            { label: 'Tuần', value: 'Weekly' },
            { label: 'Tháng', value: 'Monthly' },
            { label: 'Năm', value: 'Yearly' }
          ].map((period) => (
            <button
              key={period.value}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                period.value === 'Weekly' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              ticks={[500, 1000, 2000, 5000]}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={32}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
