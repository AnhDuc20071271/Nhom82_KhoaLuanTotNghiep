// src/pages/LaptopPage/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LaptopPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LaptopCard from '../../components/LaptopCard'; // Sử dụng LaptopCard thay vì ProductCard

interface Laptop {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  imageUrl: string;
  category: string;
  nsx: string; // Nhà sản xuất
}

const LaptopPage: React.FC = () => {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([]);
  const [filters, setFilters] = useState({
    price: '',
    ram: '',
    cpu: '',
    nsx: '', 
  });

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get('http://localhost:8080/laptops');
        setLaptops(response.data);
        setFilteredLaptops(response.data);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm Laptop:', error);
      }
    };

    fetchLaptops();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let updatedLaptops = laptops;

    // Lọc theo giá
    if (filters.price) {
      if (filters.price === '10to20m') {
        updatedLaptops = updatedLaptops.filter((laptop) => laptop.price >= 10000000 && laptop.price <= 20000000);
      } else if (filters.price === '20to30m') {
        updatedLaptops = updatedLaptops.filter((laptop) => laptop.price > 20000000 && laptop.price <= 30000000);
      } else if (filters.price === 'over40m') {
        updatedLaptops = updatedLaptops.filter((laptop) => laptop.price > 40000000);
      }
    }

    // Lọc theo RAM
    if (filters.ram) {
      if (filters.ram === '8gb') {
        updatedLaptops = updatedLaptops.filter((laptop) => laptop.stock >= 8);
      } else if (filters.ram === '16gb') {
        updatedLaptops = updatedLaptops.filter((laptop) => laptop.stock >= 16);
      }
    }

    // Lọc theo CPU
    if (filters.cpu) {
      if (filters.cpu === 'i5') {
        updatedLaptops = updatedLaptops.filter((laptop) => laptop.name.includes('i5'));
      } else if (filters.cpu === 'i7') {
        updatedLaptops = updatedLaptops.filter((laptop) => laptop.name.includes('i7'));
      }
    }

    // Lọc theo nhà sản xuất
    if (filters.nsx) {
      updatedLaptops = updatedLaptops.filter((laptop) => laptop.nsx === filters.nsx);
    }

    setFilteredLaptops(updatedLaptops);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Laptop Bán Chạy</h1>

        <div className={styles.filterContainer}>
          <div className={styles.filterItem}>
            <label>Giá:</label>
            <select name="price" value={filters.price} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="10to20m">10 - 20 triệu</option>
              <option value="20to30m">20 - 30 triệu</option>
              <option value="over40m">Trên 40 triệu</option>
            </select>
          </div>
          <div className={styles.filterItem}>
            <label>RAM:</label>
            <select name="ram" value={filters.ram} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="8gb">8GB</option>
              <option value="16gb">16GB</option>
            </select>
          </div>
          <div className={styles.filterItem}>
            <label>CPU:</label>
            <select name="cpu" value={filters.cpu} onChange={handleFilterChange}>
              <option value="">Tất cả</option>
              <option value="i5">Intel Core i5</option>
              <option value="i7">Intel Core i7</option>
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
            </select>
          </div>

          <button className={styles.applyFilterButton} onClick={applyFilters}>Áp dụng bộ lọc</button>
        </div>

        <div className={styles.productGrid}>
          {filteredLaptops.map((laptop) => (
            <LaptopCard
              key={laptop.id}
              id={laptop.id}
              name={laptop.name}
              price={laptop.price}
              discount={laptop.discount}
              imageUrl={laptop.imageUrl}
              stock={laptop.stock}
              nsx={laptop.nsx} 
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LaptopPage;
