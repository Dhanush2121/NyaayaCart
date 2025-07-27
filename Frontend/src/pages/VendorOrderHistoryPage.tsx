import * as React from 'react';
import { useState } from 'react';
import { Navigation } from '../components/common/Navigation';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Eye } from 'lucide-react';

interface Order {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  totalAmount: number;
  status: 'delivered' | 'pending' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    unit: string;
  }>;
}

export const VendorOrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      supplierId: '1',
      supplierName: 'Fresh Veggie Mart',
      date: '2024-01-15',
      totalAmount: 1800,
      status: 'delivered',
      items: [
        { name: 'Tomatoes', quantity: 30, price: 30, unit: 'kg' },
        { name: 'Onions', quantity: 30, price: 30, unit: 'kg' }
      ]
    },
    {
      id: 'ORD002',
      supplierId: '2',
      supplierName: 'EcoPack Disposables',
      date: '2024-01-18',
      totalAmount: 2200,
      status: 'pending',
      items: [
        { name: 'Paper Plates', quantity: 200, price: 5, unit: 'pcs' },
        { name: 'Plastic Spoons', quantity: 300, price: 2, unit: 'pcs' }
      ]
    },
    {
      id: 'ORD003',
      supplierId: '3',
      supplierName: 'Spice Traders Hub',
      date: '2024-01-10',
      totalAmount: 1200,
      status: 'cancelled',
      items: [
        { name: 'Chili Powder', quantity: 10, price: 60, unit: 'kg' },
        { name: 'Coriander Seeds', quantity: 10, price: 60, unit: 'kg' }
      ]
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredOrders = orders.filter(order => 
    !statusFilter || order.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Supplier</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Total Amount</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-4 font-medium text-blue-600">{order.id}</td>
                    <td className="py-4 px-4 text-gray-900">{order.supplierName}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {new Date(order.date).toLocaleDateString('en-IN')}
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
                      <Button
                        onClick={() => handleViewDetails(order)}
                        variant="outline"
                        size="sm"
                        icon={Eye}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found matching the selected filter.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Order ID:</span> {selectedOrder.id}</p>
                  <p><span className="text-gray-600">Date:</span> {new Date(selectedOrder.date).toLocaleDateString('en-IN')}</p>
                  <p><span className="text-gray-600">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Supplier Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Supplier:</span> {selectedOrder.supplierName}</p>
                  <p><span className="text-gray-600">Total Amount:</span> {formatPrice(selectedOrder.totalAmount)}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} {item.unit} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatPrice(item.quantity * item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
