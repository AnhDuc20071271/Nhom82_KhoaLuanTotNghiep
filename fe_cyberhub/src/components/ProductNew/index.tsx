import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ProductNew.module.css';
import SlickSlider from '../SlickSlider';

const ProductNewList: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/productsnew');
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu sản phẩm mới:', error);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  const getCategoryPath = (category: string) => {
    switch (category.toLowerCase()) {
      case 'bàn phím':
        return 'keyboards';
      case 'chuột':
        return 'mice';
      case 'laptop':
        return 'laptops';
      case 'màn hình':
        return 'monitors';
      default:
        return 'products';
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Sản Phẩm Mới</h2>
      <SlickSlider>
        {products.map((product: any) => (
          <div key={product.id} className={styles.productItem}>
            <Link to={`/productsnew/${getCategoryPath(product.category)}/${product.id}`}>
              <div className={styles.productCard}>
                <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
                <h3>{product.name}</h3>
                <p className={styles.category}>Danh mục: {product.category}</p>
                <p>Giá: {formatPrice(product.price)} VND</p>
                <p>Giảm giá: {product.discount}%</p>
                <p>{product.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default ProductNewList;
