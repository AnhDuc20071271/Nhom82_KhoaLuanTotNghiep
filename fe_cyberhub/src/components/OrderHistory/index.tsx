// src/pages/OrderHistory.tsx

import React, { useState, useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './OrderHistory.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchOrderHistory } from '../../api/orders';
import { fetchProfile } from '../../api/profileApi';  
import { OrderHistoryDTO } from '../../types';
import { removeTokenFromCookies } from '../../auth/authUtils';

const OrderHistory: React.FC = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('2024-01-01'); 
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]); 
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState<OrderHistoryDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const fetchedProfile = await fetchProfile();
                if (fetchedProfile) {
                    setPhone(fetchedProfile.phone);
                    setEmail(fetchedProfile.email);
                }
            } catch (error: any) {
                setError(error.message || 'Đã có lỗi xảy ra khi lấy thông tin người dùng.');
            }
        };
        getProfileData();
    }, []);

    const handleFetchHistory = async () => {
        setLoading(true);
        setError(null);
        setOrders([]);

        try {
            const data = await fetchOrderHistory(phone, email, startDate, endDate);
            setOrders(data);
        } catch (err: any) {
            setError(err.message || 'Đã có lỗi xảy ra khi lấy lịch sử đơn hàng.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (phone || email) {
            handleFetchHistory();
        }
    }, [phone, email, startDate, endDate]);

    const handleLogout = () => {
        removeTokenFromCookies();
        navigate('/login');
    };

    const handleViewDetails = (orderId: number) => {
        navigate(`/order-history/${orderId}`);
    };

    const getDeliveryStatus = (note: string | null) => {
        return note === "Đơn hàng đã được giao thành công!"
            ? "Đã giao hàng"
            : "Đang giao hàng";
    };

    return (
        <div className={styles.orderHistoryContainer}>
            <Header />

            <div className={styles.mainContent}>
                <div className={styles.leftSidebar}>
                    <ul className={styles.sidebarMenu}>
                        <li className={`${styles.menuItem} ${styles.active}`}>Lịch sử mua hàng</li>
                        <li className={styles.menuItem} onClick={() => navigate('/myaccount')}>Tài khoản của bạn</li>
                        <li className={styles.menuItem} onClick={handleLogout}>Thoát tài khoản</li>
                    </ul>
                </div>
                

                <div className={styles.orderContent}>
                    <div className={styles.accountSummary}>
                        <div className={styles.orderCount}>
                            <h2>{orders.length}</h2>
                            <p>đơn hàng</p>
                        </div>
                        <div className={styles.totalAmount}>
                            <h2>
                                {orders.reduce((acc, order) => acc + order.totalPrice, 0).toLocaleString()} VND
                            </h2>
                            <p>Tổng tiền tích lũy</p>
                        </div>
                    </div>

                    <div className={styles.dateFilter}>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={styles.dateInput}
                        />
                        <span> - </span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={styles.dateInput}
                        />
                        <button onClick={handleFetchHistory} className={styles.filterButton}>
                            Lọc
                        </button>
                    </div>

                    {loading && <p>Đang tải...</p>}
                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.filterSection}>
                        <div className={styles.orderTabs}>
                            <button className={`${styles.tabButton} ${styles.active}`}>Tất cả</button>
                            <button className={styles.tabButton}>Chờ xác nhận</button>
                            <button className={styles.tabButton}>Đã xác nhận</button>
                            <button className={styles.tabButton}>Đang vận chuyển</button>
                            <button className={styles.tabButton}>Đã giao hàng</button>
                            <button className={styles.tabButton}>Đã huỷ</button>
                        </div>
                    </div>

                    <div className={styles.orderList}>
                        {orders.length === 0 && !loading && <p>Không có đơn hàng nào trong khoảng thời gian này.</p>}
                        {orders.map((order) => (
                            <div key={order.orderId} className={styles.orderItem}>
                                <div className={styles.productInfo}>
                                    {order.orderDetails.map((product) => (
                                        <div key={product.productId} className={styles.product}>
                                            <img
                                                src={product.imageUrl}
                                                alt={product.productName}
                                                className={styles.productImage}
                                            />
                                            <div>
                                                <h4>{product.productName}</h4>
                                                <p className={styles.orderStatus}>{getDeliveryStatus(order.note)}</p>
                                                <p className={styles.productPrice}>
                                                    Số lượng: {product.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.orderDate}>
                                    {new Date(order.orderDate).toLocaleString()}
                                </div>
                                <div className={styles.orderActions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleViewDetails(order.orderId)}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default OrderHistory;
