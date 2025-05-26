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
        const res = await api.post(`payments/billdesk/initialize/${orderId}`);
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
        [['msg', pd.msg], ['checksum', pd.checksum]].forEach(([name, value]) => {
          const inp = document.createElement('input');
          inp.type  = 'hidden';
          inp.name  = name;
          inp.value = value;
          form.appendChild(inp);
        });
        document.body.appendChild(form);
        form.submit();
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
