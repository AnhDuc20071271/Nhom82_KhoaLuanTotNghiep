// ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './ProductDetailPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MySwal = withReactContent(Swal);

interface ProductDetail {
  specKey: string;
  specValue: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  imageUrl: string;
  nsx: string;
  details: ProductDetail[];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  // Bảng ánh xạ danh mục và đường dẫn
  const categoryRoutes: { [key: string]: string } = {
    'Laptop Gaming': '/laptops',
    'Chuột': '/mice',
    'Bàn phím': '/keyboards',
    'Màn hình': '/monitors',
    'PC': '/pcs',
    // Thêm các danh mục khác nếu có
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Lỗi khi tải sản phẩm:', error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const discountPrice = product.price * (1 - product.discount / 100);

      const productInCart = cart.find((item: Product) => item.id === product.id);
      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.push({
          ...product,
          originalPrice: product.price,
          discountPrice,
          quantity: 1,
        });
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
    if (product && product.details) {
      MySwal.fire({
        title: '<span style="color: red;">Thông số kỹ thuật</span>',
        html: `
          <table style="width:100%; text-align:left;">
            ${product.details
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

  if (!product) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <Header />
      <div className={styles.productDetailContainer}>
        <div className={styles.breadcrumb}>
          <a href="/">Trang chủ</a> &gt;{' '}
          <a
            onClick={() => navigate(categoryRoutes[product.category] || '/')}
            style={{ cursor: 'pointer' }}
          >
            {product.category}
          </a>{' '}
          &gt; <span>{product.name}</span>
        </div>
        <div className={styles.productDetailContent}>
          <div className={styles.productImages}>
            <div className={styles.imageContainer}>
              {product.discount > 0 && (
                <div className={styles.discountBadge}>-{product.discount}%</div>
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.thumbnailImages}>
              <img src={product.imageUrl} alt={product.name} />
              <img src={product.imageUrl} alt={product.name} />
              <img src={product.imageUrl} alt={product.name} />
            </div>
          </div>
          <div className={styles.productInfo}>
            <h1>{product.name}</h1>
            <div className={styles.priceContainer}>
              <span className={styles.discountPrice}>
                {(product.price * (1 - product.discount / 100)).toLocaleString('vi-VN')}đ
              </span>
              {product.discount > 0 && (
                <span className={styles.originalPrice}>
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
            <button className={styles.buyNowButton} onClick={handleAddToCart}>
              Mua Ngay
            </button>
            <div className={styles.productDetails}>
              <h3>Thông tin chung:</h3>
              <p>- Nhà sản xuất: {product.nsx}</p>
              <p>- Hỗ trợ đổi mới trong 7 ngày.</p>
              <p>Hỗ trợ trả góp MPOS (thẻ tín dụng), HDSAISON (Xem chi tiết).</p>
            </div>
            <div className={styles.promotions}>
              <h3>Khuyến mãi:</h3>
              <p>
                Mua thêm giá treo màn hình máy tính North Bayou NB-P80 giá chỉ 290.000đ. (Xem thêm)
              </p>
            </div>

            {/* Thông số kỹ thuật hiển thị trên trang */}
            {product.details && product.details.length > 0 && (
              <div className={styles.techSpecs}>
                <h3>Thông số kỹ thuật:</h3>
                <table className={styles.specsTable}>
                  <tbody>
                    {product.details.slice(0, 5).map((detail, index) => (
                      <tr key={index}>
                        <td className={styles.specKey}>{detail.specKey}</td>
                        <td className={styles.specValue}>{detail.specValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className={styles.viewDetailsButton} onClick={handleViewDetails}>
                  Xem chi tiết
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
