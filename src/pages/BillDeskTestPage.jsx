import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const BillDeskTestPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [testData, setTestData] = useState({
    orderId: '',
    amount: '100.00',
    customerInfo: 'TestCustomer'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPaymentData(null);

    try {
      // First, create a test order in our system
      console.log('Creating test order with data:', {
        amount: parseFloat(testData.amount),
        customerId: testData.customerInfo,
        testOrderId: testData.orderId || `TEST-${Date.now()}`
      });
      
      const response = await api.post('/api/test/orders', {
        amount: parseFloat(testData.amount),
        customerId: testData.customerInfo,
        testOrderId: testData.orderId || `TEST-${Date.now()}`
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create test order');
      }
      
      console.log('Test order created successfully:', response.data);
      const { orderId } = response.data.data;
      
      // Now initialize payment with BillDesk
      console.log('Initializing BillDesk payment for order:', orderId);
      const paymentResponse = await api.post(`/api/payments/billdesk/initialize/${orderId}`);
      
      if (!paymentResponse.data.success) {
        throw new Error(paymentResponse.data.message || 'Failed to initialize payment');
      }
      
      // Store payment data for form submission
      console.log('Payment initialized successfully:', paymentResponse.data);
      setPaymentData(paymentResponse.data.data);
      
    } catch (err) {
      console.error('BillDesk test error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleProcessPayment = () => {
    if (!paymentData) return;
    
    try {
      // Create a form to submit to BillDesk using the embedded SDK
      console.log('Creating form for BillDesk payment...');
      
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentData.paymentUrl;
      
      // Add the bdorderid parameter
      const bdorderidInput = document.createElement('input');
      bdorderidInput.type = 'hidden';
      bdorderidInput.name = 'bdorderid';
      bdorderidInput.value = paymentData.bdOrderId;
      form.appendChild(bdorderidInput);
      
      // Add the merchantid parameter
      const merchantidInput = document.createElement('input');
      merchantidInput.type = 'hidden';
      merchantidInput.name = 'merchantid';
      merchantidInput.value = paymentData.merchantId;
      form.appendChild(merchantidInput);
      
      // Add the rdata parameter
      const rdataInput = document.createElement('input');
      rdataInput.type = 'hidden';
      rdataInput.name = 'rdata';
      rdataInput.value = paymentData.rdata;
      form.appendChild(rdataInput);
      
      // Add the form to the body
      document.body.appendChild(form);
      
      // Submit the form to redirect to BillDesk
      console.log('Submitting payment form to BillDesk...');
      console.log('Payment URL:', paymentData.paymentUrl);
      console.log('BillDesk Order ID:', paymentData.bdOrderId);
      console.log('Merchant ID:', paymentData.merchantId);
      console.log('rdata length:', paymentData.rdata.length);
      form.submit();
    } catch (err) {
      console.error('BillDesk payment error:', err);
      setError(err.message || 'An error occurred during payment');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BillDesk Test Page</h1>
      <p className="mb-4">Use this page to test the BillDesk payment integration.</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {paymentData ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Payment Ready</h2>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p>Payment initialized successfully. Click the button below to proceed to BillDesk.</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p><strong>Order ID:</strong> {paymentData.orderId}</p>
            <p><strong>Order Number:</strong> {paymentData.orderNumber}</p>
            <p><strong>BillDesk Order ID:</strong> {paymentData.bdOrderId}</p>
            <p><strong>Transaction ID:</strong> {paymentData.transactionId}</p>
            <p><strong>Merchant ID:</strong> {paymentData.merchantId}</p>
          </div>
          
          <button
            onClick={handleProcessPayment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Proceed to Payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Order ID (optional):</label>
            <input
              type="text"
              name="orderId"
              value={testData.orderId}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Leave blank for auto-generated ID"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount:</label>
            <input
              type="text"
              name="amount"
              value={testData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter amount (e.g., 100.00)"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Customer Info:</label>
            <input
              type="text"
              name="customerInfo"
              value={testData.customerInfo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter customer info"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Processing...' : 'Initialize Payment'}
          </button>
        </form>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">BillDesk Integration Information</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>BillDesk UAT URL:</strong> {paymentData?.paymentUrl || 'https://uat1.billdesk.com/u2/web/v1_2/embeddedsdk'}</p>
          <p><strong>Order Create URL:</strong> https://uat.billdesk.com/pg/v1/merchant/BDUATV2APT/order/create</p>
          <p><strong>Integration Type:</strong> BillDesk API v1_2 Embedded SDK</p>
          <p><strong>Form Parameters:</strong> bdorderid, merchantid, rdata</p>
        </div>
      </div>
    </div>
  );
};

export default BillDeskTestPage;
