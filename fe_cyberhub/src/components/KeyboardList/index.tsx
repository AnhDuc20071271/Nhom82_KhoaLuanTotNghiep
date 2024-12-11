import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link để tạo liên kết tới trang chi tiết sản phẩm
import styles from './Keyboard.module.css'; // Sử dụng CSS module
import SlickSlider from '../SlickSlider'; // Thêm SlickSlider

const KeyboardList = () => {
  const [keyboards, setKeyboards] = useState([]);

  useEffect(() => {
    const fetchKeyboards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/keyboards'); // Đường dẫn API của bạn
        setKeyboards(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu keyboard:', error);
      }
    };

    fetchKeyboards();
  }, []);

  // Hàm định dạng số thành dạng có dấu chấm hàng nghìn
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN'); // Định dạng số thành dạng VND có dấu chấm
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Bàn phím Bán Chạy</h2>
      <SlickSlider> {/* Thêm SlickSlider để bao quanh các sản phẩm */}
        {keyboards.map((keyboard) => (
          <div key={keyboard.id} className={styles.keyboardItem}>
            <Link to={`/keyboards/${keyboard.id}`}> {/* Link để chuyển đến trang chi tiết sản phẩm */}
              <div className={styles.keyboardCard}>
                <img src={keyboard.imageUrl} alt={keyboard.name} className={styles.keyboardImage} />
                <h3>{keyboard.name}</h3>
                <p className={styles.category}>Danh mục: {keyboard.category}</p>
                <p>Giá: {formatPrice(keyboard.price)} VND</p> {/* Sử dụng formatPrice để định dạng giá */}
                <p>Giảm giá: {keyboard.discount}%</p>
                {/* <p>Còn hàng: {keyboard.stock}</p> */}
                <p>{keyboard.description}</p>
              </div>
            </Link> {/* Kết thúc Link */}
          </div>
        ))}
      </SlickSlider> {/* Kết thúc SlickSlider */}
    </div>
  );
};

export default KeyboardList;
