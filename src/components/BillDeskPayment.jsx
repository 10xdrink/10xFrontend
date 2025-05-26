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
        // 🔑 Make sure this matches your Express mount point:
        const res = await api.post(`/payments/billdesk/initialize/${orderId}`);
        console.log('initialize response:', res.data);

        if (!res.data.success) {
          throw new Error(res.data.message || 'Initialization failed');
        }

        const pd = res.data.data?.paymentData;
        if (!pd || !pd.paymentUrl || !pd.msg || !pd.checksum) {
          console.error('Bad payload:', res.data);
          throw new Error('Incomplete payment data');
        }

        // build & auto-submit the form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = pd.paymentUrl;
        form.target = '_self';
        form.acceptCharset = 'UTF-8';
        
        // Add the required fields for BillDesk
        const msgInput = document.createElement('input');
        msgInput.type = 'hidden';
        msgInput.name = 'msg';
        msgInput.value = pd.msg;
        form.appendChild(msgInput);
        
        // Add checksum field
        const checksumInput = document.createElement('input');
        checksumInput.type = 'hidden';
        checksumInput.name = 'checksum';
        checksumInput.value = pd.checksum;
        form.appendChild(checksumInput);
        
        // Append form to body and submit
        document.body.appendChild(form);
        console.log('Submitting form to BillDesk:', pd.paymentUrl);
        setTimeout(() => form.submit(), 100);
      } catch (e) {
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
