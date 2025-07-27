// import React, { useState } from 'react';
import * as React from 'react';
import  { useState } from 'react';
import { Navigation } from '../components/common/Navigation';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Users, Package, ShoppingCart, TrendingUp, Eye, Edit, Trash2, Plus, UserCheck, UserX } from 'lucide-react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'vendor' | 'supplier';
  status: 'active' | 'suspended';
  joinDate: string;
  totalOrders: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplierName: string;
  status: 'active' | 'inactive';
}

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'orders'>('overview');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      fullName: 'John Vendor',
      email: 'vendor@example.com',
      role: 'vendor',
      status: 'active',
      joinDate: '2024-01-15',
      totalOrders: 25
    },
    {
      id: '2',
      fullName: 'Jane Supplier',
      email: 'supplier@example.com',
      role: 'supplier',
      status: 'active',
      joinDate: '2024-01-10',
      totalOrders: 48
    },
    {
      id: '3',
      fullName: 'Mike Farmer',
      email: 'mike@example.com',
      role: 'vendor',
      status: 'suspended',
      joinDate: '2024-01-20',
      totalOrders: 12
    }
  ]);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Wheat Seeds',
      category: 'Seeds',
      price: 25,
      stock: 1000,
      supplierName: 'Fresh Farm Supplies',
      status: 'active'
    },
    {
      id: '2',
      name: 'NPK Fertilizer',
      category: 'Fertilizers',
      price: 120,
      stock: 300,
      supplierName: 'AgriChem Ltd',
      status: 'active'
    },
    {
      id: '3',
      name: 'Drip Irrigation Kit',
      category: 'Equipment',
      price: 2500,
      stock: 50,
      supplierName: 'WaterTech Solutions',
      status: 'inactive'
    }
  ]);

  const stats = {
    totalUsers: users.length,
    totalProducts: products.length,
    totalOrders: 156,
    revenue: 2450000
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'overview', label: 'Overview', icon: TrendingUp },
            { key: 'users', label: 'Users', icon: Users },
            { key: 'products', label: 'Products', icon: Package },
            { key: 'orders', label: 'Orders', icon: ShoppingCart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 font-medium ${
                  activeTab === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
                <p className="text-gray-600">Total Users</p>
              </Card>
              
              <Card className="text-center p-6">
                <Package className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalProducts}</h3>
                <p className="text-gray-600">Total Products</p>
              </Card>
              
              <Card className="text-center p-6">
                <ShoppingCart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalOrders}</h3>
                <p className="text-gray-600">Total Orders</p>
              </Card>
              
              <Card className="text-center p-6">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">{formatPrice(stats.revenue)}</h3>
                <p className="text-gray-600">Total Revenue</p>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New user registered', user: 'John Doe', time: '2 hours ago', type: 'user' },
                  { action: 'Product added', user: 'Fresh Farm Supplies', time: '4 hours ago', type: 'product' },
                  { action: 'Order completed', user: 'Order #ORD123', time: '6 hours ago', type: 'order' },
                  { action: 'User suspended', user: 'Mike Farmer', time: '1 day ago', type: 'user' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' :
                        activity.type === 'product' ? 'bg-green-500' :
                        activity.type === 'order' ? 'bg-orange-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">User</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Join Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Orders</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{user.fullName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {new Date(user.joinDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{user.totalOrders}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              user.status === 'active'
                                ? 'text-red-600 hover:bg-red-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                          >
                            {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Product</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Stock</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Supplier</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-4 font-medium text-gray-900">{product.name}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{formatPrice(product.price)}</td>
                      <td className="py-4 px-4 text-gray-700">{product.stock}</td>
                      <td className="py-4 px-4 text-gray-700">{product.supplierName}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
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
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
            </div>
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Order management functionality coming soon...</p>
            </div>
          </Card>
        )}
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title={`User Details - ${selectedUser?.fullName}`}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-gray-900">{selectedUser.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="text-gray-900 capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedUser.status)}`}>
                  {selectedUser.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <p className="text-gray-900">{new Date(selectedUser.joinDate).toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Orders</label>
                <p className="text-gray-900">{selectedUser.totalOrders}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};