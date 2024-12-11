import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link để tạo liên kết tới trang chi tiết sản phẩm
import styles from './Laptop.module.css'; // Sử dụng CSS module
import SlickSlider from '../SlickSlider'; // Thêm lại SlickSlider

const LaptopList = () => {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get('http://localhost:8080/laptops'); // Đường dẫn API của bạn
        setLaptops(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu laptop:', error);
      }
    };

    fetchLaptops();
  }, []);

  // Hàm định dạng số thành dạng có dấu chấm hàng nghìn
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN'); // Định dạng số thành dạng VND có dấu chấm
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Laptop Bán Chạy</h2>
      <SlickSlider>
        {laptops.map((laptop) => (
          <div key={laptop.id} className={styles.laptopItem}>
            <Link to={`/laptops/${laptop.id}`}>
              <div className={styles.laptopCard}>
                <img src={laptop.imageUrl} alt={laptop.name} className={styles.laptopImage} />
                <h3>{laptop.name}</h3>
                <p className={styles.category}>Danh mục: {laptop.category}</p>
                <p>Giá: {formatPrice(laptop.price)} VND</p> {/* Sử dụng formatPrice */}
                <p>Giảm giá: {laptop.discount}%</p>
                {/* <p>Còn hàng: {laptop.stock}</p> */}
                <p>{laptop.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default LaptopList;
