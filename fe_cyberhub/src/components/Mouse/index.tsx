import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link để tạo liên kết tới trang chi tiết sản phẩm
import styles from './Mouse.module.css'; // Sử dụng CSS module 
import SlickSlider from '../SlickSlider'; // Thêm lại SlickSlider

const MouseList = () => {
  const [mice, setMice] = useState([]);

  useEffect(() => {
    const fetchMice = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mice'); // Đường dẫn API cho sản phẩm chuột
        setMice(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu mouse:', error);
      }
    };

    fetchMice();
  }, []);

  // Hàm định dạng số thành dạng có dấu chấm hàng nghìn
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN'); // Định dạng số thành dạng VND có dấu chấm
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Chuột Bán Chạy</h2>
      <SlickSlider>
        {mice.map((mouse) => (
          <div key={mouse.id} className={styles.mouseItem}>
            <Link to={`/mice/${mouse.id}`}>
              <div className={styles.mouseCard}>
                <img src={mouse.imageUrl} alt={mouse.name} className={styles.mouseImage} />
                <h3>{mouse.name}</h3>
                <p className={styles.category}>Danh mục: {mouse.category}</p>
                <p>Giá: {formatPrice(mouse.price)} VND</p> {/* Sử dụng formatPrice */}
                <p>Giảm giá: {mouse.discount}%</p>
                {/* <p>Còn hàng: {mouse.stock}</p> */}
                <p>{mouse.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default MouseList;
