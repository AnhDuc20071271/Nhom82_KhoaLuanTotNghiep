import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MonitorDetailPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface ProductDetail {
  specKey: string;
  specValue: string;
}

interface MonitorProduct {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  imageUrl: string;
  category: string;
  details: ProductDetail[];
}

const MonitorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [monitorProduct, setMonitorProduct] = useState<MonitorProduct | null>(null);

  useEffect(() => {
    const fetchMonitorProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setMonitorProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', error);
      }
    };

    fetchMonitorProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (monitorProduct) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const discountPrice =
        monitorProduct.discount > 0
          ? monitorProduct.price * (1 - monitorProduct.discount / 100)
          : monitorProduct.price;

      const newItem = {
        ...monitorProduct,
        originalPrice: monitorProduct.price,
        discountPrice: discountPrice,
        quantity: 1,
      };

      const existingItem = cart.find((item: MonitorProduct) => item.id === monitorProduct.id);

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
        confirmButtonText: 'OK',
      });
    }
  };

  const handleViewDetails = () => {
    if (monitorProduct && monitorProduct.details) {
      MySwal.fire({
        title: '<span style="color: red;">Thông số kỹ thuật</span>',
        html: `
          <table style="width:100%; text-align:left;">
            ${monitorProduct.details
              .map(
                (detail) => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${detail.specKey}</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${detail.specValue}</td>
              </tr>
            `
              )
              .join('')}
          </table>
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Đóng',
        width: '600px',
      });
    }
  };

  if (!monitorProduct) return <div>Đang tải...</div>;

  return (
    <>
      <Header />
      <div className={styles.monitorDetailContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/">Trang chủ</a> &gt;
          <a href="/monitors">Màn hình</a> &gt;
          <span>{monitorProduct.name}</span>
        </div>

        <div className={styles.monitorDetailContent}>
          <div className={styles.monitorImages}>
            <img
              src={monitorProduct.imageUrl}
              alt={monitorProduct.name}
              className={styles.mainImage}
            />
            <div className={styles.thumbnailImages}>
              <img src={monitorProduct.imageUrl} alt={monitorProduct.name} />
              <img src={monitorProduct.imageUrl} alt={monitorProduct.name} />
              <img src={monitorProduct.imageUrl} alt={monitorProduct.name} />
            </div>
          </div>
          <div className={styles.monitorInfo}>
            <h1>{monitorProduct.name}</h1>
            <div className={styles.priceContainer}>
              {monitorProduct.discount > 0 ? (
                <>
                  <span className={styles.discountPrice}>
                    {(monitorProduct.price * (1 - monitorProduct.discount / 100)).toLocaleString(
                      'vi-VN'
                    )}
                    đ
                  </span>
                  <span className={styles.originalPrice}>
                    {monitorProduct.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.discount}>-{monitorProduct.discount}%</span>
                </>
              ) : (
                <span className={styles.discountPrice}>
                  {monitorProduct.price.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
            <button className={styles.buyNowButton} onClick={handleAddToCart}>
              MUA NGAY
            </button>
            <p>{monitorProduct.description}</p>

            {/* Nút xem chi tiết */}
            <button className={styles.viewDetailsButton} onClick={handleViewDetails}>
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MonitorDetailPage;
