import React, { useState, useRef, useEffect } from 'react';
import { Crown, ChevronDown, User, Settings, LogOut, Bell } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const tabs = [
  { label: 'Bảng điều khiển', active: true },
  { label: 'Liên hệ' },
  { label: 'Cá nhân' },
  { label: 'Doanh nghiệp' },
];

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'Hóa đơn mới', message: 'Bạn có một hóa đơn mới từ Công ty ABC cần duyệt.', time: '5 phút trước', type: 'invoice', color: 'text-emerald-500 bg-emerald-50' },
    { id: 2, title: 'Cảnh báo tồn kho', message: 'Laptop Dell XPS 13 sắp hết hàng trong kho A-01.', time: '1 giờ trước', type: 'inventory', color: 'text-rose-500 bg-rose-50' },
    { id: 3, title: 'Tin nhắn mới', message: 'Nguyễn Văn A đã gửi cho bạn một tin nhắn.', time: '3 giờ trước', type: 'message', color: 'text-blue-500 bg-blue-50' },
  ];

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-6 h-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
              "h-full px-1 text-xs font-semibold relative transition-colors",
              tab.active ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
            {tab.active && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className={cn(
              "p-2 rounded-xl transition-all relative group",
              isNotificationOpen ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-50 hover:text-blue-600"
            )}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full" />
          </button>

          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-800">Thông báo</h3>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">Đánh dấu đã đọc</button>
                </div>
                <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", notif.color)}>
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-gray-800 truncate">{notif.title}</span>
                          <span className="text-[9px] text-gray-400 font-medium shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{notif.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50/50 border-t border-gray-50 text-center">
                  <button className="text-[11px] font-bold text-gray-500 hover:text-blue-600 transition-colors">Xem tất cả thông báo</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-bold border border-amber-100 hover:bg-amber-100 transition-colors">
          <Crown className="w-3.5 h-3.5 fill-amber-600" />
          Nâng cấp Pro
        </button>

        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 pl-3 border-l border-gray-100 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andy" 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-none">Andy Warhol</div>
              <div className="text-[10px] text-gray-400 font-medium">Quản trị viên</div>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", isDropdownOpen && "rotate-180")} />
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="text-xs font-bold text-gray-800">Andy Warhol</p>
                  <p className="text-[10px] text-gray-400 truncate">andy.warhol@erp.com</p>
                </div>
                <div className="p-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <User className="w-3.5 h-3.5" />
                    Hồ sơ cá nhân
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                    Cài đặt tài khoản
                  </button>
                  <div className="my-1 border-t border-gray-50" />
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                    Đăng xuất
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
