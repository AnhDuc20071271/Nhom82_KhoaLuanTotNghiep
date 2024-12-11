import React, { useState, useEffect } from 'react';
import styles from './WelcomeAnimation.module.css';

const slogans = [
    "Leading the Future of Technology",
    "Empowering Your Digital Life",
    "Innovation Meets Performance",
    "Upgrade Your Tech, Upgrade Your Life"
];

const Welcome: React.FC = () => {
    const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
    const [showWelcome, setShowWelcome] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const sloganInterval = setInterval(() => {
            setCurrentSloganIndex(prev => (prev + 1) % slogans.length);
        }, 2000); // Thay đổi slogan mỗi 2 giây

        const welcomeTimer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setShowWelcome(false), 1000); // 1 giây sau khi bắt đầu mờ dần sẽ kết thúc welcome
        }, 8000); // Sau 8 giây thì chuyển sang body chính

        return () => {
            clearInterval(sloganInterval);
            clearTimeout(welcomeTimer);
        };
    }, []);

    if (!showWelcome) return null;

    return (
        <div className={`${styles.welcomeScreen} ${fadeOut ? styles.fadeOut : ''}`}>
            <div className={styles.contentWrapper}>
                <div className={styles.dot}></div>
                <h1 className={styles.welcomeText}>Welcome to CyberHub Admin</h1>
            </div>
            <p className={styles.slogan}>{slogans[currentSloganIndex]}</p> {/* Hiển thị slogan */}
        </div>
    );
};

export default Welcome;
