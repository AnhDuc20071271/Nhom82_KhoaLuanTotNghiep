import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MousePage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MouseCard from '../../components/MouseCard'; // Sử dụng MouseCard

interface Mouse {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  imageUrl: string;
  category: string;
  nsx: string; // Nhà sản xuất
  connectionType: string; // Kết nối: "Wired" hoặc "Bluetooth"
}

const MousePage: React.FC = () => {
  const [mice, setMice] = useState<Mouse[]>([]);
  const [filteredMice, setFilteredMice] = useState<Mouse[]>([]);
  const [filters, setFilters] = useState({
    price: '',
    connectionType: '', // Thêm phần kết nối
    nsx: '',
  });

  useEffect(() => {
    const fetchMice = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mice');
        setMice(response.data);
        setFilteredMice(response.data);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm Chuột:', error);
      }
    };

    fetchMice();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let updatedMice = mice;

    // Lọc theo giá
    if (filters.price) {
      if (filters.price === 'under1m') {
        updatedMice = updatedMice.filter((mouse) => mouse.price < 1000000);
      } else if (filters.price === '1to2m') {
        updatedMice = updatedMice.filter((mouse) => mouse.price >= 1000000 && mouse.price <= 2000000);
      } else if (filters.price === 'over2m') {
        updatedMice = updatedMice.filter((mouse) => mouse.price > 2000000);
      }
    }

    // Lọc theo kết nối
    if (filters.connectionType) {
      updatedMice = updatedMice.filter((mouse) => mouse.connectionType === filters.connectionType);
    }

    // Lọc theo nhà sản xuất
    if (filters.nsx) {
      updatedMice = updatedMice.filter((mouse) => mouse.nsx === filters.nsx);
    }

    setFilteredMice(updatedMice);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Chuột </h1>

        <div className={styles.filterContainer}>
          <div className={styles.filterItem}>
            <label>Giá:</label>
            <select name="price" value={filters.price} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="under1m">Dưới 1 triệu</option>
              <option value="1to2m">1 - 2 triệu</option>
              <option value="over2m">Trên 2 triệu</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label>Kết Nối:</label>
            <select name="connectionType" value={filters.connectionType} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="wired">Có dây</option>
              <option value="bluetooth">Bluetooth</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label>Nhà sản xuất:</label>
            <select name="nsx" value={filters.nsx} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="Logitech">Logitech</option>
              <option value="Razer">Razer</option>
              <option value="Corsair">Corsair</option>
              <option value="Dareu">Dareu</option>
              <option value="MSI">MSI</option>
            </select>
          </div>

          <button className={styles.applyFilterButton} onClick={applyFilters}>Áp dụng bộ lọc</button>
        </div>

        <div className={styles.productGrid}>
          {filteredMice.map((mouse) => (
            <MouseCard
              key={mouse.id}
              id={mouse.id}
              name={mouse.name}
              price={mouse.price}
              discount={mouse.discount}
              imageUrl={mouse.imageUrl}
              stock={mouse.stock}
              nsx={mouse.nsx}
              connectionType={mouse.connectionType}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MousePage;
