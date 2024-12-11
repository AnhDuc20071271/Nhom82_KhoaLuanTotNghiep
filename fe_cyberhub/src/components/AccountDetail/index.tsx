import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountDetail.module.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { removeTokenFromCookies } from '../../auth/authUtils'; // Import hàm removeTokenFromCookies

const AccountDetail: React.FC = () => {
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng chọn "Thoát tài khoản"
  const handleLogout = () => {
    removeTokenFromCookies(); // Xóa token khỏi cookies
    localStorage.removeItem('username'); // Xóa thông tin người dùng khỏi localStorage nếu cần
    navigate('/login'); // Chuyển hướng về trang đăng nhập
  };

  // Hàm điều hướng tới trang Lịch sử mua hàng
  const handleOrderHistoryClick = () => {
    navigate('/order-history');
  };

  return (
    <div className={styles.accountDetailContainer}>
      <Header />

      <div className={styles.mainContent}>
        <div className={styles.leftSidebar}>
          <ul className={styles.sidebarMenu}>
            <li className={styles.menuItem} onClick={handleOrderHistoryClick}>
              Lịch sử mua hàng
            </li>
            {/* <li className={styles.menuItem}>Tra cứu bảo hành</li>
            <li className={styles.menuItem}>Ưu đãi của bạn</li>
            <li className={styles.menuItem}>Chương trình S-Student</li>
            <li className={styles.menuItem}>Hạng thành viên</li>
            <li className={styles.menuItem}>Tài khoản của bạn</li>
            <li className={styles.menuItem}>Liên kết tài khoản</li>
            <li className={styles.menuItem}>Hỗ trợ</li>
            <li className={styles.menuItem}>Góp ý - Phản hồi</li> */}
            <li className={styles.menuItem} onClick={handleLogout}>
              Thoát tài khoản
            </li>
          </ul>
        </div>

        <div className={styles.accountContent}>
          <div className={styles.accountHeader}>
            <div className={styles.userInfo}>
              <img src="/logo.png" alt="User Avatar" className={styles.userAvatar} />
              <div>
                <h3>ANH ĐỨC</h3>
                <span className={styles.userLevel}>SNULL</span>
              </div>
            </div>
          </div>

          <div className={styles.accountSummary}>
            <div className={styles.orderSummary}>
              <h2>2</h2>
              <p>đơn hàng</p>
            </div>
            <div className={styles.totalAmount}>
              <h2>739K</h2>
              <p>Tổng tiền tích lũy</p>
            </div>
          </div>

          <div className={styles.moreOptions}>
            <div className={styles.optionItem}>
              <h3>Hạng thành viên</h3>
            </div>
            <div className={styles.optionItem}>
              <h3>Mã giảm giá</h3>
            </div>
            <div className={styles.optionItem}>
              <h3>Lịch sử mua hàng</h3>
            </div>
            <div className={styles.optionItem}>
              <h3>S-Student</h3>
              <span>HOT</span>
            </div>
            <div className={styles.optionItem}>
              <h3>Liên kết tài khoản</h3>
              <span>MỚI</span>
            </div>
            <div className={styles.optionItem}>
              <h3>Sổ địa chỉ</h3>
              <span>MỚI</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountDetail;
