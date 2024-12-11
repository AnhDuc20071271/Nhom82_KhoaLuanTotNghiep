// src/pages/WarrantyPolicy/index.tsx
import React from 'react';
import Header from '../../components/Header'; // Đường dẫn đến Header
import Footer from '../../components/Footer'; // Đường dẫn đến Footer
import styles from './WarrantyPolicy.module.css';

const WarrantyPolicy: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.warrantyPolicy}>
                <div className={styles.breadcrumb}>
                    <a href="/">Trang chủ</a> / <span>Chính sách bảo hành</span>
                </div>
                <h1>Chính sách bảo hành</h1>

                <h2>1. Liên hệ bảo hành sản phẩm</h2>
                <p>
                    Khi có nhu cầu bảo hành sản phẩm, khách hàng vui lòng liên hệ với CyberHUB qua các hình thức sau:
                </p>
                <ul>
                    <li>Gọi tổng đài bảo hành 1900.5325</li>
                    <li>Gửi tin nhắn trực tiếp tại website </li>
                    <li>
                        Mang sản phẩm trực tiếp đến các chi nhánh cửa hàng hoặc Trung tâm bảo hành của CyberHUB
                    </li>
                    <li>Mang sản phẩm trực tiếp đến Trung tâm bảo hành của hãng/nhà cung cấp của sản phẩm</li>
                </ul>

                <h2>2. Điều kiện bảo hành</h2>
                <ul>
                    <li>Sản phẩm còn trong thời hạn bảo hành của CyberHUB.</li>
                    <li>Sản phẩm còn tem niêm phong bảo hành hoặc tem của nhà phân phối.</li>
                    <li>Sản phẩm không trầy xước, biến dạng ngoài quy định của hãng/nhà phân phối.</li>
                    <li>
                        Sản phẩm phát sinh lỗi trong quá trình sử dụng do nhà sản xuất như linh kiện, lỗi kỹ thuật.
                    </li>
                </ul>
                <p>
                    Lưu ý: Dữ liệu lưu trữ không thuộc phạm vi bảo hành. CyberHUB không chịu trách nhiệm về bất kỳ mất mát dữ liệu nào.
                </p>

                <h2>3. Sản phẩm không đủ điều kiện bảo hành</h2>
                <ul>
                    <li>Sản phẩm hết hạn bảo hành tại CyberHUB.</li>
                    <li>Sản phẩm không đầy đủ các thiết bị, linh kiện đi kèm.</li>
                    <li>Sản phẩm không có thông tin mua hàng từ CyberHUB.</li>
                    <li>Sản phẩm hư hỏng do lỗi người dùng.</li>
                    <li>
                        Sản phẩm đã có can thiệp sửa chữa, tháo lắp từ bên thứ ba chưa được cho phép của CyberHUB.
                    </li>
                </ul>

                <h2>4. Chính sách bảo hành chung</h2>
                <p>
                    Tất cả các sản phẩm do CyberHUB bán ra đều được bảo hành theo quy định của nhà sản xuất/nhà phân phối.
                </p>

                <h3>4.1 Chính sách đổi mới</h3>
                <p>
                    <strong>Sản phẩm đổi mới trong 7 ngày:</strong> Sản phẩm lỗi từ nhà sản xuất sẽ được đổi mới trong vòng 7 ngày.
                </p>
                <p>
                    <strong>Sản phẩm đổi mới trong 30 ngày:</strong> Đối với gaming gear hoặc linh kiện máy tính, sản phẩm sẽ được đổi mới trong vòng 30 ngày nếu có lỗi từ nhà sản xuất.
                </p>

                <h3>4.2 Thời gian xử lý</h3>
                <p>
                    CyberHUB cam kết xử lý bảo hành trong vòng 30 ngày kể từ ngày tiếp nhận sản phẩm.
                </p>

                <h3>4.3 Xử lý ngoài bảo hành</h3>
                <p>
                    Đối với các sản phẩm do lỗi người dùng, CyberHUB từ chối bảo hành.
                </p>
                <p>
                    Trường hợp sản phẩm không còn linh kiện sửa chữa, khách hàng có thể chọn phương án đổi sản phẩm tương đương hoặc thu hồi sản phẩm với chi phí khấu hao.
                </p>

                <p><strong>CyberHUB xin chân thành cảm ơn quý khách.</strong></p>
                <p className={styles.effectiveDate}>Chính sách bảo hành được CyberHUB cập nhật từ ngày 22/03/2024.</p>
            </div>
            <Footer />
        </>
    );
};

export default WarrantyPolicy;
