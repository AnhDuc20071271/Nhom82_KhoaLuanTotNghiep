import React, { useEffect, useState } from 'react';
import { fetchPromotions } from '@api/promotionsApi';

const PromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        // const promotionData = await fetchPromotions();
        // setPromotions(promotionData);
      } catch (error) {
        console.error('Error loading promotions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPromotions();
  }, []);

  if (loading) {
    return <p>Loading promotions...</p>;
  }

  return (
    <div>
      <h2>Promotions</h2>
      {promotions.map((promo, index) => (
        <div key={index}>
          <h3>{promo.title}</h3>
          <p>{promo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PromotionsPage;
