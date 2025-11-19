// src/pages/PaymentStatusPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/PaymentStatus.css';

const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const status = searchParams.get('status');
  const orderNumber = searchParams.get('orderNumber');
  const errorMessage = searchParams.get('message');

  useEffect(() => {
    // Simulate loading delay to show the processing state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
      case 'success':
        return {
          icon: '✓',
          title: 'Payment Successful!',
          message: `Your payment has been processed successfully.`,
          color: 'success',
          buttonText: 'View Order',
          buttonAction: () => navigate('/my-orders'),
        };
      case 'failed':
        return {
          icon: '✕',
          title: 'Payment Failed',
          message: errorMessage 
            ? decodeURIComponent(errorMessage) 
            : 'Unfortunately, your payment could not be processed.',
          color: 'error',
          buttonText: 'Try Again',
          buttonAction: () => navigate('/checkout'),
        };
      case 'pending':
        return {
          icon: '⏱',
          title: 'Payment Pending',
          message: 'Your payment is being processed. This may take a few minutes.',
          color: 'warning',
          buttonText: 'Go to Orders',
          buttonAction: () => navigate('/my-orders'),
        };
      case 'error':
      default:
        return {
          icon: '!',
          title: 'Payment Error',
          message: errorMessage 
            ? decodeURIComponent(errorMessage)
            : 'Unable to process payment. Please contact support if the issue persists.',
          color: 'warning',
          buttonText: 'Go Home',
          buttonAction: () => navigate('/'),
        };
    }
  };

  const config = getStatusConfig();

  if (loading) {
    return (
      <div className="payment-status-container">
        <div className="payment-status-card loading">
          <div className="spinner"></div>
          <h2>Processing Payment...</h2>
          <p>Please wait while we verify your payment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-status-container">
      <div className={`payment-status-card ${config.color}`}>
        <div className={`status-icon ${config.color}`}>
          <span>{config.icon}</span>
        </div>
        
        <h1 className="status-title">{config.title}</h1>
        
        {orderNumber && (
          <div className="order-details">
            <p className="order-number">Order Number: <strong>{orderNumber}</strong></p>
          </div>
        )}
        
        <p className="status-message">{config.message}</p>
        
        <div className="action-buttons">
          <button 
            className={`btn btn-${config.color}`}
            onClick={config.buttonAction}
          >
            {config.buttonText}
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>

        {status === 'failed' && (
          <div className="help-section">
            <p>Need help? <a href="/contact">Contact Support</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusPage;
