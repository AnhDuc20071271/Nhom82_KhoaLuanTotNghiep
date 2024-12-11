// src/pages/NotFoundPage/index.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>Page not found</p>
      <button className={styles.button} onClick={handleBackToHome}>
        Home
      </button>
    </div>
  );
};

export default NotFoundPage;
