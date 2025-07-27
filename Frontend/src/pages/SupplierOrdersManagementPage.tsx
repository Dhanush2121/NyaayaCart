import * as React from 'react';
import  { useState } from 'react';
import { Navigation } from '../components/common/Navigation';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Check, X, Truck } from 'lucide-react';

interface Order {
  id: string;
  vendorId: string;
  vendorName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    unit: string;
  }>;
  totalAmount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'delivered';
  date: string;
}

export const SupplierOrdersManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
  {
    id: 'ORD201',
    vendorId: '1',
    vendorName: 'FreshMart Suppliers',
    items: [
      { name: 'Onions', quantity: 100, price: 20, unit: 'kg' },
      { name: 'Tomatoes', quantity: 80, price: 18, unit: 'kg' }
    ],
    totalAmount: 3640,
    status: 'pending',
    date: '2024-01-20'
  },
  {
    id: 'ORD202',
    vendorId: '2',
    vendorName: 'LocalVeg Wholesalers',
    items: [
      { name: 'Cabbages', quantity: 60, price: 15, unit: 'kg' }
    ],
    totalAmount: 900,
    status: 'accepted',
    date: '2024-01-19'
  },
  {
    id: 'ORD203',
    vendorId: '3',
    vendorName: 'DailyFresh Hub',
    items: [
      { name: 'Green Chilies', quantity: 40, price: 35, unit: 'kg' },
      { name: 'Garlic', quantity: 25, price: 60, unit: 'kg' }
    ],
    totalAmount: 2900,
    status: 'delivered',
    date: '2024-01-18'
  }
]);


  const todayOrders = orders.filter(order => {
    const today = new Date().toDateString();
    const orderDate = new Date(order.date).toDateString();
    return today === orderDate;
  }).length;

  const updateOrderStatus = (orderId: string, newStatus: 'accepted' | 'rejected' | 'delivered') => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Box */}
        <Card className="mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Today's Orders</h2>
            <p className="text-4xl font-bold text-blue-600">{todayOrders}</p>
            <p className="text-gray-600">New orders received today</p>
          </div>
        </Card>

        {/* Orders Table */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Incoming Orders</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Vendor Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Items</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Total Amount</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-4 font-medium text-blue-600">{order.id}</td>
                    <td className="py-4 px-4 text-gray-900">{order.vendorName}</td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-600 ml-2">
                              ({item.quantity} {item.unit})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'accepted')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                              title="Accept Order"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'rejected')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Reject Order"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="Mark as Delivered"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};