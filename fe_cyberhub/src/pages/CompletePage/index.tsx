import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CompletePage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getTokenFromCookies, getOrderIdFromCookies, getCustomerInfoFromCookies, getFinalTotalPriceFromCookies } from '../../auth/authUtils';

interface ShippingInfo {
  shippingId: number;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
  specialNotes: string;
  invoiceRequired: boolean;
}

interface CustomerInfo {
  name: string;
  phone: string;
}

interface OrderData {
  id: number;
  orderDate: string;
  totalPrice: number;
  status: string;
  invoiceNumber: string | null;
  orderDetails: any[];
  shippingInfo: ShippingInfo;
}

const CompletePage: React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin đơn hàng
    const orderId = getOrderIdFromCookies();
    if (orderId) {
      const fetchOrderInfo = async () => {
        setIsLoading(true);
        try {
          const token = getTokenFromCookies();
          if (!token) {
            throw new Error('Bạn cần đăng nhập để xem thông tin đơn hàng.');
          }

          const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Không thể lấy thông tin đơn hàng.');
          }
          const data: OrderData = await response.json();
          setOrderInfo(data);
        } catch (error: any) {
          setErrorMessage(error.message || 'Đã có lỗi xảy ra.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrderInfo();
    } else {
      setErrorMessage('Không tìm thấy thông tin đơn hàng.');
    }

   // Lấy thông tin khách hàng và tổng tiền từ Cookies
    const storedCustomerInfo = getCustomerInfoFromCookies();
    if (storedCustomerInfo) {
      setCustomerInfo(JSON.parse(storedCustomerInfo));
    }

    // Lấy finalTotalPrice từ Cookies
    const storedFinalTotalPrice = getFinalTotalPriceFromCookies();
    if (storedFinalTotalPrice) {
      setTotalPrice(parseFloat(storedFinalTotalPrice));
    } else if (orderInfo) {
      // Nếu không có trong Cookies, sử dụng từ orderInfo
      setTotalPrice(orderInfo.totalPrice);
    }
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleChat = () => {
    navigate('/chat');
  };

  return (
    <div>
      <Header />
      <div className={styles.completeContainer}>
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
          <div className={`${styles.stepLine} ${styles.completedLine}`}></div>
          <div className={`${styles.stepItem} ${styles.completedStep}`}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>3</span>
            </div>
            <p>Thanh toán</p>
          </div>
          <div className={`${styles.stepLine} ${styles.completedLine}`}></div>
          <div className={`${styles.stepItem} ${styles.completedStep}`}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>4</span>
            </div>
            <p>Hoàn tất</p>
          </div>
        </div>

        <div className={styles.successMessage}>
          <h3>Đặt hàng thành công</h3>
          <p>Cảm ơn quý khách đã cho chúng tôi có cơ hội được phục vụ.</p>
          <p>Nhân viên của chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất.</p>
        </div>

        {isLoading && <p>Đang tải thông tin đơn hàng...</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {orderInfo && (
          <div className={styles.orderInfo}>
            <h4>Đơn hàng #{orderInfo.id}</h4>
            <p><strong>Khách hàng:</strong> {customerInfo?.name || 'N/A'}</p>
            <p><strong>Số điện thoại:</strong> {customerInfo?.phone || 'N/A'}</p>
            <p>
              <strong>Giao đến:</strong> {orderInfo.shippingInfo.addressLine}, {orderInfo.shippingInfo.ward}, {orderInfo.shippingInfo.district}, {orderInfo.shippingInfo.city}
            </p>
            <p>
              <strong>Tổng tiền:</strong> <span className={styles.totalPrice}>{formatPrice(totalPrice || orderInfo.totalPrice)}đ</span>
            </p>
            <p><strong>Hình thức thanh toán:</strong> Thanh toán khi giao hàng (COD)</p>
            <p className={styles.unpaidNote}>Đơn hàng chưa được thanh toán</p>
          </div>
        )}

        <button className={styles.chatButton} onClick={handleChat}>Chat với chúng tôi</button>
        <button className={styles.continueButton} onClick={handleContinueShopping}>Tiếp tục mua hàng</button>
      </div>
      <Footer />
    </div>
  );
};

export default CompletePage;
