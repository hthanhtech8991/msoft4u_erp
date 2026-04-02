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
  Button as AntButton,
  Card,
  Row,
  Col,
  Badge,
  Empty
} from 'antd';
import { 
  Package, 
  Box, 
  Plus,
  Search,
  Filter,
  X,
  ChevronDown,
  MapPin,
  Layers,
  Info,
  Edit3,
  Save,
  Grid,
  List as ListIcon,
  DollarSign,
  Barcode,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Điện tử', stock: 15, price: 1200, location: 'Khu A-01', description: 'Laptop cao cấp mỏng nhẹ, màn hình InfinityEdge.', image: 'https://picsum.photos/seed/laptop/400/300' },
  { id: 2, name: 'Màn hình LG 27 inch', category: 'Điện tử', stock: 5, price: 350, location: 'Khu A-05', low: true, description: 'Màn hình 4K IPS, hỗ trợ HDR10.', image: 'https://picsum.photos/seed/monitor/400/300' },
  { id: 3, name: 'Bàn phím Cơ Keychron', category: 'Phụ kiện', stock: 42, price: 80, location: 'Khu B-12', description: 'Bàn phím cơ không dây, hotswap.', image: 'https://picsum.photos/seed/keyboard/400/300' },
  { id: 4, name: 'Chuột Logitech MX', category: 'Phụ kiện', stock: 8, price: 99, location: 'Khu B-14', low: true, description: 'Chuột công thái học tốt nhất cho văn phòng.', image: 'https://picsum.photos/seed/mouse/400/300' },
  { id: 5, name: 'Tai nghe Sony WH', category: 'Âm thanh', stock: 25, price: 250, location: 'Khu C-02', description: 'Tai nghe chống ồn chủ động hàng đầu.', image: 'https://picsum.photos/seed/headphones/400/300' },
  { id: 6, name: 'Loa Marshall Stanmore', category: 'Âm thanh', stock: 3, price: 400, location: 'Khu C-05', low: true, description: 'Loa bluetooth phong cách cổ điển, âm thanh mạnh mẽ.', image: 'https://picsum.photos/seed/speaker/400/300' },
  { id: 7, name: 'iPad Pro M2', category: 'Máy tính bảng', stock: 12, price: 900, location: 'Khu A-03', description: 'Máy tính bảng mạnh mẽ nhất với chip M2.', image: 'https://picsum.photos/seed/tablet/400/300' },
  { id: 8, name: 'Apple Watch S9', category: 'Phụ kiện', stock: 18, price: 399, location: 'Khu B-01', description: 'Đồng hồ thông minh theo dõi sức khỏe chuyên sâu.', image: 'https://picsum.photos/seed/watch/400/300' },
];

const CATEGORIES = ['Tất cả', 'Điện tử', 'Phụ kiện', 'Âm thanh', 'Máy tính bảng'];

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Tất cả' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    form.setFieldsValue(product);
  };

  const handleUpdate = (values: any) => {
    message.success(`Đã cập nhật thông tin cho ${selectedProduct.name}`);
    setIsModalOpen(false);
  };

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
            <h1 className="text-xl font-bold text-gray-800">Danh mục sản phẩm</h1>
            <p className="text-xs text-gray-400">Quản lý thông tin chi tiết và danh mục hàng hóa</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white border border-gray-100 p-1 rounded-xl flex items-center gap-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewMode === 'grid' ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-50"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewMode === 'list' ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-50"
                )}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
            <AntButton type="primary" icon={<Plus className="w-3.5 h-3.5 mr-2 inline" />} size="large">
              Thêm sản phẩm mới
            </AntButton>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[300px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm sản phẩm theo tên, mã SKU..." 
                className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div className="relative w-48">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl py-2 px-3 text-xs outline-none appearance-none cursor-pointer pr-8"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Sắp xếp:</span>
            <select className="bg-transparent border-none text-xs font-bold text-gray-600 outline-none cursor-pointer">
              <option>Mới nhất</option>
              <option>Giá: Thấp đến Cao</option>
              <option>Giá: Cao đến Thấp</option>
              <option>Tên: A-Z</option>
            </select>
          </div>
        </div>

        {/* Product View */}
        {viewMode === 'grid' ? (
          <Row gutter={[16, 16]}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group cursor-pointer h-full flex flex-col"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative h-40 overflow-hidden bg-gray-50">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge count={product.category} style={{ backgroundColor: '#2563eb' }} />
                      </div>
                      {product.stock < 10 && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Sắp hết hàng
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-sm font-bold text-blue-600">${product.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mb-4 flex-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[11px] font-bold text-gray-600">Tồn: {product.stock}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[11px] font-medium text-gray-400">{product.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <div className="bg-white py-20 rounded-3xl border border-gray-100 flex flex-col items-center justify-center">
                  <Empty description="Không tìm thấy sản phẩm nào" />
                </div>
              </Col>
            )}
          </Row>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Sản phẩm</th>
                  <th className="px-6 py-3">Danh mục</th>
                  <th className="px-6 py-3">Mã SKU</th>
                  <th className="px-6 py-3">Đơn giá</th>
                  <th className="px-6 py-3">Tồn kho</th>
                  <th className="px-6 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    onClick={() => handleProductClick(product)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt="" 
                          className="w-10 h-10 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-bold text-gray-800 group-hover:text-blue-700">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-400">SKU-{product.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-800">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-800">{product.stock}</td>
                    <td className="px-6 py-4">
                      <Tag color={product.stock < 10 ? 'error' : 'success'}>
                        {product.stock < 10 ? 'Sắp hết hàng' : 'Còn hàng'}
                      </Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
        >
          {selectedProduct && (
            <Tabs defaultActiveKey="1" className="mt-4">
              <Tabs.TabPane 
                tab={<span className="flex items-center gap-2"><Info className="w-3.5 h-3.5" />Thông tin chung</span>} 
                key="1"
              >
                <div className="space-y-6 py-4">
                  <div className="flex items-start gap-6">
                    <img 
                      src={selectedProduct.image} 
                      alt="" 
                      className="w-32 h-32 rounded-2xl object-cover border border-gray-100"
                      referrerPolicy="no-referrer"
                    />
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
                    <Descriptions.Item label="Mã vạch"><Barcode className="w-4 h-4 inline mr-2" />893000123456</Descriptions.Item>
                    <Descriptions.Item label="Nhà cung cấp">TechSupply Co.</Descriptions.Item>
                  </Descriptions>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane 
                tab={<span className="flex items-center gap-2"><Edit3 className="w-3.5 h-3.5" />Chỉnh sửa</span>} 
                key="2"
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

export default Products;
