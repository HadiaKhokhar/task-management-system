import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);
  
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/tasks');
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const createTask = async (taskData) => {
    try {
      const res = await api.post('/api/tasks', taskData);
      setTasks([...tasks, res.data]);
      toast.success('Task created successfully!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      return null;
    }
  };
  
  const updateTask = async (id, taskData) => {
    try {
      const res = await api.patch(`/api/tasks/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
      toast.success('Task updated successfully!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      return null;
    }
  };
  
  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      return false;
    }
  };
  
  const moveTask = async (id, newStatus) => {
    return await updateTask(id, { status: newStatus });
  };
  
  const value = {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask
  };
  
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};