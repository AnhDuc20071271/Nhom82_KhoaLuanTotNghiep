import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import styles from './NotificationModal.module.css';

const NotificationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate(); // Sử dụng navigate để chuyển trang

  // Đóng modal khi người dùng click ra ngoài modal
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modal = document.querySelector(`.${styles.modalContent}`);
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // Hàm chuyển sang trang chi tiết tài khoản
  const handleSMemberClick = () => {
    navigate('/order-history'); // Chuyển sang trang chi tiết tài khoản
    onClose(); // Đóng modal sau khi chuyển trang
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <img src="/logo.png" alt="SMember" className={styles.smemberIcon} />
          </div>
          <button className={styles.smemberButton} onClick={handleSMemberClick}>
            Truy Cập Smember
          </button>
        </div>
        <div className={styles.modalTitle}>
          <h3>Thông báo</h3>
          <a href="#" className={styles.markAsRead}>Bạn đã đọc tất cả thông báo ✓</a>
        </div>
        <div className={styles.notifications}>
          <div className={styles.notificationItem}>
            <i className="fa fa-truck" />
            <div>
              <strong>Đơn hàng 00175S2409000581</strong> vừa được giao thành công. Cảm ơn bạn đã đặt hàng tại CellphoneS.
            </div>
            <small>1 tháng trước</small>
          </div>
          <div className={styles.notificationItem}>
            <i className="fa fa-check-square" />
            <div>
              <strong>Đơn hàng 00175S2409000581</strong> đã được cửa hàng xác nhận và sẽ giao tới bạn trong thời gian sớm nhất.
            </div>
            <small>1 tháng trước</small>
          </div>
          <p className={styles.noMoreNotifications}>Không còn thông báo nào nữa!</p>
        </div>
        <button className={styles.closeModal} onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default NotificationModal;
