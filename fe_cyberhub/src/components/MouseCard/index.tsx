import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MouseCard.module.css';

interface MouseCardProps {
  id: number;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  stock: number;
  nsx: string;
  connectionType: string;
}

const MouseCard: React.FC<MouseCardProps> = ({ id, name, price, discount, imageUrl, stock, nsx, connectionType }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/mice/${id}`); // Điều hướng đến trang chi tiết chuột
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <h2>{name}</h2>
      <p>Giá: {price.toLocaleString()}đ</p>
      <p>Giảm giá: {discount}%</p>
      <p>Còn hàng: {stock}</p>
      <p>Nhà sản xuất: {nsx}</p>
      <p>Kết Nối: {connectionType}</p> {/* Thêm thông tin kết nối */}
    </div>
  );
};

export default MouseCard;
