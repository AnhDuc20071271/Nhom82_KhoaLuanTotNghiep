import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoginForm from '../../components/LoginForm';
import SocialLoginButtons from '../../components/SocialLoginButtons';
import SignupText from '@components/SignupText';
import styles from './LoginPopUp.module.css';

const LoginPopUp: React.FC = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleClose = () => {
    navigate('/'); // Điều hướng về trang chủ (HomePage) khi nhấn nút X
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN</h2>
          <button className={styles.closeButton} onClick={handleClose}>×</button> {/* Nút X */}
        </div>
        <div className={styles.titleSeparator}></div>
        <LoginForm />
        <SocialLoginButtons />
        <SignupText />
      </div>
    </div>
  );
};

export default LoginPopUp;
