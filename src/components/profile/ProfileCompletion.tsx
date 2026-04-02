import React from 'react';
import { Plus } from 'lucide-react';

export const ProfileCompletion = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-gray-800 font-bold text-base mb-0.5">Hoàn thiện hồ sơ của bạn</h3>
          <p className="text-gray-400 text-xs">Vui lòng trả lời các câu hỏi này để trải nghiệm đầy đủ các tính năng của hệ thống ERP</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100 hover:bg-blue-100 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Thêm mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question 1 */}
        <div className="space-y-3">
          <h4 className="text-gray-700 font-bold text-xs">Có bao nhiêu người trong công ty của bạn?</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Ít hơn 5', value: 'Less Than 5' },
              { label: '5-10', value: '5-10' },
              { label: '10-20', value: '10-20' },
              { label: 'Hơn 20', value: 'More Than 20' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="radio" name="people" className="peer sr-only" />
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-full peer-checked:border-blue-600 transition-all" />
                  <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-700 font-medium">{option.label}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors">
              Hỏi sau
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
              Lưu
            </button>
          </div>
        </div>

        {/* Question 2 */}
        <div className="space-y-4">
          <h4 className="text-gray-700 font-bold text-sm">Có bao nhiêu người trong công ty của bạn?</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Ít hơn 5', value: 'Less Than 5' },
              { label: '5-10', value: '5-10' },
              { label: '10-20', value: '10-20' },
              { label: 'Hơn 20', value: 'More Than 20' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="radio" name="people2" className="peer sr-only" />
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-full peer-checked:border-blue-600 transition-all" />
                  <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-700 font-medium">{option.label}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors">
              Hỏi sau
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
              Lưu
            </button>
          </div>
        </div>

        {/* Question 3 */}
        <div className="space-y-4">
          <h4 className="text-gray-700 font-bold text-sm">Có bao nhiêu người trong công ty của bạn?</h4>
          <input 
            type="text" 
            placeholder="Nhập nội dung...." 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors">
              Hỏi sau
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
