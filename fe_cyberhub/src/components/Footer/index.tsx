import React from "react";
import { Link } from "react-router-dom"; // Sử dụng Link từ react-router-dom để định tuyến
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h4>VỀ CYBERHUB</h4>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li>
              <a 
                href="https://cyberhubtech2024.weeblysite.com/tonghopcodeskibidimoinhat2024"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tin Tức
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>CHÍNH SÁCH</h4>
          <ul>
            <li>
              <Link to="/warranty-policy">Chính sách bảo hành</Link>
            </li>
            <li>
              <Link to="/shipping-policy">Chính sách giao hàng</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Chính sách bảo mật</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>THÔNG TIN</h4>
          <ul>
            <li><a href="#">Hệ thống cửa hàng</a></li>
            <li><a href="#">Hướng dẫn mua hàng</a></li>
            <li><a href="#">Tra cứu địa chỉ bảo hành</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)</h4>
          <ul>
            <li>Mua hàng: <a href="tel:19005301">1900.5301</a></li>
            <li>Bảo hành: <a href="tel:19005325">1900.5325</a></li>
            <li>Kiếu nại: <a href="tel:18006173">1800.6173</a></li>
            <li>Email: <a href="mailto:cskh@cyberhub.com">cskh@cyberhub.com</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
