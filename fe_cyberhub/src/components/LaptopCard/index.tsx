// src/components/LaptopCard/index.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LaptopCard.module.css';

interface LaptopCardProps {
  id: number;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  stock: number;
  nsx: string;
}

const LaptopCard: React.FC<LaptopCardProps> = ({ id, name, price, discount, imageUrl, stock, nsx }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/laptops/${id}`); // Điều hướng đến trang chi tiết laptop
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <h2>{name}</h2>
      <p>Giá: {price.toLocaleString()}đ</p>
      <p>Giảm giá: {discount}%</p>
      <p>Còn hàng: {stock}</p>
      <p>Nhà sản xuất: {nsx}</p>
    </div>
  );
};

export default LaptopCard;
