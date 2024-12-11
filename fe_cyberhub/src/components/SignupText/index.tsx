import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignupText.module.css';

interface SignupTextProps {
  onSignupClick: () => void; // Thêm props để nhận sự kiện từ component cha
}

const SignupText: React.FC<SignupTextProps> = ({ onSignupClick }) => {
  return (
    <div className={styles.signupText}>
      <p>
        Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
      </p>
    </div>
  );
};

export default SignupText;
