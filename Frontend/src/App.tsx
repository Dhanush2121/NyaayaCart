import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Pages
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { VendorDashboardPage } from './pages/VendorDashboardPage';
import { SupplierDashboardPage } from './pages/SupplierDashboardPage';
import { ProductListingPage } from './pages/ProductListingPage';
import { CartPage } from './pages/CartPage';
import { VendorOrderHistoryPage } from './pages/VendorOrderHistoryPage';
import { SupplierOrdersManagementPage } from './pages/SupplierOrdersManagementPage';
import { ProfilePage } from './pages/ProfilePage';
import { Navigation } from './components/common/Navigation';

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: ('vendor' | 'supplier' | 'admin')[];
}> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  console.log('👤 Current User:', user);

  if (!user) return <Navigate to="/auth" replace />;

if (allowedRoles && !allowedRoles.includes(user?.role)) {
  const fallback =
    user?.role === 'admin'
      ? '/admin/dashboard'
      : user?.role === 'supplier'
      ? '/supplier/dashboard'
      : '/vendor/dashboard';

  return <Navigate to={fallback} replace />;
}


  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Navigation /> {/* ✅ Always visible at top */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
  path="/auth"
  element={
    user ? (
      (() => {
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'supplier') return <Navigate to="/supplier/dashboard" replace />;
        return <Navigate to="/vendor/dashboard" replace />;
      })()
    ) : (
      <AuthPage />
    )
  }
/>


        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Vendor Routes */}
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/:supplierId/products"
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <ProductListingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/orders"
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorOrderHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Supplier Routes */}
        <Route
          path="/supplier/dashboard"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <SupplierDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/add-product"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <SupplierDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/orders"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <SupplierOrdersManagementPage />
            </ProtectedRoute>
          }
        />

        {/* Shared Authenticated Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
