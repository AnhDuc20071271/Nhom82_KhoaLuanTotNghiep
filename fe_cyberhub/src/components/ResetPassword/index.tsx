import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './ResetPassword.module.css';

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password`, {
        token,
        newPassword,
      });
      if (response.status === 200) {
        setMessage('Đặt lại mật khẩu thành công!');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div>
        <Header/>
    <div className={styles.container}>
      <h2>Đặt lại mật khẩu</h2>
      <input
        type="text"
        placeholder="Nhập token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Nhập mật khẩu mới"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Đặt lại
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
        <Footer/>
    </div>
  );
};

export default ResetPassword;
