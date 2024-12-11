import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './ShippersForm.module.css';

const MySwal = withReactContent(Swal);

const ShippersForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Tất cả các trường đều là thông tin quan trọng và không được để trống.',
        confirmButtonText: 'Đồng ý'
      });
      return;
    }

    // Xác nhận trước khi gửi dữ liệu
    MySwal.fire({
      title: 'Xác nhận!',
      text: 'Bạn có chắc chắn muốn lưu thông tin này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // Thực hiện xử lý lưu dữ liệu ở đây
        MySwal.fire('Đã lưu!', 'Thông tin đã được lưu thành công.', 'success');
      }
    });
  };

  return (
    <div className={styles.shipperForm}>
      <h2>Thông tin Shipper</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Lưu thông tin</button>
      </form>
    </div>
  );
};

export default ShippersForm;
