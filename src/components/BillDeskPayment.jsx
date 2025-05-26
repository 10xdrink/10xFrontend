// src/components/BillDeskPayment.jsx

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
        // Call your existing endpoint
        const res = await api.post(
          `/payments/billdesk/initialize/${orderId}`
        );
        console.log('initialize response:', res.data);

        if (!res.data.success) {
          throw new Error(res.data.message || 'Initialization failed');
        }

        // Pull directly out of data (server returns paymentUrl, msg, checksum flat)
        const {
          paymentUrl,
          msg,
          checksum
        } = res.data.data || {};

        if (!paymentUrl || !msg || !checksum) {
          console.error('Bad payload:', res.data);
          throw new Error('Incomplete payment data');
        }

        // Build & auto-submit the form
        const form = document.createElement('form');
        form.method        = 'POST';
        form.action        = paymentUrl;
        form.target        = '_self';
        form.acceptCharset = 'UTF-8';

        // msg
        const msgInput = document.createElement('input');
        msgInput.type  = 'hidden';
        msgInput.name  = 'msg';
        msgInput.value = msg;
        form.appendChild(msgInput);

        // checksum
        const checksumInput = document.createElement('input');
        checksumInput.type  = 'hidden';
        checksumInput.name  = 'checksum';
        checksumInput.value = checksum;
        form.appendChild(checksumInput);

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
