import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }    from 'react-router-dom';
import api                          from '../utils/api';

export default function BillDeskPayment() {
  const { orderId } = useParams();
  const nav         = useNavigate();
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      if (!orderId) { setErr('Missing order ID'); return; }
      try {
        const res = await api.post(`/payments/billdesk/initialize/${orderId}`);
        if (!res.data.success) throw new Error(res.data.message);
        const pd = res.data.data.paymentData;
        if (!pd.paymentUrl || !pd.msg || !pd.checksum) {
          throw new Error('Incomplete payment data');
        }
        // auto-submit form
        const f = document.createElement('form');
        f.method = 'POST';
        f.action = pd.paymentUrl;
        [['msg', pd.msg], ['checksum', pd.checksum]]
          .forEach(([n,v]) => {
            const i = document.createElement('input');
            i.type  = 'hidden';
            i.name  = n;
            i.value = v;
            f.appendChild(i);
          });
        document.body.appendChild(f);
        f.submit();
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [orderId]);

  if (err) {
    return (
      <div style={{ padding:'2rem', textAlign:'center' }}>
        <p style={{ color:'red' }}>Payment error: {err}</p>
        <button onClick={()=>nav(-1)}>Go Back</button>
      </div>
    );
  }
  return <p style={{ textAlign:'center', margin:'2rem auto',}}>Redirecting to BillDesk…</p>;
}
