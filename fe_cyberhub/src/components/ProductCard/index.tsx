// src/components/ProductCard/index.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number; // Thêm ID sản phẩm
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  stock: number;
  nsx: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, discount, imageUrl, stock, nsx }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${id}`);
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

export default ProductCard;
