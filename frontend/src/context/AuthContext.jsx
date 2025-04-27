import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await api.get('/api/auth/me');
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem('token');
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const register = async (userData) => {
    try {
      const res = await api.post('/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };
  
  const login = async (credentials) => {
    try {
      const res = await api.post('/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Logged out successfully');
  };
  
  const value = {
    user,
    loading,
    register,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};