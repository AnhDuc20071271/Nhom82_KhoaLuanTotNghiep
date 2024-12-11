import React from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage'; 
import RegisterPopUp from './pages/RegisterPopUp';
import LoginPopUp from './pages/LoginPopUp';
import Chatbot from './components/Chatbot';
import DashBoardPopUp from './pages/DashBoardPopUp';
import Cart from './pages/Cart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductDetailPage from './pages/ProductDetailPage'; // Dùng cho Monitor
import LaptopDetailPage from './pages/LaptopDetailPage';
import LaptopPage from './pages/LaptopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import CompletePage from './pages/CompletePage';
import AccountDetail from './components/AccountDetail';
import OrderHistory from '@components/OrderHistory';
import KeyboardList from './components/KeyboardList';
import KeyboardDetailPage from './pages/KeyboardDetailPage';
import KeyboardShowcase from './components/KeyboardShowcase';
import MouseList from './components/Mouse';
import MouseDetailPage from './pages/MouseDetailPage';
import MousePage from './pages/MousePage';
import ShippingPolicy from './pages/ShippingPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import WarrantyPolicy from './pages/WarrantyPolicy';
import NotFoundPage from './pages/NotFoundPage';
import OrderDetailPage from './pages/OrderDetailPage';
import Invoice from './components/Invoice';
import ConfirmPage from './components/ConfirmPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfileInfo from './pages/ProfileInfo';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

Modal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<HomePage />} />

          {/* Popup Đăng nhập & Đăng ký */}
          <Route path="/login" element={<LoginPopUp />} />
          <Route path="/register" element={<RegisterPopUp />} />

          {/* Chatbox và Dashboard */}
          <Route path="/chatbox" element={<Chatbot />} />
          <Route path="/admin/dashboard" element={<DashBoardPopUp />} />

          {/* Giỏ hàng */}
          <Route path="/cart" element={<Cart />} />

          {/* Route chi tiết sản phẩm cho Monitor */}
          <Route path="/products/:id" element={<ProductDetailPage />} /> 

          {/* Routes chi tiết cho từng danh mục khác */}
          <Route path="/laptops/:id" element={<LaptopDetailPage />} />
          <Route path="/keyboards/:id" element={<KeyboardDetailPage />} />
          <Route path="/mice/:id" element={<MouseDetailPage />} />

          {/* Route chi tiết sản phẩm mới từ ProductNewList */}

          {/* Các trang danh mục */}
          <Route path="/laptops" element={<LaptopPage />} />
          <Route path="/monitors" element={<ProductPage />} />
          <Route path="/keyboards" element={<KeyboardList />} />
          <Route path="/mice" element={<MousePage />} />

          {/* Các trang thanh toán và hoàn thành */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/complete" element={<CompletePage />} />

          {/* Thông tin tài khoản và lịch sử đơn hàng */}
          <Route path="/myaccount" element={<ProfileInfo />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-history/:orderId" element={<OrderDetailPage />} />

          {/* Các trang chính sách */}
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
          <Route path="/warranty-policy" element={<WarrantyPolicy />} />

          {/* Các trang khác */}
          <Route path="/keyboard-showcase" element={<KeyboardShowcase />} />
          <Route path="/order-detail" element={<OrderDetailPage />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/confirm" element={<ConfirmPage />} />

          {/* Trang tra cứu đơn hàng */}
          <Route path="/order-tracking" element={<OrderTrackingPage />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Trang 404 */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
