import React, { useEffect, useState } from 'react';
import { fetchShippers } from '@api/shippersApi';

const Shippers: React.FC = () => {
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShippers();
      setShippers(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Shippers</h2>
      <ul>
        {shippers.map((shipper: any) => (
          <li key={shipper.id}>{JSON.stringify(shipper)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Shippers;
