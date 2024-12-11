// src/pages/ProductPage/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard'; // Component hiển thị sản phẩm

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  imageUrl: string;
  category: string;
  nsx: string; // Nhà sản xuất
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    price: '',
    nsx: '',
  });

  useEffect(() => {
    // Lấy danh sách sản phẩm từ API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products?category=Monitor');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    };

    fetchProducts();
  }, []);

  // Xử lý khi thay đổi bộ lọc
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Áp dụng bộ lọc
  const applyFilters = () => {
    let updatedProducts = products;

    // Lọc theo giá
    if (filters.price) {
      switch (filters.price) {
        case 'under1m':
          updatedProducts = updatedProducts.filter((product) => product.price <= 1000000);
          break;
        case 'under2m':
          updatedProducts = updatedProducts.filter((product) => product.price <= 2000000);
          break;
        case '3to5m':
          updatedProducts = updatedProducts.filter((product) => product.price >= 3000000 && product.price <= 5000000);
          break;
        case '7to8m':
          updatedProducts = updatedProducts.filter((product) => product.price >= 7000000 && product.price <= 8000000);
          break;
        default:
          break;
      }
    }

    // Lọc theo nhà sản xuất
    if (filters.nsx) {
      updatedProducts = updatedProducts.filter((product) => product.nsx === filters.nsx);
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Màn Hình Chính Hãng</h1>

        {/* Bộ lọc sản phẩm */}
        <div className={styles.filterContainer}>
          <div className={styles.filterItem}>
            <label>Giá:</label>
            <select name="price" value={filters.price} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="under1m">Dưới 1 triệu</option>
              <option value="under2m">Dưới 2 triệu</option>
              <option value="3to5m">3 - 5 triệu</option>
              <option value="7to8m">7 - 8 triệu</option>
            </select>
          </div>
          <div className={styles.filterItem}>
            <label>Nhà sản xuất:</label>
            <select name="nsx" value={filters.nsx} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="ASUS">ASUS</option>
              <option value="Dell">Dell</option>
              <option value="Acer">Acer</option>
              <option value="MSI">MSI</option>
              <option value="Xiaomi">Xiaomi</option>
            </select>
          </div>
          <button className={styles.applyFilterButton} onClick={applyFilters}>Áp dụng bộ lọc</button>
        </div>

        {/* Hiển thị sản phẩm */}
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id} // Truyền id cho ProductCard
              name={product.name}
              price={product.price}
              discount={product.discount}
              imageUrl={product.imageUrl}
              stock={product.stock}
              nsx={product.nsx}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
