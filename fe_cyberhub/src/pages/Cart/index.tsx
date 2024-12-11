// src/components/Cart/Cart.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Cart.module.css';
import { getTokenFromCookies } from '../../auth/authUtils';

const MySwal = withReactContent(Swal);

interface CartItem {
  id: number;
  name: string;
  originalPrice: number | null;
  discountPrice: number | null;
  imageUrl: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage khi component được render
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Cập nhật localStorage
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      const updatedCart = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Tính tổng tiền dựa trên giá sau khi giảm
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.discountPrice || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const token = getTokenFromCookies();

    if (!token) {
      // Nếu không có token, yêu cầu đăng nhập
      MySwal.fire({
        title: 'Bạn cần đăng nhập để đặt hàng',
        icon: 'warning',
        confirmButtonText: 'Đăng nhập',
        showCancelButton: true,
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Chuyển hướng đến trang đăng nhập
        }
      });
    } else {
      // Lưu tổng tiền vào localStorage
      localStorage.setItem('totalPrice', totalPrice.toString());
      navigate('/checkout');
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
  };

  return (
    <div>
      <Header />
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h1>Giỏ hàng của bạn</h1>
          <div className={styles.cartSteps}>
            <div className={`${styles.stepItem} ${styles.activeStep}`}>
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>1</span>
              </div>
              <p>Giỏ hàng</p>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>2</span>
              </div>
              <p>Thông tin đặt hàng</p>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>3</span>
              </div>
              <p>Thanh toán</p>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>4</span>
              </div>
              <p>Hoàn tất</p>
            </div>
          </div>
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h2 className={styles.itemName}>{item.name}</h2>
                  <div className={styles.itemPrices}>
                    <span className={styles.discountPrice}>
                      {item.discountPrice ? formatPrice(item.discountPrice) : 'Liên hệ'}đ
                    </span>
                    <span className={styles.originalPrice}>
                      {item.originalPrice ? formatPrice(item.originalPrice) : ''}đ
                    </span>
                  </div>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? handleQuantityChange(item.id, item.quantity - 1)
                          : handleRemoveItem(item.id)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className={styles.removeButton}>
                    Xoá
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
                <>
                  <div className={styles.cartSummary}>
                        <p className={styles.totalPriceLabel}>
                          Tổng tiền:
                        </p>
                        <h2 className={styles.totalPriceValue}>
                          {formatPrice(totalPrice)}<span>đ</span>
                        </h2>
                      </div>
                  <div className={styles.actionButtons}>
                    <button className={styles.checkoutButton} onClick={handleCheckout}>
                      ĐẶT HÀNG NGAY
                    </button>
                    <button className={styles.continueButton} onClick={handleContinueShopping}>
                      TIẾP TỤC MUA HÀNG
                    </button>
                  </div>
                </>
              )}

      </div>
      <Footer />
    </div>
  );
};

export default Cart;
