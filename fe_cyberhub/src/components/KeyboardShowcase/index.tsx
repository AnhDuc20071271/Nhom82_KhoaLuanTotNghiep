import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate để điều hướng
import styles from './KeyboardShowcase.module.css';
import Header from '../../components/Header';  // Thêm Header
import Footer from '../../components/Footer';  // Thêm Footer

// Interface cho đối tượng Keyboard
interface Keyboard {
  id: number;
  name: string;
  price: number;
  discount: number;
  stock: number;
  imageUrl: string;
  nsx: string; // Đổi manufacturer thành nsx
}

const KeyboardShowcase: React.FC = () => {
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]); // Sử dụng interface cho danh sách bàn phím
  const [filteredKeyboards, setFilteredKeyboards] = useState<Keyboard[]>([]); // Sử dụng interface cho danh sách đã lọc
  const [filters, setFilters] = useState({
    price: 'Tất cả',
    nsx: 'Tất cả',
  });

  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng

  useEffect(() => {
    // Fetch dữ liệu sản phẩm bàn phím từ API
    const fetchKeyboards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/keyboards');
        setKeyboards(response.data);
        setFilteredKeyboards(response.data); // Khởi tạo giá trị của danh sách đã lọc
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu bàn phím:', error);
      }
    };

    fetchKeyboards();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    let updatedKeyboards = [...keyboards];

    // Lọc sản phẩm theo giá
    if (filters.price !== 'Tất cả') {
      updatedKeyboards = updatedKeyboards.filter((keyboard) => {
        if (filters.price === '100.000') return keyboard.price <= 100000;
        if (filters.price === '200.000') return keyboard.price > 100000 && keyboard.price <= 200000;
        if (filters.price === '500.000-1.000.000') return keyboard.price > 500000 && keyboard.price <= 1000000;
        if (filters.price === '>1.000.000') return keyboard.price > 1000000;
        return true;
      });
    }

    // Lọc sản phẩm theo nhà sản xuất (nsx)
    if (filters.nsx !== 'Tất cả') {
      updatedKeyboards = updatedKeyboards.filter(
        (keyboard) => keyboard.nsx === filters.nsx
      );
    }

    setFilteredKeyboards(updatedKeyboards);
  };

  // Hàm xử lý khi nhấp vào sản phẩm để chuyển đến trang chi tiết sản phẩm
  const handleProductClick = (id: number) => {
    navigate(`/keyboards/${id}`); // Điều hướng đến trang chi tiết sản phẩm với ID
  };

  return (
    <>
      <Header /> {/* Thêm Header */}
      <div className={styles.container}>
        <h2 className={styles.title}>Bàn Phím</h2>

        <div className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <label>Giá:</label>
            <select name="price" value={filters.price} onChange={handleFilterChange}>
              <option value="Tất cả">Tất cả</option>
              <option value="100.000">100.000</option>
              <option value="200.000">200.000</option>
              <option value="500.000-1.000.000">500.000 - 1.000.000</option>
              <option value=">1.000.000">&gt; 1.000.000</option> {/* Lọc sản phẩm có giá lớn hơn 1.000.000 */}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Nhà sản xuất:</label>
            <select name="nsx" value={filters.nsx} onChange={handleFilterChange}> {/* Đổi manufacturer thành nsx */}
              <option value="Tất cả">Tất cả</option>
              <option value="E-Dra">E-Dra</option>
              <option value="Dareu">Dareu</option>
              <option value="Logitech">Logitech</option>
              <option value="Razer">Razer</option>
              <option value="Consair">Consair</option>
              <option value="AKKO">AKKO</option>
              <option value="Asus">Asus</option>
            </select>
          </div>

          <button className={styles.filterButton} onClick={applyFilters}>
            Áp dụng bộ lọc
          </button>
        </div>

        <div className={styles.keyboardGrid}>
          {filteredKeyboards.map((keyboard) => (
            <div 
              key={keyboard.id} 
              className={styles.keyboardCard}
              onClick={() => handleProductClick(keyboard.id)} // Thêm sự kiện onClick
            >
              <img src={keyboard.imageUrl} alt={keyboard.name} className={styles.keyboardImage} />
              <h3>{keyboard.name}</h3>
              <p>Giá: {keyboard.price.toLocaleString('vi-VN')}đ</p>
              <p>Giảm giá: {keyboard.discount}%</p>
              <p>Còn hàng: {keyboard.stock}</p>
              <p>Nhà sản xuất: {keyboard.nsx}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer /> {/* Thêm Footer */}
    </>
  );
};

export default KeyboardShowcase;
