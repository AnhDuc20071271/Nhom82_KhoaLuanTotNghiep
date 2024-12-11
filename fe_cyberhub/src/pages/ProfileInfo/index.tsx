// src/pages/ProfileInfo.tsx

import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../../api/profileApi'; // Hàm fetchProfile bạn đã có
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './ProfileInfo.module.css'; // Tạo file CSS tương ứng nếu cần

interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  imgURL: string;
  email: string;
}

const ProfileInfo: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Đã có lỗi xảy ra khi tải thông tin tài khoản.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) return <p>Đang tải thông tin tài khoản...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!profile) return <p>Không tìm thấy thông tin tài khoản.</p>;

  return (
    <div>
      <Header/>
    <div className={styles.profileContainer}>
      <h2>Thông tin tài khoản</h2>
      <div className={styles.profileCard}>
        <img
          src={profile.imgURL}
          alt={`${profile.firstName} ${profile.lastName}`}
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <p><strong>Họ tên:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Số điện thoại:</strong> {profile.phone}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Địa chỉ:</strong> {profile.address}</p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProfileInfo;
