import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CaseDetailPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface ProductDetail {
  specKey: string;
  specValue: string;
}

interface CaseProduct {
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

const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseProduct, setCaseProduct] = useState<CaseProduct | null>(null);

  useEffect(() => {
    const fetchCaseProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setCaseProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', error);
      }
    };

    fetchCaseProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (caseProduct) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const discountPrice =
        caseProduct.discount > 0
          ? caseProduct.price * (1 - caseProduct.discount / 100)
          : caseProduct.price;

      const newItem = {
        ...caseProduct,
        originalPrice: caseProduct.price,
        discountPrice: discountPrice,
        quantity: 1,
      };

      const existingItem = cart.find((item: CaseProduct) => item.id === caseProduct.id);

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
    if (caseProduct && caseProduct.details) {
      MySwal.fire({
        title: '<span style="color: red;">Thông số kỹ thuật</span>',
        html: `
          <table style="width:100%; text-align:left;">
            ${caseProduct.details
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

  if (!caseProduct) return <div>Đang tải...</div>;

  return (
    <>
      <Header />
      <div className={styles.caseDetailContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/">Trang chủ</a> &gt;
          <a href="/cases">Case</a> &gt;
          <span>{caseProduct.name}</span>
        </div>

        <div className={styles.caseDetailContent}>
          <div className={styles.caseImages}>
            <img src={caseProduct.imageUrl} alt={caseProduct.name} className={styles.mainImage} />
            <div className={styles.thumbnailImages}>
              <img src={caseProduct.imageUrl} alt={caseProduct.name} />
              <img src={caseProduct.imageUrl} alt={caseProduct.name} />
              <img src={caseProduct.imageUrl} alt={caseProduct.name} />
            </div>
          </div>
          <div className={styles.caseInfo}>
            <h1>{caseProduct.name}</h1>
            <div className={styles.priceContainer}>
              {caseProduct.discount > 0 ? (
                <>
                  <span className={styles.discountPrice}>
                    {(caseProduct.price * (1 - caseProduct.discount / 100)).toLocaleString(
                      'vi-VN'
                    )}
                    đ
                  </span>
                  <span className={styles.originalPrice}>
                    {caseProduct.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className={styles.discount}>-{caseProduct.discount}%</span>
                </>
              ) : (
                <span className={styles.discountPrice}>
                  {caseProduct.price.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
            <button className={styles.buyNowButton} onClick={handleAddToCart}>
              MUA NGAY
            </button>
            <p>{caseProduct.description}</p>

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

export default CaseDetailPage;
