import * as React from 'react';
import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Navigation } from '../components/common/Navigation';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  estimatedDelivery: string;
  description: string;
  image: string;
}

export const ProductListingPage: React.FC = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Updated supplier data
  const supplier = {
    id: supplierId,
    name: 'StreetFood Supply Co.',
    category: 'Food & Essentials'
  };

  // Updated product list relevant to street food vendors
  const products: Product[] = [
    {
      id: '1',
      name: 'Cooking Oil (Sunflower)',
      price: 110,
      stock: 200,
      unit: 'litre',
      estimatedDelivery: '1-2 days',
      description: 'Refined sunflower oil ideal for deep-frying and everyday cooking.',
      image: 'https://images.pexels.com/photos/5946992/pexels-photo-5946992.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      name: 'Burger Buns (Pack of 6)',
      price: 45,
      stock: 150,
      unit: 'pack',
      estimatedDelivery: 'Same day',
      description: 'Soft and fresh burger buns, perfect for street-style sandwiches and burgers.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      name: 'Masala Mix (Street Style)',
      price: 60,
      stock: 300,
      unit: 'packet',
      estimatedDelivery: '1-2 days',
      description: 'Flavorful spice mix specially blended for street food snacks like chaat, pani puri, etc.',
      image: 'https://images.pexels.com/photos/678414/pexels-photo-678414.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      name: 'Disposable Plates (100 pcs)',
      price: 120,
      stock: 80,
      unit: 'pack',
      estimatedDelivery: '2 days',
      description: 'Eco-friendly paper plates suitable for all types of street food serving.',
      image: 'https://images.pexels.com/photos/2290073/pexels-photo-2290073.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '5',
      name: 'LPG Gas Cylinder (Commercial)',
      price: 1250,
      stock: 20,
      unit: 'piece',
      estimatedDelivery: '1-3 days',
      description: 'Commercial grade LPG cylinder for food stall cooking needs.',
      image: 'https://images.pexels.com/photos/159320/gas-cylinder-lpg-cooking-gas-propane-159320.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '6',
      name: 'Paneer Cubes (1 kg)',
      price: 260,
      stock: 50,
      unit: 'kg',
      estimatedDelivery: '1 day',
      description: 'Fresh paneer cubes ideal for making rolls, frankies, and curry-based snacks.',
      image: 'https://images.pexels.com/photos/1306546/pexels-photo-1306546.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '7',
      name: 'Flour (Maida) - 5kg',
      price: 180,
      stock: 100,
      unit: 'bag',
      estimatedDelivery: '1-2 days',
      description: 'High-quality refined flour for making rolls, puris, samosas, and more.',
      image: 'https://images.pexels.com/photos/1670756/pexels-photo-1670756.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '8',
      name: 'Plastic Cups (200 pcs)',
      price: 95,
      stock: 90,
      unit: 'pack',
      estimatedDelivery: '2 days',
      description: 'Transparent plastic cups ideal for serving juices and cold beverages.',
      image: 'https://images.pexels.com/photos/1122539/pexels-photo-1122539.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const updateQuantity = (productId: string, change: number) => {
    const currentQuantity = quantities[productId] || 1;
    const newQuantity = Math.max(1, currentQuantity + change);
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      productName: product.name,
      price: product.price,
      supplierName: supplier.name,
      unit: product.unit,
      quantity
    });
    alert(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/vendor/dashboard')}
              variant="outline"
              icon={ArrowLeft}
            >
              Back to Suppliers
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{supplier.name}</h1>
              <p className="text-gray-600">{supplier.category} Supplies</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} hover className="flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-semibold text-blue-600">₹{product.price}/{product.unit}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Stock:</span>
                    <span className={`text-sm font-medium ${
                      product.stock > 100 ? 'text-green-600' :
                      product.stock > 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock} {product.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Delivery:</span>
                    <span className="text-sm font-medium text-emerald-600">{product.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-center space-x-3 mb-4">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantities[product.id] || 1}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full"
                icon={ShoppingCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
