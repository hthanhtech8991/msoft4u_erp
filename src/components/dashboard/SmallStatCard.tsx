import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SmallStatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export const SmallStatCard = ({ title, value, icon: Icon, iconBg, iconColor }: SmallStatCardProps) => {
  return (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", iconBg)}>
          <Icon className={cn("w-4.5 h-4.5", iconColor)} />
        </div>
        <div>
          <h3 className="text-gray-500 text-[10px] font-medium mb-0.5">{title}</h3>
          <button className="text-blue-500 text-[9px] font-bold hover:text-blue-600 flex items-center gap-0.5">
            + Thêm mới
          </button>
        </div>
      </div>
      <div className="text-lg font-bold text-gray-800">{value}</div>
    </div>
  );
};
