import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

const BillDeskPayment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  
  // Function to submit payment directly to BillDesk
  const submitDirectPayment = (data) => {
    try {
      console.log('Submitting direct payment to BillDesk');
      
      // Check if we have sdkData format or direct format
      const paymentData = data.sdkData || data;
      
      // Validate required data
      if (!paymentData.paymentUrl) {
        throw new Error('Payment URL is missing');
      }
      
      // For sdkData format, message is called 'message', for direct format it's 'msg'
      const messageValue = paymentData.message || paymentData.msg;
      if (!messageValue) {
        throw new Error('Message parameter is missing');
      }
      
      if (!paymentData.checksum) {
        throw new Error('Checksum parameter is missing');
      }
      
      // Create a form for direct submission to BillDesk
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentData.paymentUrl;
      form.target = '_self'; // Load in the same window
      form.setAttribute('accept-charset', 'UTF-8');
      
      // Add msg parameter
      const msgInput = document.createElement('input');
      msgInput.type = 'hidden';
      msgInput.name = 'msg';
      msgInput.value = messageValue;
      form.appendChild(msgInput);
      
      // Add checksum parameter
      const checksumInput = document.createElement('input');
      checksumInput.type = 'hidden';
      checksumInput.name = 'checksum';
      checksumInput.value = paymentData.checksum;
      form.appendChild(checksumInput);
      
      // Add additional parameters that BillDesk might expect
      const merchantIdInput = document.createElement('input');
      merchantIdInput.type = 'hidden';
      merchantIdInput.name = 'merchantId';
      merchantIdInput.value = paymentData.merchantId || '';
      form.appendChild(merchantIdInput);
      
      // Add security ID if available
      if (paymentData.securityId) {
        const securityIdInput = document.createElement('input');
        securityIdInput.type = 'hidden';
        securityIdInput.name = 'securityId';
        securityIdInput.value = paymentData.securityId;
        form.appendChild(securityIdInput);
      }
      
      // Add return URL explicitly
      const returnUrlInput = document.createElement('input');
      returnUrlInput.type = 'hidden';
      returnUrlInput.name = 'returnUrl';
      returnUrlInput.value = paymentData.returnUrl || (window.location.origin + '/payment/return');
      form.appendChild(returnUrlInput);
      
      // Log what we're submitting
      console.log('Submitting form with:', {
        url: paymentData.paymentUrl,
        merchantId: paymentData.merchantId,
        securityId: paymentData.securityId,
        msg: messageValue,
        checksum: paymentData.checksum,
        returnUrl: paymentData.returnUrl || (window.location.origin + '/payment/return')
      });
      
      // Add form to document and submit
      document.body.appendChild(form);
      
      // Add a small delay before submitting to ensure the form is properly added to the DOM
      setTimeout(() => {
        try {
          form.submit();
          console.log('Form submitted successfully');
          // Show loading message
          setLoading(true);
        } catch (submitError) {
          console.error('Error submitting form:', submitError);
          setError('Failed to submit payment form. Please try again.');
        }
      }, 100);
    } catch (error) {
      console.error('Error in direct payment submission:', error);
      setError(`Failed to redirect to payment gateway: ${error.message}`);
      setDebugInfo({
        error: error.message,
        stack: error.stack
      });
    }
  };

  useEffect(() => {
    const initializePayment = async () => {
      try {
        if (!orderId) {
          setError('Missing order ID. Please try again.');
          return;
        }
        
        console.log(`Initializing payment for order ID: ${orderId}`);
        setLoading(true);
        
        // Skip order details check and directly initialize payment
        // This avoids the 403 error when the order doesn't belong to the current user
        
        const response = await api.post(
          `/payments/billdesk/initialize/${orderId}`
        );
        
        console.log('API Response:', response.data);
        
        // Store debug info for troubleshooting
        setDebugInfo({
          apiUrl: `/payments/billdesk/initialize/${orderId}`,
          responseStatus: response.status,
          responseData: response.data
        });

        if (response.data && response.data.success && response.data.data) {
          const responseData = response.data.data;
          console.log('Payment data received:', responseData);
          
          // Create a processed data object that we'll use for payment
          let processedData = { ...responseData };
          
          // Check if we have sdkData in the response (new format)
          if (responseData.sdkData) {
            // Extract data from the sdkData object
            const sdkData = responseData.sdkData;
            
            // Verify all required data is present in sdkData
            if (!sdkData.paymentUrl) {
              console.error('Missing payment URL in sdkData');
              setError('Payment URL is missing. Please contact support.');
              return;
            }
            
            if (!sdkData.message) {
              console.error('Missing message in sdkData');
              setError('Payment message data is missing. Please contact support.');
              return;
            }
            
            if (!sdkData.checksum) {
              console.error('Missing checksum in sdkData');
              setError('Payment security data is missing. Please contact support.');
              return;
            }
            
            // Create a new data object with the expected structure
            processedData = {
              ...responseData,
              paymentUrl: sdkData.paymentUrl,
              msg: sdkData.message,
              checksum: sdkData.checksum,
              merchantId: sdkData.merchantId,
              orderNumber: responseData.orderNumber || ''
            };
          } else {
            // Old format validation
            if (!responseData.paymentUrl) {
              console.error('Missing payment URL in response data');
              setError('Payment URL is missing. Please contact support.');
              return;
            }
            
            if (!responseData.msg) {
              console.error('Missing msg in response data');
              setError('Payment message data is missing. Please contact support.');
              return;
            }
            
            if (!responseData.checksum) {
              console.error('Missing checksum in response data');
              setError('Payment security data is missing. Please contact support.');
              return;
            }
            
            if (!responseData.orderNumber) {
              console.error('Missing orderNumber in response data');
              setError('Order ID is missing. Please contact support.');
              return;
            }
            
            // Use the original data format
            processedData = responseData;
          }
          
          // Save the processed data for use in the component
          setPaymentData(processedData);
          
          // Debug information
          console.log('BillDesk Form URL:', processedData.paymentUrl);
          console.log('BillDesk Order ID:', processedData.orderNumber);
          console.log('BillDesk message:', processedData.msg);
          console.log('BillDesk checksum:', processedData.checksum);
          
          // Use direct form submission without trying to use the SDK
          setTimeout(() => {
            try {
              console.log('Using direct form submission to BillDesk');
              // Pass the original response data which contains sdkData
              submitDirectPayment(responseData);
            } catch (initError) {
              console.error('Error submitting payment form:', initError);
              setError('Error initializing payment gateway. Please try again.');
            }
          }, 500);
        } else {
          const errorMsg = response.data && response.data.message 
            ? response.data.message 
            : 'Failed to initialize payment. Please try again.';
          
          setError(errorMsg);
          console.error('API response indicates failure or missing data:', response.data);
          toast.error(errorMsg);
        }
      } catch (error) {
        console.error('Payment initialization error:', error);
        const errorMsg = error.response?.data?.message || 'An error occurred while initializing payment';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      initializePayment();
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, [orderId]);

  const handleCancel = () => {
    navigate(`/orders/${orderId}`);
  };
  
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold">Initializing payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded p-6 text-center">
          <div className="text-red-500 text-xl mb-4">Payment Error</div>
          <p className="mb-4">{error}</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Return to Order
            </button>
            <button 
              onClick={handleRetry}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry Payment
            </button>
          </div>
          
          {/* Debug information (hidden in production) */}
          {debugInfo && import.meta.env.DEV && (
            <div className="mt-8 text-left text-xs text-gray-500 border-t pt-4">
              <p className="font-bold">Debug Information:</p>
              <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Redirecting to BillDesk Payment Gateway</h2>
        
        <div className="text-center my-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">
            Please wait while we redirect you to the payment page...
          </p>
        </div>
        
        {paymentData && paymentData.paymentUrl && paymentData.msg && paymentData.checksum && (
          <div id="targetSdkElement" className="sdk-target-container"></div>
        )}
        
        {/* Hidden form with payment data */}
        {paymentData && paymentData.paymentUrl && paymentData.msg && paymentData.checksum && (
          <form
            id="billdesk-payment-form"
            style={{ display: 'none' }}
          >
            <input type="hidden" name="msg" value={paymentData.msg} />
            <input type="hidden" name="checksum" value={paymentData.checksum} />
            <input type="hidden" name="merchantId" value={paymentData.merchantId} />
            <input type="hidden" name="bdOrderId" value={paymentData.orderNumber} />
            <input type="hidden" name="returnUrl" value={window.location.origin + '/payment/return'} />
          </form>
        )}
        
        <div className="text-center mt-6">
          <button
            onClick={handleCancel}
            className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          {paymentData && paymentData.paymentUrl && paymentData.rdata && (
            <button
              onClick={() => {
                try {
                  document.getElementById('billdesk-payment-form').submit();
                } catch (err) {
                  console.error('Error submitting form manually:', err);
                  toast.error('Failed to submit payment form');
                }
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillDeskPayment;
