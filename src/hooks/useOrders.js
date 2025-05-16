import { useState } from 'react';
import api from '../api/api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async (params = {}) => {
    setLoading(true);
    try {
      const response = await api.get('/orders', { params });
      setOrders(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.message || 'Failed to delete order');
      throw err;
    }
  };

  const permanentlyDeleteOrder = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}/permanent`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.message || 'Failed to permanently delete order');
      throw err;
    }
  };

  const updateOrder = async (orderId, data) => {
    try {
      const response = await api.put(`/orders/${orderId}`, data);
      setOrders(orders.map(order => 
        order._id === orderId ? response.data.data : order
      ));
      return response.data.data;
    } catch (err) {
      setError(err.message || 'Failed to update order');
      throw err;
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch order');
      throw err;
    }
  };

  const bulkDeleteOrders = async (orderIds) => {
    try {
      await api.post('/orders/bulk-delete', { orderIds });
      setOrders(orders.filter(order => !orderIds.includes(order._id)));
    } catch (err) {
      setError(err.message || 'Failed to delete orders');
      throw err;
    }
  };

  const exportOrders = async (params = {}) => {
    try {
      const response = await api.get('/orders/export', { params });
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to export orders');
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    totalPages,
    fetchOrders,
    deleteOrder,
    permanentlyDeleteOrder,
    updateOrder,
    getOrderById,
    bulkDeleteOrders,
    exportOrders,
  };
}; 