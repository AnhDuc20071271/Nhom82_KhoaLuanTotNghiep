// src/pages/DashBoardPopUp/index.tsx

import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Drawer, Toolbar, Button } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import HeaderAdminDashBoard from '@components/HeaderAdminDashBoard';
import MenuAdminDashBoard from '@components/MenuAdminDashBoard';
import ProductGridForDashboard from '@components/ProductGridForDashboard';
import AccountProfilePage from '@components/AccountProfilePage';
import NewsPage from '@components/NewsPage';
import PromotionsPage from '@components/PromotionsPage';
import Welcome from '@components/Welcome';
import ProductForm from '@components/ProductForm';
import UserGridForDashboard from '@components/UserGridForDashboard';
import Shippers from '@components/Shippers';
import ShippingConfirmations from '@components/ShippingConfirmations';
import DeliveryAssignments from '@components/DeliveryAssignments';
import Orders from '@components/Orders';

import { fetchUsers } from '@api/usersApi';
import { getTokenFromCookies } from '@auth/authUtils'; // Giả định có utilities lấy token từ cookies
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@api/productsApi';
import styles from './DashBoardPopUp.module.css';

const drawerWidth = 240;

const DashBoardPopUp: React.FC = () => {
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('products');
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    discount: '',
    stock: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadProducts();
    loadUsers();
    fetchCurrentUserRole();
  }, []);

  // Hàm lấy vai trò người dùng hiện tại từ token trong cookies
  const fetchCurrentUserRole = () => {
    const token = getTokenFromCookies();
    // Giả định giải mã token hoặc lấy từ cookie, ở đây đặt cứng để ví dụ
    const role = token ? 'admin' : 'user';
    setCurrentUserRole(role);
  };

  // Hàm tải sản phẩm
  const loadProducts = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Hàm tải danh sách người dùng và lọc dựa trên vai trò
  const loadUsers = async () => {
    try {
      const usersData = await fetchUsers();
      const filteredUsers = currentUserRole === 'admin'
        ? usersData.filter((user: any) => user.role !== 'admin')
        : usersData;
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // src/pages/DashBoardPopUp/index.tsx

const handleOpenForm = (product?: any) => {
  if (product) {
    setEditProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || '',
      price: product.price != null ? product.price.toString() : '',
      discount: product.discount != null ? product.discount.toString() : '',
      stock: product.stock != null ? product.stock.toString() : '',
      description: product.description || '',
      imageUrl: product.imageUrl || ''
    });
  } else {
    setFormData({
      name: '',
      category: '',
      price: '',
      discount: '',
      stock: '',
      description: '',
      imageUrl: ''
    });
  }
  setOpenForm(true);
};


  const handleCloseForm = () => {
    setOpenForm(false);
    setEditProduct(null);
  };

  // Sửa hàm này để nhận tham số productData
  const handleSaveProduct = async (productData: any) => {
    try {
      if (editProduct) {
        const updatedProduct = await updateProduct(editProduct.id, productData);
        setProducts(products.map((product) => (product.id === editProduct.id ? updatedProduct : product)));
        MySwal.fire('Thành công', 'Sản phẩm đã được cập nhật.', 'success');
      } else {
        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
        MySwal.fire('Thành công', 'Sản phẩm đã được thêm.', 'success');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      MySwal.fire('Lỗi', 'Có lỗi xảy ra khi lưu sản phẩm.', 'error');
    }
    setOpenForm(false);
  };
  

  const handleDeleteProduct = async (productId: number) => {
    const confirmResult = await MySwal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      text: 'Hành động này không thể hoàn tác.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });
  
    if (confirmResult.isConfirmed) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product.id !== productId));
        MySwal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success');
        setSelectedProducts([]);
      } catch (error) {
        console.error('Error deleting product:', error);
        MySwal.fire('Lỗi!', 'Không thể xóa sản phẩm.', 'error');
      }
    }
  };

  const handleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'products':
        return (
          <>
            <Box sx={{ mb: 2 }} className={styles.buttonGrid}>
              <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>Thêm</Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={selectedProducts.length !== 1}
                onClick={() => handleOpenForm(products.find(p => p.id === selectedProducts[0]))}
              >
                Sửa
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={selectedProducts.length === 0}
                onClick={() => handleDeleteProduct(selectedProducts[0])}
              >
                Xóa
              </Button>
            </Box>

            <ProductGridForDashboard
              products={products}
              onEditProduct={handleOpenForm}
              onDeleteProduct={handleDeleteProduct}
              onSelectProduct={handleSelectProduct}
              selectedProducts={selectedProducts}
            />

            <ProductForm
              openForm={openForm}
              handleCloseForm={handleCloseForm}
              formData={formData}
              setFormData={setFormData}
              handleSaveProduct={handleSaveProduct}
              editProduct={editProduct}
            />
          </>
        );
      case 'users':
        return (
          <UserGridForDashboard
            users={users}
            currentUserRole={currentUserRole}
            onUpdateRole={loadUsers}
          />
        );
      case 'profile':
        return <AccountProfilePage />;
      case 'news':
        return <NewsPage />;
      case 'promotions':
        return <PromotionsPage />;
      case 'orders':
        return <Orders />;
      case 'shippers':
        return <Shippers />;
      case 'shippingConfirmations':
        return <ShippingConfirmations />;
      case 'deliveryAssignments':
        return <DeliveryAssignments />;
      case 'welcome':
      default:
        return <Welcome />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }} className={styles.container}>
      <CssBaseline />
      <HeaderAdminDashBoard open={open} toggleDrawer={toggleDrawer} />
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50',
            color: '#FFF',
          },
        }}
        className={styles.drawer}
      >
        <MenuAdminDashBoard setPage={setPage} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 0.3s ease',
          marginLeft: open ? `${drawerWidth}px` : '0px',
        }}
        className={styles.mainContent}
      >
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
  );
};

export default DashBoardPopUp;
