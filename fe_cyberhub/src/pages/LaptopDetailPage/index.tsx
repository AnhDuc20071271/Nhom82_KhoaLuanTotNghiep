import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './LaptopDetailPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MySwal = withReactContent(Swal);

interface Laptop {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  imageUrl: string;
  category: string;
}

const LaptopDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/laptops/${id}`);
        setLaptop(response.data);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết laptop:', error);
      }
    };

    if (id) {
      fetchLaptop();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (laptop) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const newItem = {
        ...laptop,
        originalPrice: laptop.price,
        discountPrice: laptop.discount > 0 ? laptop.price * (1 - laptop.discount / 100) : laptop.price,
        quantity: 1,
      };
      cart.push(newItem);
      localStorage.setItem('cart', JSON.stringify(cart));

      // Hiển thị thông báo xác nhận
      MySwal.fire({
        title: 'Đã thêm vào giỏ hàng',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!laptop) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.productDetailContainer}>
        <div className={styles.breadcrumb}>
          <a href="/">Trang chủ</a> &gt; <a onClick={() => navigate('/laptops')} style={{ cursor: 'pointer' }}>Laptop</a> &gt; <span>{laptop.name}</span>
        </div>

        <div className={styles.productDetailContent}>
          <div className={styles.productImages}>
            <img src={laptop.imageUrl} alt={laptop.name} className={styles.mainImage} />
            <div className={styles.thumbnailImages}>
              <img src={laptop.imageUrl} alt={laptop.name} />
              <img src={laptop.imageUrl} alt={laptop.name} />
              <img src={laptop.imageUrl} alt={laptop.name} />
            </div>
          </div>
          <div className={styles.productInfo}>
            <h1>{laptop.name}</h1>
            <div className={styles.priceContainer}>
              {laptop.discount > 0 ? (
                <>
                  <span className={styles.discountPrice}>
                    {(laptop.price * (1 - laptop.discount / 100)).toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.originalPrice}>
                    {laptop.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.discount}>-{laptop.discount}%</span>
                </>
              ) : (
                <span className={styles.discountPrice}>
                  {laptop.price.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>

            <button className={styles.buyNowButton} onClick={handleAddToCart}>
              Mua Ngay
            </button>

            <h3>Quà tặng:</h3>
            <ul className={styles.gifts}>
              <li>🎁 Balo ACER </li>
            </ul>

            <h3>Thông tin chung:</h3>
            <ul className={styles.warranty}>
              <li>✔ Bảo hành chính hãng 12 tháng.</li>
              <li>✔ Hỗ trợ đổi mới trong 7 ngày.</li>
              <li>✔ Windows bản quyền tích hợp.</li>
            </ul>

            <h3>Khuyến mãi:</h3>
            <ul className={styles.promotions}>
              <li>Ưu đãi 50.000đ khi mua thêm túi chống sốc kèm Laptop. (Xem thêm)</li>
              <li>Ưu đãi 50.000đ khi mua giá treo kèm Laptop. (Xem thêm)</li>
              <li>Ưu đãi 50.000đ khi mua đế tản nhiệt kèm Laptop. (Xem thêm)</li>
              <li>Ưu đãi 500.000đ khi nâng cấp RAM dành cho Laptop Gaming (Xem thêm)</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LaptopDetailPage;
