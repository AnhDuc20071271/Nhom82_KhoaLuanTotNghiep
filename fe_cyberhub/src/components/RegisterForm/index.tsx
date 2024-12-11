import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // Import thư viện SweetAlert2
import styles from './RegisterForm.module.css';

const MySwal = withReactContent(Swal);

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
        username: name,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Hiển thị thông báo thành công
        MySwal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          text: `Chào mừng ${name}!`,
        }).then(() => {
          // Sau khi người dùng bấm OK, chuyển hướng đến trang login hoặc trang khác
          window.location.href = '/login'; // Ví dụ: điều hướng đến trang login
        });
      }
    } catch (error: any) {
      // Xử lý lỗi đăng ký và hiển thị thông báo
      MySwal.fire({
        icon: 'error',
        title: 'Đăng ký thất bại!',
        text: 'Vui lòng thử lại.',
      });
      setError('Đăng ký thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div className={styles.registerForm}>
      <input
        type="text"
        placeholder="Username"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <label className={styles.checkboxLabel}>
        <input type="checkbox" />
        Đăng ký nhận tin khuyến mãi qua Email
      </label> */}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <button className={styles.registerBtn} onClick={handleRegister}>TẠO TÀI KHOẢN</button>
    </div>
  );
};

export default RegisterForm;
