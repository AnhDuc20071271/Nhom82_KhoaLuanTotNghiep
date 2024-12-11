import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { Notifications as NotificationsIcon, Email as EmailIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './HeaderAdminDashBoard.module.css';
import { getTokenFromCookies, removeTokenFromCookies } from '../../auth/authUtils';

interface HeaderProps {
    open: boolean;
    toggleDrawer: () => void;
}


const HeaderAdminDashBoard: React.FC<HeaderProps> = ({ open, toggleDrawer }) => {
    const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [profile, setProfile] = useState({ firstName: '', lastName: '', imgURL: '' });


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/myprofile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        removeTokenFromCookies(); // Xóa token khỏi cookies
        navigate('/'); // Điều hướng về trang chủ
        handleMenuClose(); // Đóng menu
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#d32f2f',
                height: '80px',
                transition: 'width 0.3s ease',
                width: open ? `calc(100% - 240px)` : '100%'
            }}
        >
            <Toolbar className={styles.toolbar}>
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ marginRight: '16px' }}>
                    <MenuIcon />
                </IconButton>

                <Box className={styles.logoContainer}>
                    <img src="/logo.png" alt="CyberHub" className={styles.logo} />
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box className={styles.rightIcons}>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <EmailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <Avatar alt={`${profile.firstName} ${profile.lastName}`} src={profile.imgURL} className={styles.avatar} />
                    </IconButton>
                    <Typography variant="body1" className={styles.profileName}>
                        {profile.firstName} {profile.lastName}
                    </Typography>
                    <IconButton onClick={handleProfileMenuOpen}>
                        <span className={styles.dropdownIcon}>▼</span>
                    </IconButton>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Help</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem> {/* Gọi hàm handleLogout */}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderAdminDashBoard;
