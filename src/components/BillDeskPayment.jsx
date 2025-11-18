import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }    from 'react-router-dom';
import api                          from '../utils/api';

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
          
          // If we have bdOrderId and rdata, use BillDesk Embedded SDK
          if (pd.bdOrderId && pd.merchantId) {
            console.log('Using BillDesk Embedded SDK with:', {
              bdOrderId: pd.bdOrderId,
              merchantId: pd.merchantId,
              rdata: pd.rdata ? 'present' : 'not present'
            });
            
            // Redirect to BillDesk payment page with order details
            const billDeskUrl = `${pd.paymentUrl}?bdorderid=${pd.bdOrderId}&mercid=${pd.merchantId}${pd.rdata ? `&rdata=${pd.rdata}` : ''}`;
            console.log('Redirecting to BillDesk:', billDeskUrl);
            window.location.href = billDeskUrl;
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
        setError(e.message);
      }
    })();
  }, [orderId]);

  if (error) {
    return (
      <div style={{ padding:'2rem', textAlign:'center' }}>
        <h2 style={{ color:'red' }}>Payment Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding:'2rem', textAlign:'center' }}>
      <h2>Redirecting to BillDesk…</h2>
    </div>
  );
}
