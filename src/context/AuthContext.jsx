import React, { createContext, useState, useContext } from 'react';
import API from '../axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminUser')));

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/admin-login', { email, password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
        toast.success('Welcome Admin!');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
