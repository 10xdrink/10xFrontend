import React, { useState } from 'react';
import { FiTrash2, FiEye, FiEdit2, FiArchive, FiDownload, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { format } from 'date-fns';
import Modal from './Common/Modal';
import Button from './Common/Button';
import toast from 'react-hot-toast';

const OrderList = ({ 
  orders, 
  onView, 
  onUpdate, 
  onDelete,
  onPermanentDelete,
  onExport,
  onRefresh,
  selectedOrders,
  onSelectOrder,
  onSelectAll 
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isPermanentDelete, setIsPermanentDelete] = useState(false);

  const handleDeleteClick = (order, permanent = false) => {
    setOrderToDelete(order);
    setIsPermanentDelete(permanent);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (isPermanentDelete) {
        await onPermanentDelete(orderToDelete._id);
        toast.success('Order permanently deleted');
      } else {
        await onDelete(orderToDelete._id);
        toast.success('Order archived');
      }
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    } catch (error) {
      toast.error(error.message || 'Failed to delete order');
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'processing': 'bg-blue-100 text-blue-800 border-blue-300',
      'shipped': 'bg-green-100 text-green-800 border-green-300',
      'delivered': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'cancelled': 'bg-red-100 text-red-800 border-red-300',
      'returned': 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Action Bar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onRefresh}
            className="bg-gradient-to-r from-[#0821D2] to-[#0B0B45] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
          <Button
            onClick={onExport}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export</span>
          </Button>
          {selectedOrders.length > 0 && (
            <Button
              onClick={() => handleDeleteClick(null, true)}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:shadow-lg transition-all"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Delete Selected ({selectedOrders.length})</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedOrders.length === orders.length}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedOrders.includes(order._id)}
                    onChange={() => onSelectOrder(order._id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.orderId}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.items.length} items
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.customer.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.customer.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    ₹{order.totalAmount}
                  </div>
                  {order.discount > 0 && (
                    <div className="text-sm text-green-600">
                      -₹{order.discount} discount
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  {order.paymentStatus && (
                    <div className="text-sm text-gray-500 mt-1">
                      Payment: {order.paymentStatus}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button
                    onClick={() => onView(order)}
                    className="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <FiEye className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => onUpdate(order)}
                    className="text-green-600 hover:text-green-900"
                    title="Edit Order"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(order)}
                    className="text-red-600 hover:text-red-900"
                    title="Archive Order"
                  >
                    <FiArchive className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(order, true)}
                    className="text-red-600 hover:text-red-900"
                    title="Permanently Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={isPermanentDelete ? "Confirm Permanent Deletion" : "Confirm Archive"}
      >
        <div className="p-6">
          <div className={`mb-6 p-4 rounded-lg ${
            isPermanentDelete ? 'bg-red-50 border-l-4 border-red-500' : 'bg-yellow-50 border-l-4 border-yellow-500'
          }`}>
            <p className="text-sm">
              {isPermanentDelete 
                ? "Are you sure you want to permanently delete this order? This action cannot be undone and will remove all associated data including refunds and returns."
                : "Are you sure you want to archive this order? The order will be moved to archives but can be restored later."
              }
            </p>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className={`px-4 py-2 text-white rounded-md ${
                isPermanentDelete 
                  ? 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800' 
                  : 'bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800'
              }`}
            >
              {isPermanentDelete ? 'Permanently Delete' : 'Archive'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderList; 