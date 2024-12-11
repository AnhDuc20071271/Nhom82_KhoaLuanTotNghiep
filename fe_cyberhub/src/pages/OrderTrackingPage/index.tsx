import React, { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './OrderTrackingPage.module.css';
import { getRoleFromCookies } from '@auth/authUtils';
import { lookupOrder } from '../../api/orders';

const OrderTrackingPage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const userRole = getRoleFromCookies();
    setRole(userRole);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await lookupOrder(invoiceNumber, phone, email);
      setOrder(response);
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi khi tra cứu đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <a href="/">Trang chủ</a> &gt; <span>TRA CỨU TÌNH TRẠNG ĐƠN HÀNG ONLINE</span>
        </nav>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src="/deliveryman.jpg" alt="Delivery" className={styles.image} />
          </div>
          <div className={styles.formContainer}>
            <h2>Kiểm tra thông tin đơn hàng & tình trạng vận chuyển</h2>
            <form onSubmit={handleSubmit}>
              {role === 'NhanVienGiaoHang' ? (
                <input
                  type="email"
                  placeholder="Tài khoản Gmail (bắt buộc)"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Email (bắt buộc)"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Số điện thoại (bắt buộc)"
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </>
              )}
              <input
                type="text"
                placeholder="Mã đơn hàng (bắt buộc)"
                className={styles.input}
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
              />
              <button type="submit" className={styles.primaryButton} disabled={loading}>
                {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
              </button>
            </form>

            {error && <p className={styles.error}>{error}</p>}

            {order && (
              <div className={styles.orderDetails}>
                <h2>Thông tin đơn hàng</h2>
                <p><strong>Mã đơn hàng:</strong> {order.invoiceNumber}</p>
                <p><strong>Ngày đặt hàng:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                
                {/* Thông tin thanh toán */}
                <div className={styles.paymentInfo}>
                  <p><strong>Tổng tiền sản phẩm:</strong> {order.totalPrice.toLocaleString()} VND</p>
                  <p><strong>Phải thanh toán:</strong> {order.note && order.note.includes("Đơn hàng đã được giao thành công!") 
                    ? order.totalPrice.toLocaleString() 
                    : order.totalPrice.toLocaleString()} VND</p>
                  <p><strong>Đã thanh toán:</strong> {order.note && order.note.includes("Đơn hàng đã được giao thành công!") 
                    ? order.totalPrice.toLocaleString() 
                    : 'Chưa thanh toán'}</p>
                </div>

                {/* Thông tin khách hàng */}
                <h2>Thông tin khách hàng</h2>
                <div className={styles.customerInfo}>
                  <p><strong>Số điện thoại:</strong> {phone}</p>
                </div>

                {/* Hiển thị chi tiết sản phẩm */}
                <h4>Chi tiết sản phẩm:</h4>
                <div className={styles.productList}>
                  {order.orderDetails && order.orderDetails.map((product: any) => (
                    <div key={product.productId} className={styles.product}>
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className={styles.productImage}
                      />
                      <div>
                        <h5>{product.productName}</h5>
                        <p>Số lượng: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderTrackingPage;
