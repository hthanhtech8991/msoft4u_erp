import React from 'react';
import { TrendingUp, TrendingDown, ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StatCardProps {
  title: string;
  amount: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export const StatCard = ({ title, amount, change, isPositive, icon: Icon, iconBg, iconColor }: StatCardProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-gray-500 text-xs font-medium mb-0.5">{title}</h3>
          <button className="flex items-center gap-1 text-blue-500 text-[10px] font-bold hover:text-blue-600">
            + Thêm mới
          </button>
        </div>
        <div className={cn("p-2 rounded-xl", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-xl font-bold text-gray-800 mb-1">{amount}</div>
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-bold",
              isPositive ? "text-emerald-500" : "text-rose-500"
            )}>
              {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {change}
            </div>
            <span className="text-gray-400 text-[10px] font-medium">Tuần này</span>
          </div>
        </div>
        
        <button className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[9px] font-bold border border-emerald-100">
          Hôm nay
          <ChevronDown className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  );
};
