import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut,
  ShoppingCart,
  User,
  Home,
  Package,
  FileText,
  Plus
} from 'lucide-react';

// ✅ Type for navigation items
interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const vendorNavItems: NavItem[] = [
    { path: '/vendor/dashboard', label: 'Home', icon: Home },
    { path: '/vendor/orders', label: 'Orders', icon: FileText },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: getTotalItems() },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const supplierNavItems: NavItem[] = [
    { path: '/supplier/dashboard', label: 'Dashboard', icon: Home },
    { path: '/supplier/add-product', label: 'Add Product', icon: Plus },
    { path: '/supplier/orders', label: 'Orders', icon: Package },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const adminNavItems: NavItem[] = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const navItems: NavItem[] =
    user.role === 'vendor'
      ? vendorNavItems
      : user.role === 'supplier'
      ? supplierNavItems
      : adminNavItems;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              B2B Connect
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
