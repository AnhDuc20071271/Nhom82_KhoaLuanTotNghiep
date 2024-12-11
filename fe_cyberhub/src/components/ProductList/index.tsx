// ProductsList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductsList.module.css';
import SlickSlider from '../SlickSlider';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // Thay đổi thành number để tính toán
  discount: number;
  stock: number;
  description: string;
  imageUrl: string;
}

const ProductsList: React.FC = () => {
  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: Product[] }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch tất cả sản phẩm
        const response = await axios.get('http://localhost:8080/products');
        
        // Sau khi fetch products:
        const allProducts = response.data.content as Product[];
        // Lọc bỏ sản phẩm hết hàng
        const inStockProducts = allProducts.filter(p => p.stock > 0);

        // Loại bỏ sản phẩm trùng lặp (nếu có):
        const uniqueProducts = Array.from(new Map(inStockProducts.map(p => [p.id, p])).values());

        const groupedProducts: { [key: string]: Product[] } = {};
        uniqueProducts.forEach((product) => {
          if (groupedProducts[product.category]) {
            groupedProducts[product.category].push(product);
          } else {
            groupedProducts[product.category] = [product];
          }
        });

        setProductsByCategory(groupedProducts);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    };

    fetchProducts();
  }, []);
  

  return (
    <div>
      {Object.keys(productsByCategory).map((category, index) => {
        const products = productsByCategory[category];
        const sliderSettings = {
          infinite: products.length > 4, // Chỉ bật infinite nếu có hơn 4 sản phẩm
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        };

        return (
          <div key={category}>
            {/* Thêm gạch ngang ngăn cách giữa các danh mục */}
            {index !== 0 && <div className={styles.categorySeparator}></div>}

            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle}>{category}</h2>
              <SlickSlider settings={sliderSettings}>
                {products.map((product) => {
                  const discountedPrice = product.price * (1 - product.discount / 100);

                  return (
                    <div key={product.id} className={styles.productItemWithCheckbox}>
                      <Link to={`/products/${product.id}`} className={styles.productLink}>
                        <div className={styles.productItem}>
                          <div className={styles.productCard}>
                            {/* Badge giảm giá */}
                            {product.discount > 0 && (
                              <div className={styles.discountBadge}>-{product.discount}%</div>
                            )}
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className={styles.productImage}
                            />
                            <h3>{product.name}</h3>
                            {/* Hiển thị giá sau khi giảm và giá gốc */}
                            <p className={styles.discountedPrice}>
                              {discountedPrice.toLocaleString('vi-VN')}đ
                            </p>
                            {product.discount > 0 && (
                              <p className={styles.originalPrice}>
                                {product.price.toLocaleString('vi-VN')}đ
                              </p>
                            )}
                            <p>{product.description}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </SlickSlider>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
