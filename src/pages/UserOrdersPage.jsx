// src/pages/UserOrdersPage.jsx

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // For formatting dates

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      _id: 'order123',
      createdAt: new Date().toISOString(),
      status: 'delivered',
      items: [
        { productName: 'Product 1', quantity: 2, price: 50 },
        { productName: 'Product 2', quantity: 1, price: 30 },
      ],
      totalAmount: 130,
    },
    {
      _id: 'order456',
      createdAt: new Date().toISOString(),
      status: 'processing',
      items: [
        { productName: 'Product 3', quantity: 3, price: 20 },
      ],
      totalAmount: 60,
    },
  ]); // Mock data for demonstration
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Commented out the fetch logic to display mock data
    // const fetchOrders = async () => {
    //   try {
    //     const response = await api.get('/orders/my-orders');
    //     setOrders(response.data.orders);
    //   } catch (err) {
    //     console.error('Error fetching orders:', err);
    //     setError('Failed to load orders. Please try again later.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading your orders...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="mb-2">
                <strong>Date:</strong> {format(new Date(order.createdAt), 'PPP')}
              </p>
              <p className="mb-2">
                <strong>Status:</strong>{' '}
                <span
                  className={`${
                    order.status === 'delivered' ? 'text-green-500' : 'text-yellow-500'
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <div className="mt-4">
                <h3 className="font-bold mb-1">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index} className="mb-1">
                      {item.productName} - {item.quantity} x ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4">
                <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
