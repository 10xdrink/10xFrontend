// src/pages/OrderHistory.jsx

import React from 'react';

const OrderHistory = () => {
  // Fetch user's order history from the backend or context
  const orders = [
    {
      id: 'ORD123456',
      date: '2023-10-01',
      total: 150.0,
      items: [
        { name: 'Product 1', quantity: 2, price: 50.0 },
        { name: 'Product 2', quantity: 1, price: 50.0 },
      ],
    },
    // Add more orders as needed
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
              <p className="mb-2">Date: {order.date}</p>
              <p className="mb-4">Total: ${order.total.toFixed(2)}</p>
              <h3 className="text-lg font-semibold mb-2">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
