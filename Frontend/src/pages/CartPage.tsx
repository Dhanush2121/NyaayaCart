import * as React from 'react';
import  { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Navigation } from '../components/common/Navigation';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Plus, Minus, Trash2, CreditCard } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    // Mock order placement
    setOrderPlaced(true);
    setShowOrderModal(true);
    clearCart();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <CreditCard className="w-24 h-24 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Button onClick={() => window.history.back()}>
              Continue Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.productName}</h3>
                    <p className="text-gray-600">from {item.supplierName}</p>
                    <p className="text-blue-600 font-medium">
                      {formatPrice(item.price)} per {item.unit}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-medium w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total for this item */}
                    <div className="text-right min-w-[100px]">
                      <p className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{getTotalItems()}</span>
                </div>
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span>UPI Payment</span>
                  </label>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full"
                size="lg"
              >
                Place Order
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title="Order Confirmed!"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your order has been placed successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Order ID: #ORD{Date.now().toString().slice(-6)}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You will receive a confirmation email shortly with order details and tracking information.
          </p>
          <Button onClick={() => setShowOrderModal(false)} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </Modal>
    </div>
  );
};