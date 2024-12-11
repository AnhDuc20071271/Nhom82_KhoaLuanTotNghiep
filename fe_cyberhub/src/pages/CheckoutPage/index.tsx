// src/pages/CheckoutPage/CheckoutPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { createOrders, OrderData, OrderItem } from '../../api/orders';
import { fetchProfile } from '../../api/profileApi';
import {
  getTokenFromCookies,
  setCustomerInfoToCookies,
  setOrderIdToCookies,
} from '../../auth/authUtils';

interface CartItem {
  id: number;
  name: string;
  originalPrice: number | null;
  discountPrice: number | null;
  imageUrl: string;
  quantity: number;
}

interface Province {
  code: number;
  name: string;
}

interface District {
  code: number;
  name: string;
}

interface Ward {
  code: number;
  name: string;
}

const CheckoutPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<number | null>(null);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Thêm state cho customerId
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [profileLoading, setProfileLoading] = useState(true); // Để biết đang load profile

  useEffect(() => {
    // Fetch provinces
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((err) => console.error(err));

    // Load cart
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    } else {
      const calculatedTotalPrice = cartItems.reduce((total, item) => {
        return total + (item.discountPrice || 0) * item.quantity;
      }, 0);
      setTotalPrice(calculatedTotalPrice);
      localStorage.setItem('totalPrice', calculatedTotalPrice.toString());
    }

    // Fetch profile để lấy customerId
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();
        if (!profileData.customerId) {
          setErrorMessage('Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.');
        } else {
          setCustomerId(profileData.customerId);
          // Có thể tự động điền name, phone từ profile:
          setName(profileData.firstName + ' ' + profileData.lastName);
          setPhone(profileData.phone);
        }
      } catch (error: any) {
        setErrorMessage(error.message || 'Không thể load thông tin người dùng.');
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = parseInt(e.target.value);
    setSelectedProvinceCode(provinceCode);
    setCity(e.target.options[e.target.selectedIndex].text);
    setDistrict('');
    setWard('');
    setDistricts([]);
    setWards([]);

    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts);
      })
      .catch((err) => console.error(err));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtCode = parseInt(e.target.value);
    setSelectedDistrictCode(districtCode);
    setDistrict(e.target.options[e.target.selectedIndex].text);
    setWard('');
    setWards([]);

    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data.wards);
      })
      .catch((err) => console.error(err));
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedW = wards.find((w) => w.code.toString() === e.target.value);
    if (selectedW) {
      setWard(selectedW.name);
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra các trường thông tin bắt buộc
    if (!name || !phone || !city || !district || !ward || !address) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    // Nếu profile chưa load xong hoặc không có customerId
    if (profileLoading) {
      setErrorMessage('Đang tải thông tin khách hàng, vui lòng chờ...');
      return;
    }

    if (!customerId) {
      setErrorMessage('Không thể tạo đơn hàng vì không tìm thấy customerId.');
      return;
    }

    const customerInfo = {
      name,
      phone,
      address: `${address}, ${ward}, ${district}, ${city}`,
    };
    setCustomerInfoToCookies(JSON.stringify(customerInfo));

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.discountPrice || item.originalPrice || 0,
    }));

    const orderData: OrderData = {
      customerId: customerId,
      totalPrice: totalPrice,
      status: 'Pending',
      addressLine: address,
      ward: ward,
      district: district,
      city: city,
      specialNotes: '',
      invoiceRequired: false,
      products: orderItems,
    };

    setIsLoading(true);
    setErrorMessage('');

    try {
      const token = getTokenFromCookies() || '';
      const response = await createOrders(orderData, token);
      console.log('Đơn hàng được tạo:', response);
      setOrderIdToCookies(response.id.toString());
      navigate('/payment');
    } catch (error: any) {
      setErrorMessage(error.message || 'Đã có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/cart');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
  };

  return (
    <div>
      <Header />
      <div className={styles.checkoutContainer}>
        <div className={styles.cartSteps}>
          <div className={`${styles.stepItem} ${styles.completedStep}`}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>1</span>
            </div>
            <p>Giỏ hàng</p>
          </div>
          <div className={`${styles.stepLine} ${styles.activeLine}`}></div>
          <div className={`${styles.stepItem} ${styles.activeStep}`}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>2</span>
            </div>
            <p>Thông tin đặt hàng</p>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.stepItem}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>3</span>
            </div>
            <p>Thanh toán</p>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.stepItem}>
            <div className={styles.stepCircle}>
              <span className={styles.stepNumber}>4</span>
            </div>
            <p>Hoàn tất</p>
          </div>
        </div>

        <form className={styles.orderForm} onSubmit={handleOrderSubmit}>
          <div className={styles.customerInfo}>
            <h3>Thông tin khách mua hàng</h3>
            <div className={styles.inputGroup}>
              <label>
                <input type="radio" name="gender" value="Anh" defaultChecked /> Anh
              </label>
              <label>
                <input type="radio" name="gender" value="Chị" /> Chị
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Nhập họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.deliveryInfo}>
            <h3>Chọn cách nhận hàng</h3>
            <label>
              <input type="radio" name="delivery" defaultChecked /> Giao hàng tận nơi
            </label>

            <div className={styles.inputGroup}>
              <select value={selectedProvinceCode || ''} onChange={handleProvinceChange}>
                <option value="">Chọn Tỉnh, Thành phố</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedDistrictCode || ''}
                onChange={handleDistrictChange}
                disabled={!selectedProvinceCode}
              >
                <option value="">Chọn Quận, Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <select
                value={wards.find((w) => w.name === ward)?.code || ''}
                onChange={handleWardChange}
                disabled={!selectedDistrictCode}
              >
                <option value="">Chọn Phường, Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Số nhà, tên đường"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          {isLoading && <p>Đang xử lý đơn hàng...</p>}

          <div className={styles.totalPrice}>
              <p className={styles.totalPriceLabel}>Tổng tiền:</p>
              <p className={styles.totalPriceValue}>
                {formatPrice(totalPrice)}
                <span>đ</span>
              </p>
            </div>

          <button
            type="submit"
            className={styles.orderButton}
            disabled={!customerId || profileLoading} // Disable nếu chưa load xong profile hoặc chưa có customerId
          >
            ĐẶT HÀNG NGAY
          </button>
          <button type="button" className={styles.backButton} onClick={handleGoBack}>
            Trở về
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
