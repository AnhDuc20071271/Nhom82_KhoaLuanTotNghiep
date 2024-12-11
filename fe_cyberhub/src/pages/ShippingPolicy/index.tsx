// src/pages/ShippingPolicy/index.tsx
import React from 'react';
import Header from '../../components/Header'; // Đường dẫn tùy thuộc vào vị trí file Header
import Footer from '../../components/Footer'; // Đường dẫn tùy thuộc vào vị trí file Footer
import styles from './ShippingPolicy.module.css';

const ShippingPolicy: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.shippingPolicy}>
                <div className={styles.breadcrumb}>
                    <a href="#">Trang chủ</a> / <span>Chính sách vận chuyển</span>
                </div>
                <h1>Chính sách vận chuyển</h1>
                <p>
                    CyberHUB cung cấp dịch vụ giao hàng toàn quốc, gửi hàng tận nơi đến địa chỉ cung cấp của Quý khách.
                    Thời gian giao hàng dự kiến phụ thuộc vào kho và địa chỉ nhận hàng của Quý khách.
                </p>
                <p>
                    Với đa phần đơn hàng, CyberHUB cần vài giờ làm việc để kiểm tra thông tin và đóng gói hàng. Nếu các sản phẩm đều có sẵn CyberHUB sẽ nhanh chóng bàn giao cho đối tác vận chuyển.
                </p>
                
                <h2>Phí dịch vụ giao hàng</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Giá trị đơn hàng</th>
                            <th>Khu vực HCM</th>
                            <th>Khu vực Ngoại thành</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3}><strong>GIAO HÀNG NHANH 2H ĐẾN 4H</strong></td>
                        </tr>
                        <tr>
                            <td>Đơn hàng dưới 1 triệu đồng</td>
                            <td>40.000 vnd</td>
                            <td>Không áp dụng</td>
                        </tr>
                        <tr>
                            <td>Đơn hàng trên 1 triệu đồng</td>
                            <td>Miễn phí</td>
                            <td>Không áp dụng</td>
                        </tr>
                        <tr>
                            <td colSpan={3}><strong>GIAO HÀNG TIÊU CHUẨN</strong></td>
                        </tr>
                        <tr>
                            <td>Đơn hàng dưới 1 triệu đồng</td>
                            <td>25.000 vnd</td>
                            <td>40.000 vnd</td>
                        </tr>
                        <tr>
                            <td>Đơn hàng trên 1 triệu đồng</td>
                            <td>Miễn phí</td>
                            <td>Miễn phí</td>
                        </tr>
                    </tbody>
                </table>
                <p className={styles.effectiveDate}>Chính sách này có hiệu lực từ ngày 20 tháng 03 năm 2024.</p>

                <h2>Thời gian dự kiến giao hàng</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tuyến</th>
                            <th>Khu vực</th>
                            <th>Thời gian dự kiến</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hồ Chí Minh – Hồ Chí Minh<br /></td>
                            <td>Nội Thành<br />Ngoại Thành</td>
                            <td>1 - 2 ngày</td>
                        </tr>
                        
                    </tbody>
                </table>
                
                <h2>Một số lưu ý khi nhận hàng</h2>
                <ul>
                    <li>Trước khi tiến hành giao hàng cho Quý khách, Hỗ trợ kỹ thuật của CyberHUB sẽ liên hệ qua số điện thoại của Quý khách trước khoảng 3 đến 5 phút để xác nhận giao hàng.</li>
                    <li>Áp dụng cho đơn hàng giao hàng tiêu chuẩn, nếu Quý khách không thể có mặt trong đợt nhận hàng thứ nhất, bưu tá sẽ cố gắng liên lạc lại thêm ít nhất 2 lần nữa.</li>
                    <li>Khi nhận hàng, Quý khách vui lòng quay lại video quá trình khui nhận hàng hóa.</li>
                    <li>Trong trường hợp đơn hàng đang giao đến Quý khách có ngoại quan bên ngoài hộp hàng hóa có dấu hiệu bị rách, móp, ướt, thủng, mất niêm phong,…Quý khách vui lòng kiểm tra kỹ chất lượng sản phẩm bên trong trước khi nhận hàng.</li>
                    <li>Mọi thông tin về việc thay đổi sản phẩm hay hủy đơn hàng, đề nghị Quý khách thông báo sớm để CyberHUB có thể điều chỉnh lại đơn hàng.</li>
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default ShippingPolicy;
