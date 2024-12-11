import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  setTokenToCookies,
  setDeliveryStaffToken, // Thêm hàm này
} from '../../auth/authUtils';
import styles from './LoginForm.module.css';

interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

interface LoginFormProps {
  onLoginSuccess?: (token: string) => void; // Thêm prop này
}

const MySwal = withReactContent(Swal);

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      if (response.status === 200) {
        const token = response.data.token;

        const decodedToken: DecodedToken = jwt_decode(token);

        // Nếu có hàm onLoginSuccess, gọi nó
        if (onLoginSuccess) {
          onLoginSuccess(token);
        } else {
          // Nếu không, lưu token vào token chung
          setTokenToCookies(token, 2);
        }

        const result = await MySwal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: `Chào mừng ${username}!`,
        });

        if (result.isConfirmed) {
          if (decodedToken.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
          window.location.reload();
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await MySwal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại!',
          text: 'Tên đăng nhập hoặc mật khẩu không đúng!',
        });
      } else {
        await MySwal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống!',
          text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
        });
      }
    }
  };

  return (
    <div className={styles.formGroup}>
      <input
        type="text"
        placeholder="Tên Đăng Nhập"
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.forgotPassword}>
        <a onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</a>
      </div>
      <button className={styles.loginBtn} onClick={handleLogin}>ĐĂNG NHẬP</button>
    </div>
  );
};

export default LoginForm;
