import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import { useOrders } from '../hooks/useOrders';
import { toast } from 'react-hot-toast';
import { CSVLink } from 'react-csv';
import EnlargedX from '../assets/EnlargedX.png';

const OrdersPage = () => {
  const { 
    orders, 
    loading, 
    error, 
    fetchOrders, 
    deleteOrder, 
    permanentlyDeleteOrder,
    updateOrder 
  } = useOrders();

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    loadOrders();
  }, [currentPage, searchQuery, statusFilter, sortField, sortOrder]);

  const loadOrders = async () => {
    try {
      await fetchOrders({
        page: currentPage,
        search: searchQuery,
        status: statusFilter,
        sortField,
        sortOrder
      });
    } catch (error) {
      toast.error('Failed to load orders');
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedOrders(checked ? orders.map(order => order._id) : []);
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      await loadOrders();
      toast.success('Order archived successfully');
    } catch (error) {
      toast.error('Failed to archive order');
    }
  };

  const handlePermanentDelete = async (orderId) => {
    try {
      await permanentlyDeleteOrder(orderId);
      await loadOrders();
      toast.success('Order permanently deleted');
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedOrders.map(id => permanentlyDeleteOrder(id)));
      setSelectedOrders([]);
      await loadOrders();
      toast.success(`${selectedOrders.length} orders deleted successfully`);
    } catch (error) {
      toast.error('Failed to delete selected orders');
    }
  };

  const handleExport = async () => {
    try {
      // Prepare export data
      const exportData = orders.map(order => ({
        'Order ID': order.orderId,
        'Customer Name': order.customer.name,
        'Customer Email': order.customer.email,
        'Amount': order.totalAmount,
        'Status': order.status,
        'Payment Status': order.paymentStatus,
        'Created At': new Date(order.createdAt).toLocaleString()
      }));
      setExportData(exportData);
      // Trigger CSV download
      document.getElementById('csvDownloadButton').click();
    } catch (error) {
      toast.error('Failed to export orders');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0821D2] to-[#0B0B45] rounded-lg shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="px-6 py-6 md:px-10 w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-bold text-white quantico-bold-italic">
              ORDERS
            </h1>
            <p className="text-blue-100 mt-2 pt-sans-regular">
              Manage and track customer orders efficiently!
            </p>
          </div>
          <div className="hidden md:flex w-full md:w-1/2 h-32 overflow-hidden items-center justify-end mr-24">
            <img
              className="w-32 object-cover transition-transform duration-[2000ms] ease-in-out transform hover:-translate-y-10"
              src={EnlargedX}
              alt="10X Logo"
            />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by Order ID or Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
          <select
            value={`${sortField}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortField(field);
              setSortOrder(order);
            }}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="totalAmount-desc">Amount: High to Low</option>
            <option value="totalAmount-asc">Amount: Low to High</option>
          </select>
        </div>
      </div>

      {/* Order List */}
      <OrderList
        orders={orders}
        onView={(order) => {/* Implement view handler */}}
        onUpdate={(order) => {/* Implement update handler */}}
        onDelete={handleDelete}
        onPermanentDelete={handlePermanentDelete}
        onExport={handleExport}
        onRefresh={loadOrders}
        selectedOrders={selectedOrders}
        onSelectOrder={handleSelectOrder}
        onSelectAll={handleSelectAll}
      />

      {/* Hidden CSV Download Link */}
      <CSVLink
        id="csvDownloadButton"
        data={exportData}
        filename={`orders-${new Date().toISOString().split('T')[0]}.csv`}
        className="hidden"
      />
    </div>
  );
};

export default OrdersPage; 