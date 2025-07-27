import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'vendor' | 'supplier' | 'admin';
  phone?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo?: string }>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<{ success: boolean; redirectTo?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


const login = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) return { success: false };

    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    const redirectTo = data.user.role === 'admin' ? '/admin/dashboard' :
                      data.user.role === 'vendor' ? '/vendor/dashboard' : '/supplier/dashboard';
    return { success: true, redirectTo };
  } catch (err) {
    return { success: false };
  }
};

const register = async (userData: Omit<User, 'id'> & { password: string }) => {
  try {
    const res = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) return { success: false };

    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    const redirectTo = data.user.role === 'admin' ? '/admin/dashboard' :
                      data.user.role === 'vendor' ? '/vendor/dashboard' : '/supplier/dashboard';
    return { success: true, redirectTo };
  } catch (err) {
    return { success: false };
  }
};



  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};