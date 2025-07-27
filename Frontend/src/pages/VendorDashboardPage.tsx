import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Navigation } from '../components/common/Navigation';
import { Star, MapPin, Eye, ShoppingCart } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  priceRange: string;
  image: string;
}

export const VendorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    priceRange: ''
  });

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Fresh Veggie Mart',
      category: 'Vegetables',
      rating: 4.9,
      location: 'Mumbai',
      priceRange: '₹100-500',
      image: 'https://images.pexels.com/photos/1428267/pexels-photo-1428267.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      name: 'Spice Traders Hub',
      category: 'Spices & Condiments',
      rating: 4.7,
      location: 'Delhi',
      priceRange: '₹200-1500',
      image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      name: 'EcoPack Disposables',
      category: 'Disposables & Packaging',
      rating: 4.6,
      location: 'Bangalore',
      priceRange: '₹300-1200',
      image: 'https://images.pexels.com/photos/6419566/pexels-photo-6419566.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      name: 'Dairy Fresh Supplies',
      category: 'Dairy Products',
      rating: 4.8,
      location: 'Chennai',
      priceRange: '₹250-900',
      image: 'https://images.pexels.com/photos/6061842/pexels-photo-6061842.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '5',
      name: 'Oil Depot & Grains',
      category: 'Cooking Oil & Grains',
      rating: 4.5,
      location: 'Kolkata',
      priceRange: '₹400-2500',
      image: 'https://images.pexels.com/photos/4199291/pexels-photo-4199291.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '6',
      name: 'Chilly & Onion Supply',
      category: 'Bulk Veg Supplies',
      rating: 4.6,
      location: 'Pune',
      priceRange: '₹150-1000',
      image: 'https://images.pexels.com/photos/4198025/pexels-photo-4198025.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const categories = [
    'Vegetables',
    'Spices & Condiments',
    'Dairy Products',
    'Disposables & Packaging',
    'Cooking Oil & Grains',
    'Bulk Veg Supplies'
  ];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune'];
  const priceRanges = ['₹0-500', '₹500-1500', '₹1500-3000', '₹3000+'];

  const filteredSuppliers = suppliers.filter(supplier => {
    return (!filters.category || supplier.category === filters.category) &&
           (!filters.location || supplier.location === filters.location) &&
           (!filters.priceRange || supplier.priceRange.includes(filters.priceRange.split('-')[0]));
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Prices</option>
                    {priceRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={() => setFilters({ category: '', location: '', priceRange: '' })}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Trusted Suppliers</h2>
              <p className="text-gray-600">{filteredSuppliers.length} suppliers found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSuppliers.map(supplier => (
                <Card key={supplier.id} hover className="group">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                      src={supplier.image}
                      alt={supplier.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{supplier.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Category:</span>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {supplier.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span className="ml-2">Rating</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{supplier.location}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Price Range:</span>
                      <span className="ml-2">{supplier.priceRange}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/supplier/${supplier.id}/products`)}
                    className="w-full"
                    icon={Eye}
                  >
                    View Products
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/cart')}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
      >
        <ShoppingCart className="w-6 h-6" />
      </button>
    </div>
  );
};
