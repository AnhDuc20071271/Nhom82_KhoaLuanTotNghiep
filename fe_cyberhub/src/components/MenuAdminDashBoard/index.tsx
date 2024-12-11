// src/components/MenuAdminDashBoard/index.tsx
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingCart, AccountCircle, Article, LocalOffer, People } from '@mui/icons-material';

const MenuAdminDashBoard: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
  return (
    <div>
      <List component="nav">
        {/* <ListItem button onClick={() => setPage('profile')}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Account Profile" />
        </ListItem> */}

        <ListItem button onClick={() => setPage('products')}>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

        {/* <ListItem button onClick={() => setPage('news')}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="Tin tức công nghệ" />
        </ListItem> */}

        {/* <ListItem button onClick={() => setPage('promotions')}>
          <ListItemIcon>
            <LocalOffer />
          </ListItemIcon>
          <ListItemText primary="Các khuyến mãi" />
        </ListItem> */}

        {/* Thêm menu cho Users */}
        <ListItem button onClick={() => setPage('users')}>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Danh sách người dùng" />
        </ListItem>

        <ListItem button onClick={() => setPage('orders')}>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        {/* <ListItem button onClick={() => setPage('shippers')}>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Shippers" />
        </ListItem> */}

        {/* <ListItem button onClick={() => setPage('shippingConfirmations')}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="Shipping Confirmations" />
        </ListItem> */}

        {/* <ListItem button onClick={() => setPage('deliveryAssignments')}>
          <ListItemIcon>
            <LocalOffer />
          </ListItemIcon>
          <ListItemText primary="Delivery Assignments" />
        </ListItem> */}
      </List>
    </div>
  );
};

export default MenuAdminDashBoard;
