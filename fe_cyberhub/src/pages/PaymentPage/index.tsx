// src/pages/PaymentPage/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getCustomerInfoFromCookies, setFinalTotalPriceToCookies } from '../../auth/authUtils';

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

const PaymentPage: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee] = useState(40000);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      const subtotalFromCart = parseFloat(storedTotalPrice);
      setSubtotal(subtotalFromCart);
      const calculatedTotalPrice = subtotalFromCart + shippingFee;
      setTotalPrice(calculatedTotalPrice);
  
      setFinalTotalPriceToCookies(calculatedTotalPrice.toString());
    }
  
    // Lấy thông tin khách hàng từ Cookies
    const storedCustomerInfo = getCustomerInfoFromCookies();
    if (storedCustomerInfo) {
      const customerInfo: CustomerInfo = JSON.parse(storedCustomerInfo);
      setCustomerName(customerInfo.name);
      setCustomerPhone(customerInfo.phone);
      setCustomerAddress(customerInfo.address);
    }
  }, [shippingFee]);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Thực hiện logic thanh toán ở đây (nếu có)
    console.log('Payment processed');

    // Xóa giỏ hàng và totalPrice sau khi thanh toán thành công
    localStorage.removeItem('cart');
    localStorage.removeItem('totalPrice');

    // Điều hướng đến trang Hoàn Tất sau khi thanh toán thành công
    navigate('/complete');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
  };

  return (
    <div>
      <Header />
      <div className={styles.paymentContainer}>
        {/* Thanh tiến trình */}
        <div className={styles.cartSteps}>
          <div className={`${styles.stepItem} ${styles.completedStep}`}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>1</span>
            </div>
            <p>Giỏ hàng</p>
          </div>
          <div className={`${styles.stepLine} ${styles.completedLine}`}></div>
          <div className={`${styles.stepItem} ${styles.completedStep}`}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>2</span>
            </div>
            <p>Thông tin đặt hàng</p>
          </div>
          <div className={`${styles.stepLine} ${styles.activeLine}`}></div>
          <div className={`${styles.stepItem} ${styles.activeStep}`}>
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

        {/* Thông tin đặt hàng */}
        <div className={styles.orderInfo}>
          <h3>Thông tin đặt hàng</h3>
          <p><strong>Khách hàng:</strong> {customerName}</p>
          <p><strong>Số điện thoại:</strong> {customerPhone}</p>
          <p><strong>Địa chỉ nhận hàng:</strong> {customerAddress}</p>
          <p><strong>Tạm tính:</strong> {formatPrice(subtotal)}đ</p>
        </div>

        {/* Form thanh toán */}
        <form className={styles.paymentForm} onSubmit={handlePaymentSubmit}>
          <h3>Chọn hình thức thanh toán</h3>
          <div className={styles.paymentMethod}>
            <label>
              <input type="radio" name="paymentMethod" value="COD" defaultChecked />
              Thanh toán khi giao hàng (COD)
            </label>
          </div>

          <div className={styles.paymentSummary}>
            <p><strong>Phí vận chuyển:</strong> {formatPrice(shippingFee)}đ</p>
            <p><strong>Tổng tiền:</strong> <span style={{ color: 'red' }}>{formatPrice(totalPrice)}đ</span></p>
          </div>

          <button type="submit" className={styles.paymentButton}>
            THANH TOÁN NGAY
          </button>
          {/* Nút trở về */}
          <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
            Trở về
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
