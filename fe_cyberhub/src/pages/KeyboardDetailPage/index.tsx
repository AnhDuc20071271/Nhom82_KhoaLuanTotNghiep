import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './KeyboardDetailPage.module.css';

const MySwal = withReactContent(Swal);

interface Keyboard {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  imageUrl: string;
  nsx: string; // Thêm trường nhà sản xuất
}

const KeyboardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKeyboard = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/keyboards/${id}`);
        setKeyboard(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu bàn phím:', error);
      }
    };

    fetchKeyboard();
  }, [id]);

  const handleAddToCart = () => {
    if (keyboard) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const discountPrice = keyboard.discount > 0 ? keyboard.price * (1 - keyboard.discount / 100) : keyboard.price;

      const newItem = {
        ...keyboard,
        originalPrice: keyboard.price,
        discountPrice: discountPrice,
        quantity: 1,
      };

      const existingItem = cart.find((item: Keyboard) => item.id === keyboard.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(newItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Hiển thị thông báo xác nhận
      MySwal.fire({
        title: 'Đã thêm vào giỏ hàng',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!keyboard) return <div>Đang tải...</div>;

  return (
    <>
      <Header />
      <div className={styles.keyboardDetailContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/">Trang chủ</a> &gt; 
          <a onClick={() => navigate('/keyboard-showcase')} style={{ cursor: 'pointer' }}>Bàn phím</a> &gt; 
          <span>{keyboard.name}</span>
        </div>

        <div className={styles.keyboardDetailContent}>
          <div className={styles.keyboardImages}>
            <img src={keyboard.imageUrl} alt={keyboard.name} className={styles.mainImage} />
            <div className={styles.thumbnailImages}>
              <img src={keyboard.imageUrl} alt={keyboard.name} />
              <img src={keyboard.imageUrl} alt={keyboard.name} />
              <img src={keyboard.imageUrl} alt={keyboard.name} />
            </div>
          </div>
          <div className={styles.keyboardInfo}>
            <h1>{keyboard.name}</h1>
            <div className={styles.priceContainer}>
              {keyboard.discount > 0 ? (
                <>
                  <span className={styles.discountPrice}>
                    {(keyboard.price * (1 - keyboard.discount / 100)).toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.originalPrice}>
                    {keyboard.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.discount}>-{keyboard.discount}%</span>
                </>
              ) : (
                <span className={styles.discountPrice}>
                  {keyboard.price.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
            <button className={styles.buyNowButton} onClick={handleAddToCart}>
              MUA NGAY
            </button>
            <p>{keyboard.description}</p>

            {/* Phần thông tin chung */}
            <div className={styles.generalInfo}>
              <h3>Thông tin chung:</h3>
              <p><strong>Nhà sản xuất:</strong> {keyboard.nsx}</p>
              <p><strong>Tình trạng:</strong> Mới</p>
              <p><strong>Bảo hành:</strong> 24 tháng</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KeyboardDetailPage;
