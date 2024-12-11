// src/components/ConfirmPage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  getDeliveryStaffToken,
  setDeliveryStaffToken,
} from '../../auth/authUtils';
import jwt_decode from 'jwt-decode';
import LoginForm from '../LoginForm';
import Modal from 'react-modal';

const MySwal = withReactContent(Swal);

interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

const ConfirmPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const confirmOrder = async () => {
      console.log('Bắt đầu hàm confirmOrder');

      if (isConfirmed) {
        console.log('Đơn hàng đã được xác nhận trước đó');
        return;
      }

      try {
        console.log('orderId:', orderId);

        if (!orderId) {
          await MySwal.fire({
            icon: 'error',
            title: 'Thiếu thông tin',
            text: 'Mã đơn hàng không tồn tại trong liên kết.',
          });
          return;
        }

        console.log('Kiểm tra xác thực nhân viên giao hàng');

        let localToken = getDeliveryStaffToken(); // Sử dụng token của nhân viên giao hàng

        if (!localToken) {
          console.log('Nhân viên giao hàng chưa xác thực');

          // Lưu trữ orderId vào localStorage
          localStorage.setItem('pendingOrderId', orderId);

          setShowLoginModal(true);
          return;
        }

        console.log('Token:', localToken);

        let decodedToken: DecodedToken;

        try {
          decodedToken = jwt_decode(localToken as string);
          console.log('Decoded token:', decodedToken);
        } catch (error) {
          console.error('Lỗi khi giải mã token:', error);
          setShowLoginModal(true);
          return;
        }

        if (
          decodedToken.role !== 'NhanVienGiaoHang' &&
          decodedToken.role !== 'Shipper'
        ) {
          console.log('Người dùng không có quyền truy cập');
          await MySwal.fire({
            icon: 'error',
            title: 'Truy cập bị từ chối',
            text: 'Bạn không có quyền truy cập trang này.',
          });
          navigate('/');
          return;
        }

        // Hiển thị hộp thoại xác nhận
        const result: SweetAlertResult = await MySwal.fire({
          title: 'Xác nhận đơn hàng',
          text: 'Bạn đã giao đơn hàng này thành công?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Đã giao',
          cancelButtonText: 'Chưa giao',
        });

        console.log('SweetAlert result:', result);

        if (result.isConfirmed) {
          // Người dùng chọn "Đã giao"
          await axios.post(
            `http://localhost:8080/orders/confirm?orderId=${orderId}`,
            {},
            { headers: { Authorization: `Bearer ${localToken}` } }
          );

          await MySwal.fire({
            icon: 'success',
            title: 'Xác nhận thành công',
            text: 'Bạn đã xác nhận đơn hàng đã được giao thành công.',
          });

          setIsConfirmed(true);

          navigate('/');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Người dùng chọn "Chưa giao"
          await MySwal.fire({
            icon: 'info',
            title: 'Bạn đã từ chối xác nhận',
            text: 'Bạn đã chọn chưa giao đơn hàng này.',
          });

          setIsConfirmed(true);

          navigate('/');
        } else {
          // Người dùng đóng hộp thoại bằng cách khác
          navigate('/');
        }
      } catch (error: any) {
        console.error('Error in confirmOrder:', error);

        if (error.response?.status === 403) {
          await MySwal.fire({
            icon: 'error',
            title: 'Truy cập bị từ chối',
            text: 'Bạn không có quyền xác nhận đơn hàng này.',
          });
        } else {
          await MySwal.fire({
            icon: 'error',
            title: 'Xác nhận thất bại',
            text:
              error.response?.data?.message ||
              'Đã xảy ra lỗi khi xác nhận đơn hàng.',
          });
        }

        navigate('/');
      }
    };

    if (!isConfirmed && !showLoginModal) {
      confirmOrder();
    }
  }, [isConfirmed, showLoginModal, orderId, navigate]);

  // Hàm xử lý khi đăng nhập thành công
  const handleLoginSuccess = (token: string) => {
    setDeliveryStaffToken(token); // Lưu token vào Cookies cho nhân viên giao hàng
    setShowLoginModal(false);
  };

  return (
    <div>
      <div>Đang xử lý xác nhận đơn hàng...</div>

      {/* Hiển thị modal đăng nhập nếu chưa đăng nhập */}
      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        contentLabel="Đăng nhập"
        ariaHideApp={false}
      >
        <h2>Đăng nhập nhân viên giao hàng</h2>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </Modal>
    </div>
  );
};

export default ConfirmPage;
