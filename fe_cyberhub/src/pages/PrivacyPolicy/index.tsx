// src/pages/PrivacyPolicy/index.tsx
import React from 'react';
import Header from '../../components/Header'; // Đường dẫn đến Header
import Footer from '../../components/Footer'; // Đường dẫn đến Footer
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.privacyPolicy}>
                <div className={styles.breadcrumb}>
                    <a href="/">Trang chủ</a> / <span>Chính sách bảo mật</span>
                </div>
                <h1>Chính sách bảo mật</h1>

                <h2>1. Mục đích và phạm vi thu thập thông tin</h2>
                <p>
                    CyberHUB không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng thu thập trên trang web cho
                    một bên thứ ba nào khác. Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty.
                </p>
                <p>Khi bạn liên hệ đăng ký dịch vụ, thông tin cá nhân mà CyberHUB thu thập bao gồm:</p>
                <ul>
                    <li>Họ và tên</li>
                    <li>Địa chỉ</li>
                    <li>Điện thoại</li>
                    <li>Email</li>
                    <li>Các thông tin về dịch vụ như tên sản phẩm, số lượng, thời gian giao nhận sản phẩm</li>
                </ul>

                <h2>2. Phạm vi sử dụng thông tin</h2>
                <p>
                    Thông tin cá nhân thu thập được sẽ chỉ được CyberHUB sử dụng trong nội bộ công ty và cho một hoặc tất cả
                    các mục đích sau đây:
                </p>
                <ul>
                    <li>Hỗ trợ khách hàng</li>
                    <li>Cung cấp thông tin liên quan đến dịch vụ</li>
                    <li>Xử lý đơn đặt hàng và cung cấp dịch vụ</li>
                </ul>
                <p>
                    CyberHUB có thể sẽ gửi thông tin sản phẩm, dịch vụ mới nếu quý khách đăng ký nhận email thông báo. Trong
                    trường hợp có yêu cầu của pháp luật, công ty có trách nhiệm cung cấp thông tin theo yêu cầu từ cơ quan
                    tư pháp.
                </p>

                <h2>3. Thời gian lưu trữ thông tin</h2>
                <p>
                    Đối với thông tin cá nhân, CyberHUB chỉ xóa đi dữ liệu này nếu khách hàng có yêu cầu qua email: 
                    <a href="mailto:cskh@cyberhub.com">cskh@cyberhub.com</a>.
                </p>

                <h2>4. Những người hoặc tổ chức có thể được tiếp cận với thông tin cá nhân</h2>
                <ul>
                    <li>Cửa Hàng CyberHUB</li>
                    <li>
                        Các đối tác có ký hợp đồng thực hiện 1 phần dịch vụ do  CyberHUB cung cấp. Đối tác này sẽ nhận thông
                        tin cần thiết để hỗ trợ người dùng.
                    </li>
                </ul>

                <h2>5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</h2>
                <p>
                    Cửa hàng CyberHUB<br />
                    Địa chỉ: 72 Hoàng Hoa Thám, Phường 12, Quận Tân Bình, TP Hồ Chí Minh<br />
                    Điện thoại: 1800 6175<br />
                    Email: <a href="mailto:cskh@cyberhub.com">cskh@cyberhub.com</a>
                </p>

                <h2>6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</h2>
                <p>
                    CyberHUB không thu thập thông tin khách hàng qua trang web, mà qua email và số điện thoại liên hệ.
                    Khách hàng có thể yêu cầu chỉnh sửa dữ liệu cá nhân qua các phương tiện này.
                </p>

                <h2>7. Cơ chế tiếp nhận và giải quyết khiếu nại</h2>
                <p>
                    CyberHUB cam kết bảo vệ thông tin cá nhân của khách hàng. Trong bất kỳ trường hợp có thắc mắc hoặc khiếu
                    nại nào, khách hàng có thể liên hệ qua số Hotline 1800 6975 hoặc email:
                    <a href="mailto:cskh@cyberhub.com">cskh@cyberhub.com</a>.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
