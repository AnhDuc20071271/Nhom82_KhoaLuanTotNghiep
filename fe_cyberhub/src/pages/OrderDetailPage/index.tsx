// src/pages/OrderDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderHistory } from '../../api/orders'; // Dùng fetchOrderHistory thay vì lookupOrder
import { fetchProfile } from '../../api/profileApi';
import styles from './OrderDetailPage.module.css';
import { FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaCreditCard, FaPhone, FaEnvelope, FaArrowLeft, FaUser } from 'react-icons/fa';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const fetchedProfile = await fetchProfile();
        setProfile(fetchedProfile);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi lấy profile');
      }
    };
    getProfileData();
  }, []);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId || !profile) return; 
      setLoading(true);
      setError(null);
      try {
        // Gọi fetchOrderHistory mà không truyền startDate, endDate
        // Nếu backend yêu cầu startDate, endDate, truyền giá trị mặc định, vd: '2020-01-01', '9999-12-31'
        const allOrders = await fetchOrderHistory(profile.phone, profile.email, '', '');
        
        const foundOrder = allOrders.find((o: any) => o.orderId === parseInt(orderId));
        if (!foundOrder) {
          setError("Không tìm thấy đơn hàng với mã này.");
          setLoading(false);
          return;
        }

        setOrder(foundOrder);
      } catch (err: any) {
        setError(err.message || 'Đã có lỗi xảy ra khi lấy chi tiết đơn hàng.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [orderId, profile]);

  const handleBack = () => {
    navigate('/order-history');
  };

  if (loading) return <p>Đang tải chi tiết...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!order) return <p>Không tìm thấy thông tin đơn hàng.</p>;

  const isDelivered = order.note === "Đơn hàng đã được giao thành công!";

  return (
    <div className={styles.orderDetailContainer}>
      <div className={styles.backButtonWrapper}>
  <button className={styles.backButton} onClick={handleBack}>
    <FaArrowLeft /> 
  </button>
</div>


      <h2>Chi tiết đơn hàng</h2>
      <div className={styles.orderInfo}>
        <div className={styles.orderId}>
          <span>Mã đơn hàng: {order.invoiceNumber}</span>
        </div>
        <div className={styles.deliveryStatus1}>
          <span>{isDelivered ? "Đã giao hàng" : "Đang giao hàng"}</span>
        </div>
      </div>

      <h3>Chi tiết sản phẩm</h3>
      <div className={styles.productList}>
        {order.orderDetails.map((product: any) => (
          <div key={product.productId} className={styles.product}>
            <img
              src={product.imageUrl}
              alt={product.productName}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h4>{product.productName}</h4>
            </div>
            <div className={styles.quantity}>
              Số lượng: {product.quantity}
            </div>
          </div>
        ))}
      </div>

      <h3>Trạng thái giao hàng</h3>
      <div className={styles.deliveryStatus}>
  <div className={styles.statusStep}>
    <div className={`${styles.statusIcon} ${styles.completed}`}>
      <FaCheckCircle />
    </div>
    <span className={styles.statusText}>Xác nhận</span>
  </div>
  <div className={`${styles.statusLine} ${styles.completed}`}></div>
  <div className={styles.statusStep}>
    <div className={`${styles.statusIcon} ${styles.completed}`}>
      <FaCheckCircle />
    </div>
    <span className={styles.statusText}>Nhận hàng</span>
  </div>
</div>



      <h3>Thông tin thanh toán</h3>
      <div className={styles.paymentInfo}>
        <div className={styles.paymentItem}>
          <FaMoneyBillWave /> <span>Tổng tiền sản phẩm:</span>
          <span>{order.totalPrice.toLocaleString()} VND</span>
        </div>
        <div className={styles.paymentItem}>
          <FaCreditCard /> <span>Phải thanh toán:</span>
          <span>{order.totalPrice.toLocaleString()} VND</span>
        </div>
        <div className={styles.paymentItem}>
          {isDelivered ? <FaCheckCircle color="green" /> : <FaTimesCircle color="gray" />}
          <span>Đã thanh toán:</span>
          <span>
            {isDelivered
              ? order.totalPrice.toLocaleString() + " VND"
              : "Chưa thanh toán"}
          </span>
        </div>
      </div>

      <h3>Thông tin khách hàng</h3>
      {profile && (
        <div className={styles.customerInfo}>
          <p><FaUser /> <strong>Tên:</strong> {profile.firstName} {profile.lastName}</p>
          <p><FaPhone /> <strong>Số điện thoại:</strong> {profile.phone}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {profile.email}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
