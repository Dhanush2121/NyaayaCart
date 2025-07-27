// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Input } from '../components/common/Input';
// import { Button } from '../components/common/Button';
// import { Card } from '../components/common/Card';

// export const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     role: 'vendor' as 'vendor' | 'supplier',
//     phone: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { login, register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       let result = { success: false, redirectTo: '' };
      
//       if (isLogin) {
//         result = await login(formData.email, formData.password);
//       } else {
//         result = await register(formData);
//       }

//       if (result.success && result.redirectTo) {
//         navigate(result.redirectTo);
//       } else {
//         setError(isLogin ? 'Invalid credentials' : 'Registration failed');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateFormData = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex">
//       {/* Left Side - Branding */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-emerald-600 p-12 items-center justify-center">
//         <div className="text-white text-center">
//           <h1 className="text-5xl font-bold mb-6">B2B Connect</h1>
//           <p className="text-xl opacity-90 mb-8">Connecting Vendors with Trusted Suppliers</p>
//           <div className="w-32 h-1 bg-white opacity-50 mx-auto rounded-full"></div>
//         </div>
//       </div>

//       {/* Right Side - Auth Forms */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <Card className="p-8">
//             {/* Tab Switcher */}
//             <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className={`flex-1 py-2 text-center rounded-md transition-all duration-200 font-medium ${
//                   isLogin 
//                     ? 'bg-white text-blue-600 shadow-sm' 
//                     : 'text-gray-600 hover:text-blue-600'
//                 }`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className={`flex-1 py-2 text-center rounded-md transition-all duration-200 font-medium ${
//                   !isLogin 
//                     ? 'bg-white text-blue-600 shadow-sm' 
//                     : 'text-gray-600 hover:text-blue-600'
//                 }`}
//               >
//                 Register
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {!isLogin && (
//                 <>
//                   <Input
//                     label="Full Name"
//                     value={formData.fullName}
//                     onChange={(value) => updateFormData('fullName', value)}
//                     placeholder="Enter your full name"
//                     required
//                   />
                  
//                   <Input
//                     label="Phone Number"
//                     value={formData.phone}
//                     onChange={(value) => updateFormData('phone', value)}
//                     placeholder="Enter your phone number"
//                   />

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Role <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       value={formData.role}
//                       onChange={(e) => updateFormData('role', e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     >
//                       <option value="vendor">Vendor</option>
//                       <option value="supplier">Supplier</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               <Input
//                 label="Email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(value) => updateFormData('email', value)}
//                 placeholder="Enter your email"
//                 required
//               />

//               <Input
//                 label="Password"
//                 type="password"
//                 value={formData.password}
//                 onChange={(value) => updateFormData('password', value)}
//                 placeholder="Enter your password"
//                 required
//                 showPasswordToggle
//               />

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
//                   {error}
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full"
//                 size="lg"
//               >
//                 {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
//               </Button>
//             </form>

//             {isLogin && (
//               <div className="mt-6 text-center text-sm text-gray-600">
//                 <p>Demo credentials:</p>
//                 <p>Vendor: vendor@example.com / password</p>
//                 <p>Supplier: supplier@example.com / password</p>
//                 <p>Admin: admin@example.com / password</p>
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };



import * as React from 'react';
import  { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'vendor' as 'vendor' | 'supplier',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result: { success: boolean; redirectTo?: string } = { success: false };

      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData);
      }

      if (result.success) {
        navigate(result.redirectTo ?? '/'); // fallback if redirectTo is undefined
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-emerald-600 p-12 items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-6">B2B Connect</h1>
          <p className="text-xl opacity-90 mb-8">Connecting Vendors with Trusted Suppliers</p>
          <div className="w-32 h-1 bg-white opacity-50 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="p-8">
            {/* Tab Switcher */}
            <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-center rounded-md transition-all duration-200 font-medium ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-center rounded-md transition-all duration-200 font-medium ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <Input
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(value) => updateFormData('fullName', value)}
                    placeholder="Enter your full name"
                    required
                  />
                  
                  <Input
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(value) => updateFormData('phone', value)}
                    placeholder="Enter your phone number"
                  />

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => updateFormData('role', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="vendor">Vendor</option>
                      <option value="supplier">Supplier</option>
                    </select>
                  </div>
                </>
              )}

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => updateFormData('email', value)}
                placeholder="Enter your email"
                required
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => updateFormData('password', value)}
                placeholder="Enter your password"
                required
                showPasswordToggle
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
              </Button>
            </form>

            {isLogin && (
              <div className="mt-6 text-center text-sm text-gray-600">
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
