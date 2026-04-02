import React, { useState, useMemo } from 'react';
import { 
  Modal, 
  Tabs, 
  Descriptions, 
  Timeline, 
  Tag, 
  Input, 
  InputNumber, 
  Form, 
  message,
  ConfigProvider,
  Button as AntButton
} from 'antd';
import { 
  Package, 
  Box, 
  Truck, 
  RefreshCw, 
  AlertTriangle,
  Plus,
  Search,
  ArrowRight,
  Filter,
  X,
  ChevronDown,
  MapPin,
  Layers,
  History,
  Info,
  Edit3,
  Save
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Điện tử', stock: 15, price: 1200, location: 'Khu A-01', description: 'Laptop cao cấp mỏng nhẹ, màn hình InfinityEdge.' },
  { id: 2, name: 'Màn hình LG 27 inch', category: 'Điện tử', stock: 5, price: 350, location: 'Khu A-05', low: true, description: 'Màn hình 4K IPS, hỗ trợ HDR10.' },
  { id: 3, name: 'Bàn phím Cơ Keychron', category: 'Phụ kiện', stock: 42, price: 80, location: 'Khu B-12', description: 'Bàn phím cơ không dây, hotswap.' },
  { id: 4, name: 'Chuột Logitech MX', category: 'Phụ kiện', stock: 8, price: 99, location: 'Khu B-14', low: true, description: 'Chuột công thái học tốt nhất cho văn phòng.' },
  { id: 5, name: 'Tai nghe Sony WH', category: 'Âm thanh', stock: 25, price: 250, location: 'Khu C-02', description: 'Tai nghe chống ồn chủ động hàng đầu.' },
  { id: 6, name: 'Loa Marshall Stanmore', category: 'Âm thanh', stock: 3, price: 400, location: 'Khu C-05', low: true, description: 'Loa bluetooth phong cách cổ điển, âm thanh mạnh mẽ.' },
  { id: 7, name: 'iPad Pro M2', category: 'Máy tính bảng', stock: 12, price: 900, location: 'Khu A-03', description: 'Máy tính bảng mạnh mẽ nhất với chip M2.' },
  { id: 8, name: 'Apple Watch S9', category: 'Phụ kiện', stock: 18, price: 399, location: 'Khu B-01', description: 'Đồng hồ thông minh theo dõi sức khỏe chuyên sâu.' },
];

const MOCK_HISTORY = [
  { date: '2024-03-20 10:30', action: 'Nhập kho', quantity: '+10', user: 'Nguyễn Văn A', note: 'Nhập hàng định kỳ' },
  { date: '2024-03-18 14:20', action: 'Xuất kho', quantity: '-5', user: 'Trần Thị B', note: 'Xuất đơn hàng #SO123' },
  { date: '2024-03-15 09:00', action: 'Kiểm kê', quantity: '0', user: 'Lê Văn C', note: 'Khớp số lượng thực tế' },
  { date: '2024-03-10 16:45', action: 'Nhập kho', quantity: '+20', user: 'Nguyễn Văn A', note: 'Bổ sung tồn kho' },
];

const CATEGORIES = ['Tất cả', 'Điện tử', 'Phụ kiện', 'Âm thanh', 'Máy tính bảng'];
const LOCATIONS = ['Tất cả', 'Khu A', 'Khu B', 'Khu C'];

