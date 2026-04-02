import React from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { SmallStatCard } from '../components/dashboard/SmallStatCard';
import { CashFlowChart } from '../components/dashboard/CashFlowChart';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { ProfileCompletion } from '../components/profile/ProfileCompletion';
import { 
  CreditCard, 
  HandCoins, 
  ShoppingBag, 
  Scale, 
  Box, 
  Wrench, 
  Users, 
  UserCircle 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Bảng điều khiển</h1>
      </div>

      {/* Top Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Phải trả"
          amount="$23,738"
          change="6.9%"
          isPositive={true}
          icon={CreditCard}
          iconBg="bg-rose-50"
          iconColor="text-rose-400"
        />
        <StatCard 
          title="Phải thu"
          amount="$23,738"
          change="3.0%"
          isPositive={false}
          icon={HandCoins}
          iconBg="bg-amber-50"
          iconColor="text-amber-400"
        />
        <StatCard 
          title="Tổng doanh thu"
          amount="$23,738"
          change="6.9%"
          isPositive={true}
          icon={ShoppingBag}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-400"
        />
        <StatCard 
          title="Số dư hiện tại"
          amount="$23,738"
          change="5.2%"
          isPositive={false}
          icon={Scale}
          iconBg="bg-violet-50"
          iconColor="text-violet-400"
        />
      </div>

      {/* Second Row Small Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SmallStatCard 
          title="Sản phẩm"
          value="6321"
          icon={Box}
          iconBg="bg-rose-50"
          iconColor="text-rose-400"
        />
        <SmallStatCard 
          title="Dịch vụ"
          value="6321"
          icon={Wrench}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-400"
        />
        <SmallStatCard 
          title="Khách hàng"
          value="23k"
          icon={Users}
          iconBg="bg-blue-50"
          iconColor="text-blue-400"
        />
        <SmallStatCard 
          title="Người dùng"
          value="987k"
          icon={UserCircle}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-400"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CashFlowChart />
        </div>
        <div className="lg:col-span-1">
          <ExpenseChart />
        </div>
      </div>

      {/* Bottom Section */}
      <ProfileCompletion />
    </div>
  );
};

export default Dashboard;
