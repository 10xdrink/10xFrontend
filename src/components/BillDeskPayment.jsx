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
        setError('Missing order ID');
        return;
      }

      try {
        // 🔑 your mount point may vary — adjust to match your server
        const res = await api.post(`/payments/billdesk/initialize/${orderId}`);
        console.log('initialize response:', res.data);

        if (!res.data.success) {
          throw new Error(res.data.message || 'Initialization failed');
        }

        // **Now** data.paymentData is where we expect it
        const pd = res.data.data.paymentData || {};
        const { paymentUrl, msg, checksum } = pd;

        if (!paymentUrl || !msg || !checksum) {
          console.error('Bad payload:', res.data);
          throw new Error('Incomplete payment data');
        }

        // build & auto-submit the form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentUrl;
        form.target = '_self';
        form.acceptCharset = 'UTF-8';

        ['msg', 'checksum'].forEach((name) => {
          const input = document.createElement('input');
          input.type  = 'hidden';
          input.name  = name;
          input.value = name === 'msg' ? msg : checksum;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        console.log('Submitting form to BillDesk:', paymentUrl);
        setTimeout(() => form.submit(), 100);

      } catch (e) {
        setError(e.message);
      }
    })();
  }, [orderId, navigate]);

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
