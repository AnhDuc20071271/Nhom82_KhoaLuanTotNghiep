import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductsList from '../../components/ProductList';
import Chatbox from '../../components/Chatbot';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pendingOrderId = localStorage.getItem('pendingOrderId');
    if (pendingOrderId) {
      localStorage.removeItem('pendingOrderId');
      navigate(`/confirm?orderId=${pendingOrderId}`);
    }
  }, [navigate]);
  
  return (
    <div className={styles.homePageContainer}>
      <Header />
      <div className={styles.mainContainer}>
        <Chatbox />
        <ProductsList />
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default HomePage;
