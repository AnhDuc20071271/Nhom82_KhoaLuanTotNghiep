import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './MouseDetailPage.module.css';

const MySwal = withReactContent(Swal);

interface Mouse {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  imageUrl: string;
  nsx: string;
  connectionType: string;
}

const MouseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mouse, setMouse] = useState<Mouse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMouse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/mice/${id}`);
        setMouse(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu chuột:', error);
      }
    };

    fetchMouse();
  }, [id]);

  const handleAddToCart = () => {
    if (mouse) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const discountPrice = mouse.discount > 0 ? mouse.price * (1 - mouse.discount / 100) : mouse.price;

      const newItem = {
        ...mouse,
        originalPrice: mouse.price,
        discountPrice: discountPrice,
        quantity: 1,
      };

      const existingItem = cart.find((item: Mouse) => item.id === mouse.id);

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

  if (!mouse) return <div>Đang tải...</div>;

  return (
    <>
      <Header />
      <div className={styles.mouseDetailContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/">Trang chủ</a> &gt; 
          <a onClick={() => navigate('/mices')} style={{ cursor: 'pointer' }}>Chuột</a> &gt; 
          <span>{mouse.name}</span>
        </div>

        <div className={styles.mouseDetailContent}>
          <div className={styles.mouseImages}>
            <img src={mouse.imageUrl} alt={mouse.name} className={styles.mainImage} />
            <div className={styles.thumbnailImages}>
              <img src={mouse.imageUrl} alt={mouse.name} />
              <img src={mouse.imageUrl} alt={mouse.name} />
              <img src={mouse.imageUrl} alt={mouse.name} />
            </div>
          </div>
          <div className={styles.mouseInfo}>
            <h1>{mouse.name}</h1>
            <div className={styles.priceContainer}>
              {mouse.discount > 0 ? (
                <>
                  <span className={styles.discountPrice}>
                    {(mouse.price * (1 - mouse.discount / 100)).toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.originalPrice}>
                    {mouse.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.discount}>-{mouse.discount}%</span>
                </>
              ) : (
                <span className={styles.discountPrice}>
                  {mouse.price.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
            <button className={styles.buyNowButton} onClick={handleAddToCart}>
              MUA NGAY
            </button>
            <p>{mouse.description}</p>

            {/* Thông tin chung */}
            <div className={styles.generalInfo}>
              <h3>Thông tin chung:</h3>
              <p><strong>Nhà sản xuất:</strong> {mouse.nsx}</p>
              <p><strong>Tình trạng:</strong> Mới</p>
              <p><strong>Bảo hành:</strong> 24 tháng</p>
              <p><strong>Kết nối:</strong> {mouse.connectionType}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MouseDetailPage;
