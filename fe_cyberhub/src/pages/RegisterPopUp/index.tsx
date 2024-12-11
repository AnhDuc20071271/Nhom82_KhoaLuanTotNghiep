import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm';
import SocialLoginButtons from '@components/SocialLoginButtons';
import styles from './RegisterPopUp.module.css';

const RegisterPopUp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); 

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    navigate('/'); 
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>ĐĂNG KÝ TÀI KHOẢN CYBERHUB</h2>
          <button className={styles.closeButton} onClick={handleClose}>×</button>
        </div>
        <div className={styles.titleSeparator}></div>
        <RegisterForm />
        <div className={styles.separator}>hoặc đăng ký bằng</div>
        <SocialLoginButtons />
        <div>
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopUp;