const Inventory = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [location, setLocation] = useState('Tất cả');
  const [stockStatus, setStockStatus] = useState('Tất cả');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Tất cả' || product.category === category;
      const matchesLocation = location === 'Tất cả' || product.location.startsWith(location);
      const matchesStock = stockStatus === 'Tất cả' || 
        (stockStatus === 'Sắp hết hàng' && product.stock < 10) ||
        (stockStatus === 'Còn hàng' && product.stock >= 10);

      return matchesSearch && matchesCategory && matchesLocation && matchesStock;
    });
  }, [search, category, location, stockStatus]);

  const resetFilters = () => {
    setSearch('');
    setCategory('Tất cả');
    setLocation('Tất cả');
    setStockStatus('Tất cả');
  };

  const handleRowClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    form.setFieldsValue(product);
  };

  const handleUpdate = (values: any) => {
    message.success(`Đã cập nhật thông tin cho ${selectedProduct.name}`);
    setIsModalOpen(false);
  };

  const activeFiltersCount = [
    category !== 'Tất cả',
    location !== 'Tất cả',
    stockStatus !== 'Tất cả'
  ].filter(Boolean).length;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 12,
        },
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quản lý Kho hàng</h1>
            <p className="text-xs text-gray-400">Theo dõi tồn kho, nhập xuất và kiểm kê</p>
          </div>
          <div className="flex gap-2">
            <AntButton icon={<RefreshCw className="w-3.5 h-3.5 mr-2 inline" />} size="large">
              Kiểm kê
            </AntButton>
            <AntButton type="primary" icon={<Plus className="w-3.5 h-3.5 mr-2 inline" />} size="large">
              Nhập kho mới
            </AntButton>
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
              <p className="text-[10px] text-rose-700">Có {INITIAL_PRODUCTS.filter(p => p.stock < 10).length} sản phẩm đang ở mức báo động dưới 10 đơn vị.</p>
            </div>
            <button 
              onClick={() => {
                setStockStatus('Sắp hết hàng');
                setShowFilters(true);
              }}
              className="ml-auto p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
            >
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

        {/* Stock List with Advanced Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-800">Danh mục sản phẩm</h3>
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm sản phẩm..." 
                    className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border",
                    showFilters || activeFiltersCount > 0
                      ? "bg-blue-50 text-blue-600 border-blue-100" 
                      : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"
                  )}
                >
                  <Filter className="w-3.5 h-3.5" />
                  Lọc nâng cao
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 pb-4 border-t border-gray-50">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                        <Layers className="w-3 h-3" />
                        Danh mục
                      </label>
                      <div className="relative">
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-xs outline-none appearance-none cursor-pointer"
                        >
                          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        Vị trí kho
                      </label>
                      <div className="relative">
                        <select 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-xs outline-none appearance-none cursor-pointer"
                        >
                          {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                        <Package className="w-3 h-3" />
                        Tình trạng tồn kho
                      </label>
                      <div className="flex gap-2">
                        {['Tất cả', 'Sắp hết hàng', 'Còn hàng'].map((status) => (
                          <button
                            key={status}
                            onClick={() => setStockStatus(status)}
                            className={cn(
                              "flex-1 py-2 rounded-xl text-[10px] font-bold transition-all border",
                              stockStatus === status 
                                ? "bg-blue-600 text-white border-blue-600" 
                                : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                            )}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pb-2">
                    <button 
                      onClick={resetFilters}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Xóa bộ lọc
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => handleRowClick(item)}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Box className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          </div>
                          <span className="text-xs font-bold text-gray-800 group-hover:text-blue-700">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{item.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${item.stock < 10 ? 'text-rose-500' : 'text-gray-800'}`}>
                            {item.stock}
                          </span>
                          {item.stock < 10 && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-800">${item.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-xs text-gray-400 font-medium">{item.location}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-8 h-8 text-gray-200" />
                        <p className="text-xs text-gray-400 font-medium">Không tìm thấy sản phẩm nào phù hợp</p>
                        <button 
                          onClick={resetFilters}
                          className="text-[10px] font-bold text-blue-600 hover:underline mt-1"
                        >
                          Xóa tất cả bộ lọc
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Detail Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-gray-800">
              <Box className="w-5 h-5 text-blue-600" />
              <span>Chi tiết sản phẩm</span>
            </div>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={700}
          centered
          className="product-detail-modal"
        >
          {selectedProduct && (
            <Tabs defaultActiveKey="1" className="mt-4">
              <Tabs.TabPane 
                tab={<span className="flex items-center gap-2"><Info className="w-3.5 h-3.5" />Thông tin</span>} 
                key="1"
              >
                <div className="space-y-6 py-4">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shrink-0">
                      <Box className="w-10 h-10 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-800 mb-1">{selectedProduct.name}</h2>
                      <div className="flex gap-2 mb-4">
                        <Tag color="blue">{selectedProduct.category}</Tag>
                        <Tag color={selectedProduct.stock < 10 ? 'error' : 'success'}>
                          {selectedProduct.stock < 10 ? 'Sắp hết hàng' : 'Còn hàng'}
                        </Tag>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>

                  <Descriptions bordered size="small" column={2}>
                    <Descriptions.Item label="Mã sản phẩm">SKU-{selectedProduct.id.toString().padStart(4, '0')}</Descriptions.Item>
                    <Descriptions.Item label="Vị trí">{selectedProduct.location}</Descriptions.Item>
                    <Descriptions.Item label="Tồn kho">{selectedProduct.stock} đơn vị</Descriptions.Item>
                    <Descriptions.Item label="Đơn giá">${selectedProduct.price.toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="Ngày nhập cuối">20/03/2024</Descriptions.Item>
                    <Descriptions.Item label="Nhà cung cấp">TechSupply Co.</Descriptions.Item>
                  </Descriptions>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane 
                tab={<span className="flex items-center gap-2"><History className="w-3.5 h-3.5" />Lịch sử</span>} 
                key="2"
              >
                <div className="py-6 px-2 max-h-[400px] overflow-y-auto">
                  <Timeline
                    items={MOCK_HISTORY.map((h, i) => ({
                      color: h.action === 'Nhập kho' ? 'green' : h.action === 'Xuất kho' ? 'blue' : 'gray',
                      children: (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-800">{h.action}</span>
                            <span className="text-[10px] text-gray-400">{h.date}</span>
                          </div>
                          <p className="text-[11px] text-gray-600">
                            Số lượng: <span className="font-bold">{h.quantity}</span> | Người thực hiện: {h.user}
                          </p>
                          <p className="text-[10px] text-gray-400 italic">Ghi chú: {h.note}</p>
                        </div>
                      ),
                    }))}
                  />
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane 
                tab={<span className="flex items-center gap-2"><Edit3 className="w-3.5 h-3.5" />Chỉnh sửa</span>} 
                key="3"
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdate}
                  className="py-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Danh mục">
                      <Input />
                    </Form.Item>
                    <Form.Item name="stock" label="Số lượng tồn kho">
                      <InputNumber className="w-full" />
                    </Form.Item>
                    <Form.Item name="price" label="Đơn giá ($)">
                      <InputNumber className="w-full" />
                    </Form.Item>
                    <Form.Item name="location" label="Vị trí kho" className="col-span-2">
                      <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả sản phẩm" className="col-span-2">
                      <Input.TextArea rows={3} />
                    </Form.Item>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <AntButton onClick={() => setIsModalOpen(false)}>Hủy</AntButton>
                    <AntButton type="primary" htmlType="submit" icon={<Save className="w-3.5 h-3.5 mr-2 inline" />}>
                      Lưu thay đổi
                    </AntButton>
                  </div>
                </Form>
              </Tabs.TabPane>
            </Tabs>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default Inventory;
