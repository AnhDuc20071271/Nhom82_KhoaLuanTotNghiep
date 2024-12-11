import React, { useEffect, useState } from 'react';
import { fetchShippingConfirmations } from '@api/shippingConfirmationsApi';

const ShippingConfirmations: React.FC = () => {
  const [confirmations, setConfirmations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShippingConfirmations();
      setConfirmations(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Shipping Confirmations</h2>
      <ul>
        {confirmations.map((confirmation: any) => (
          <li key={confirmation.id}>{JSON.stringify(confirmation)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingConfirmations;
