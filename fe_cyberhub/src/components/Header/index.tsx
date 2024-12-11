import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import styles from './Header.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getTokenFromCookies, removeTokenFromCookies, getRoleFromCookies } from '@auth/authUtils';
import NotificationModal from '@components/NotificationModal';

interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount: number;
}

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromCookies();
    const userRole = getRoleFromCookies();
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          removeTokenFromCookies();
          setUsername(null);
          setRole(null);
        } else {
          setUsername(decodedToken.sub);
          setRole(userRole || decodedToken.role);
        }
      } catch (error) {
        console.error('Token không hợp lệ:', error);
        removeTokenFromCookies();
      }
    }
  }, []);

  const debouncedSearch = debounce(async (term: string) => {
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/products/search?keyword=${term}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
    }
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Cleanup debounce
    };
  }, []);

  const handleLogout = () => {
    removeTokenFromCookies();
    setUsername(null);
    setRole(null);
    navigate('/login');
  };

  const handleAccountClick = () => {
    setIsNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  const handleOrderTracking = () => {
    navigate('/order-tracking'); // Chuyển đến trang OrderTrackingPage
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </div>
        <button className={styles.menuButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Danh mục
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <li onClick={() => navigate('/laptops')}><i className="fa fa-laptop"></i> Laptop</li>
              {/* <li onClick={() => navigate('/monitors')}><i className="fa fa-tv"></i> Màn hình</li> */}
              <li onClick={() => navigate('/keyboard-showcase')}><i className="fa fa-keyboard"></i> Bàn phím</li>
              {/* <li onClick={() => navigate('/mices')}><i className="fa fa-mouse"></i> Chuột</li> */}
            </ul>
          </div>
        )}
        <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && searchResults.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {searchResults.map((item) => (
                <li key={item.id} onClick={() => navigate(`/products/${item.id}`)}>
                  <img src={item.imageUrl} alt={item.name} className={styles.productImage} />
                  <div>
                    <p>{item.name}</p>
                    <p>
                      {item.discount > 0 ? (
                        <>
                          <span className={styles.discountedPrice}>
                            {(
                              item.price * (1 - item.discount / 100)
                            ).toLocaleString()}
                            đ
                          </span>{' '}
                          <span className={styles.originalPrice}>{item.price.toLocaleString()}đ</span>
                        </>
                      ) : (
                        <span>{item.price.toLocaleString()}đ</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
        <div className={styles.icons}>
          <div className={styles.iconItem}>
            <i className="fa fa-phone"></i>
            <span>Hotline 1900.5301</span>
          </div>
          {/* <div className={styles.iconItem}>
            <i className="fa fa-map-marker"></i>
            <span>Hệ thống Showroom</span>
          </div> */}
          <div
            className={styles.iconItem}
            onClick={handleOrderTracking} // Gọi hàm xử lý khi nhấn
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-truck"></i>
            <span>Tra cứu đơn hàng</span>
          </div>
          <div className={styles.iconItem} onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
            <i className="fa fa-shopping-cart"></i>
            <span>Giỏ hàng</span>
          </div>
          {username && role !== 'admin' ? (
            <div className={styles.iconItem} style={{ cursor: 'pointer' }} onClick={handleAccountClick}>
              <i className="fa fa-user"></i>
              <span>{username}</span>
            </div>
          ) : (
            <div className={styles.iconItem} onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
              <i className="fa fa-user"></i>
              <span>Đăng nhập</span>
            </div>
          )}
        </div>
      </div>
      {isNotificationOpen && <NotificationModal onClose={handleCloseNotification} />}
    </header>
  );
};

export default Header;
