// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Navigation } from '../components/common/Navigation';
// import { Card } from '../components/common/Card';
// import { Button } from '../components/common/Button';
// import { Input } from '../components/common/Input';
// import { User, Camera } from 'lucide-react';

// export const ProfilePage: React.FC = () => {
//   const { user, updateProfile } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: user?.fullName || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     role: user?.role || 'vendor'
//   });

//   const handleSave = () => {
//     updateProfile(formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData({
//       fullName: user?.fullName || '',
//       email: user?.email || '',
//       phone: user?.phone || '',
//       role: user?.role || 'vendor'
//     });
//     setIsEditing(false);
//   };

//   const updateFormData = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
      
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Profile Picture Section */}
//           <div className="lg:col-span-1">
//             <Card className="text-center">
//               <div className="relative mx-auto w-32 h-32 mb-4">
//                 <div className="w-full h-full bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
//                   {user?.profilePicture ? (
//                     <img
//                       src={user.profilePicture}
//                       alt="Profile"
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <User className="w-16 h-16 text-white" />
//                   )}
//                 </div>
//                 <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors duration-200">
//                   <Camera className="w-4 h-4 text-gray-600" />
//                 </button>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900">{user?.fullName}</h3>
//               <p className="text-gray-600 capitalize">{user?.role}</p>
//             </Card>
//           </div>

//           {/* Profile Details Section */}
//           <div className="lg:col-span-2">
//             <Card>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
//                 {!isEditing && (
//                   <Button onClick={() => setIsEditing(true)} variant="outline">
//                     Edit Profile
//                   </Button>
//                 )}
//               </div>

//               <div className="space-y-6">
//                 <Input
//                   label="Full Name"
//                   value={formData.fullName}
//                   onChange={(value) => updateFormData('fullName', value)}
//                   disabled={!isEditing}
//                   required
//                 />

//                 <Input
//                   label="Email Address"
//                   type="email"
//                   value={formData.email}
//                   onChange={(value) => updateFormData('email', value)}
//                   disabled={!isEditing}
//                   required
//                 />

//                 <Input
//                   label="Phone Number"
//                   value={formData.phone}
//                   onChange={(value) => updateFormData('phone', value)}
//                   disabled={!isEditing}
//                 />

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Role
//                   </label>
//                   <select
//                     value={formData.role}
//                     onChange={(e) => updateFormData('role', e.target.value)}
//                     disabled={!isEditing}
//                     className={`w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${
//                       isEditing 
//                         ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
//                         : 'bg-gray-50 cursor-not-allowed'
//                     }`}
//                   >
//                     <option value="vendor">Vendor</option>
//                     <option value="supplier">Supplier</option>
//                   </select>
//                 </div>

//                 {isEditing && (
//                   <div className="flex space-x-4 pt-4">
//                     <Button onClick={handleSave} className="flex-1">
//                       Save Changes
//                     </Button>
//                     <Button onClick={handleCancel} variant="outline" className="flex-1">
//                       Cancel
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             {/* Account Statistics */}
//             <Card className="mt-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-4 bg-blue-50 rounded-lg">
//                   <h4 className="text-2xl font-bold text-blue-600">
//                     {user?.role === 'vendor' ? '12' : '48'}
//                   </h4>
//                   <p className="text-blue-600 text-sm">
//                     {user?.role === 'vendor' ? 'Orders Placed' : 'Products Listed'}
//                   </p>
//                 </div>
//                 <div className="text-center p-4 bg-emerald-50 rounded-lg">
//                   <h4 className="text-2xl font-bold text-emerald-600">
//                     {user?.role === 'vendor' ? '₹45,000' : '₹1,25,000'}
//                   </h4>
//                   <p className="text-emerald-600 text-sm">
//                     {user?.role === 'vendor' ? 'Total Spent' : 'Total Earned'}
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };






import * as React from 'react';
import  { useState } from 'react';import { useAuth } from '../contexts/AuthContext';
import { Navigation } from '../components/common/Navigation';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { User, Camera } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'vendor'
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'vendor'
    });
    setIsEditing(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <Card className="text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{user?.fullName}</h3>
              <p className="text-gray-600 capitalize">{user?.role}</p>
            </Card>
          </div>

          {/* Profile Details Section */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <Input
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(value) => updateFormData('fullName', value)}
                  placeholder="Enter full name"
                  required
                  disabled={!isEditing}
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => updateFormData('email', value)}
                  placeholder="Enter email"
                  required
                  disabled={!isEditing}
                />

                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(value) => updateFormData('phone', value)}
                  placeholder="Enter phone number"
                  disabled={!isEditing}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => updateFormData('role', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${
                      isEditing
                        ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        : 'bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <option value="vendor">Vendor</option>
                    <option value="supplier">Supplier</option>
                  </select>
                </div>

                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Account Statistics */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-blue-600">
                    {user?.role === 'vendor' ? '12' : '48'}
                  </h4>
                  <p className="text-blue-600 text-sm">
                    {user?.role === 'vendor' ? 'Orders Placed' : 'Products Listed'}
                  </p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-emerald-600">
                    {user?.role === 'vendor' ? '₹45,000' : '₹1,25,000'}
                  </h4>
                  <p className="text-emerald-600 text-sm">
                    {user?.role === 'vendor' ? 'Total Spent' : 'Total Earned'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
