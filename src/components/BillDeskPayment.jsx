import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }    from 'react-router-dom';
import api                          from '../utils/api';
import '../styles/BillDeskPayment.css';

export default function BillDeskPayment() {
  const { orderId } = useParams();
  const navigate    = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (!orderId) {
        return setError('Missing order ID');
      }
      try {
        console.log('Initializing BillDesk payment for order:', orderId);
        // Use the imported api utility instead of axios
        const res = await api.post(`/payments/billdesk/initialize/${orderId}`);
        console.log('Initialize response:', res.data);
        if (!res.data.success) {
          console.error('Payment initialization failed:', res.data.message);
          throw new Error(res.data.message || 'Initialization failed');
        }

        const pd = res.data.data?.paymentData;
        if (!pd || !pd.paymentUrl) {
          console.error('Bad payload from backend:', JSON.stringify(res.data, null, 2));
          throw new Error('Incomplete payment data from backend');
        }

        console.log('Payment data received:', pd);
        
        // ============================================================================
        // BROWSER CONSOLE LOG FOR BILLDESK SUPPORT - ALL 4 REQUIRED ITEMS
        // ============================================================================
        if (pd.debugInfo) {
          console.log('\n' + '='.repeat(80));
          console.log('🔍 BILLDESK TRANSACTION DETAILS FOR SUPPORT');
          console.log('='.repeat(80));
          console.log('\n3️⃣  TRACE ID & TIMESTAMP:');
          console.log('   BD-Traceid:      ', pd.debugInfo.traceId);
          console.log('   BD-Timestamp:    ', pd.debugInfo.timestamp);
          console.log('   Timestamp (IST): ', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
          console.log('\n4️⃣  REQUEST API URL:');
          console.log('   ', pd.debugInfo.requestUrl);
          console.log('\n2️⃣  JSON REQUEST STRING (Before Encryption):');
          console.log('━'.repeat(80));
          console.log(JSON.stringify(pd.debugInfo.jsonRequest, null, 2));
          console.log('━'.repeat(80));
          console.log('\n1️⃣  FINAL SIGNED ENCRYPTION STRING (JWS Token):');
          console.log('━'.repeat(80));
          console.log(pd.debugInfo.jwsToken);
          console.log('━'.repeat(80));
          console.log('\n📋 COPY THESE 4 ITEMS FOR BILLDESK SUPPORT:');
          console.log('   1. Final Signed Encryption String (JWS Token) - shown above');
          console.log('   2. JSON Request String - shown above');
          console.log('   3. Trace ID & Timestamp - shown above');
          console.log('   4. Request API URL - shown above');
          console.log('\n' + '='.repeat(80) + '\n');
        }
        
        // Handle different response types from BillDesk
        try {
          setError('Processing payment...');
          
          // If we got HTML form response, render it
          if (pd.formHtml) {
            console.log('Received HTML form from BillDesk');
            const container = document.createElement('div');
            container.innerHTML = pd.formHtml;
            document.body.innerHTML = '';
            document.body.appendChild(container);
            // Look for and auto-submit any forms in the HTML
            const forms = container.querySelectorAll('form');
            if (forms.length > 0) {
              forms[0].submit();
            }
            return;
          }
          
          // If we have bdOrderId, use BillDesk Embedded SDK with POST form
          if (pd.bdOrderId && pd.merchantId) {
            console.log('Using BillDesk Embedded SDK with:', {
              bdOrderId: pd.bdOrderId,
              merchantId: pd.merchantId,
              rdata: pd.rdata ? 'present' : 'not present'
            });
            
            // Create and submit POST form as per BillDesk documentation
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = pd.paymentUrl;
            form.style.display = 'none';
            
            // Helper to add hidden form fields
            const addField = (name, value) => {
              if (value) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                form.appendChild(input);
              }
            };
            
            // Add required fields as per BillDesk spec
            addField('bdorderid', pd.bdOrderId);    // Mandatory
            addField('merchantid', pd.merchantId);   // Mandatory (note: merchantid not mercid)
            addField('rdata', pd.rdata);             // Mandatory (encrypted order data)
            
            document.body.appendChild(form);
            console.log('Submitting POST form to BillDesk:', pd.paymentUrl);
            form.submit();
            return;
          }
          
          // If we have a direct redirect URL
          if (pd.isRedirect && pd.paymentUrl) {
            console.log('Redirecting to payment URL:', pd.paymentUrl);
            window.location.href = pd.paymentUrl;
            return;
          }
          
          // If none of the above, something went wrong
          throw new Error('Invalid payment data structure from backend');
        } catch (error) {
          console.error('Error processing BillDesk payment:', error);
          setError(`Payment processing error: ${error.message}`);
          
          // Log error details for BillDesk support
          if (pd.debugInfo) {
            console.error('\n' + '='.repeat(80));
            console.error('❌ BILLDESK PAYMENT ERROR');
            console.error('='.repeat(80));
            console.error('Error:', error.message);
            console.error('Debug Info available above for BillDesk support');
            console.error('='.repeat(80) + '\n');
          }
        }
      } catch (e) {
        console.error('BillDesk initialization error:', e);
        console.error('\n' + '='.repeat(80));
        console.error('❌ BILLDESK INITIALIZATION FAILED');
        console.error('='.repeat(80));
        console.error('Error Message:', e.message);
        console.error('Response Data:', res?.data);
        console.error('='.repeat(80) + '\n');
        setError(e.message);
      }
    })();
  }, [orderId]);

  if (error) {
    return (
      <div className="billdesk-payment-container">
        <h2 className="billdesk-payment-error-title">Payment Error</h2>
        <p className="billdesk-payment-message">{error}</p>
        <button className="billdesk-payment-button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="billdesk-payment-container">
      <h2 className="billdesk-payment-loading-title">Redirecting to BillDesk…</h2>
      <div className="billdesk-payment-spinner"></div>
    </div>
  );
}
