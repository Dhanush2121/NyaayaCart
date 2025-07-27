import * as React from 'react';
import  { useState } from 'react';
import { Navigation } from '../components/common/Navigation';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Package, ShoppingCart, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
}

export const SupplierDashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Fresh Onions', category: 'Vegetables', price: 30, stock: 500, unit: 'kg' },
    { id: '2', name: 'Juicy Tomatoes', category: 'Vegetables', price: 25, stock: 600, unit: 'kg' },
    { id: '3', name: 'Cabbage', category: 'Leafy Greens', price: 20, stock: 400, unit: 'piece' },
    { id: '4', name: 'Green Chillies', category: 'Spices', price: 80, stock: 150, unit: 'kg' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    unit: ''
  });

  const stats = {
    totalProducts: products.length,
    ordersReceived: 24,
    fulfillmentRate: 96
  };

  const categories = ['Vegetables', 'Leafy Greens', 'Spices', 'Roots', 'Pulses', 'Condiments'];
  const units = ['kg', 'gram', 'piece', 'bunch', 'packet', 'crate'];

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock && newProduct.unit) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        unit: newProduct.unit
      };
      
      setProducts([...products, product]);
      setNewProduct({ name: '', category: '', price: '', stock: '', unit: '' });
      setShowAddModal(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit
    });
    setShowAddModal(true);
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: newProduct.name,
              category: newProduct.category,
              price: Number(newProduct.price),
              stock: Number(newProduct.stock),
              unit: newProduct.unit
            }
          : p
      ));
      setEditingProduct(null);
      setNewProduct({ name: '', category: '', price: '', stock: '', unit: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
            <p className="text-gray-600">Total Products</p>
          </Card>
          
          <Card className="text-center">
            <ShoppingCart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">{stats.ordersReceived}</h3>
            <p className="text-gray-600">Orders Received</p>
          </Card>
          
          <Card className="text-center">
            <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">{stats.fulfillmentRate}%</h3>
            <p className="text-gray-600">Fulfillment Rate</p>
          </Card>
        </div>

        {/* Products Section */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
            <Button
              onClick={() => setShowAddModal(true)}
              icon={Plus}
            >
              Add Product
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Product Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-4 font-medium text-gray-900">{product.name}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">₹{product.price}/{product.unit}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        product.stock > 100 
                          ? 'bg-green-100 text-green-700' 
                          : product.stock > 50 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock} {product.unit}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingProduct(null);
          setNewProduct({ name: '', category: '', price: '', stock: '', unit: '' });
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <div className="space-y-4">
          <Input
            label="Product Name"
            value={newProduct.name}
            onChange={(value) => setNewProduct(prev => ({ ...prev, name: value }))}
            placeholder="Enter product name"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <Input
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(value) => setNewProduct(prev => ({ ...prev, price: value }))}
            placeholder="Enter price"
            required
          />

          <Input
            label="Stock Quantity"
            type="number"
            value={newProduct.stock}
            onChange={(value) => setNewProduct(prev => ({ ...prev, stock: value }))}
            placeholder="Enter stock quantity"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit <span className="text-red-500">*</span>
            </label>
            <select
              value={newProduct.unit}
              onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select unit</option>
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              className="flex-1"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setEditingProduct(null);
                setNewProduct({ name: '', category: '', price: '', stock: '', unit: '' });
              }}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
