import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/forgot-password`, { email });
      if (response.status === 200) {
        setMessage('Hãy kiểm tra email để đặt lại mật khẩu.');
      }
    } catch (error) {
      setMessage('Đã xảy ra lỗi, vui lòng thử lại.');
    }
  };

  return (
    <div>
        <Header />
    <div className={styles.container}>
      <h2>Quên mật khẩu</h2>
      <p>Hãy nhập email để bắt đầu khôi phục mật khẩu của bạn.</p>
      <input
        type="email"
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Gửi
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
    <Footer />
    </div>
  );                    
};

export default ForgotPassword;
