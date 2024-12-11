import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders, assignOrderToShipper, updateOrderStatus, deleteOrder } from '@api/orders';
import { fetchNhanVienGiaoHang } from '@api/usersApi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Order {
  id: number;
  orderDate: string;
  totalPrice: number;
  status: string;
  invoiceNumber: string;
  note: string | null;
}

interface User {
  id: number;
  username: string;
  role: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [availableNhanVienGiaoHang, setAvailableNhanVienGiaoHang] = useState<User[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedNhanVienGiaoHangId, setSelectedNhanVienGiaoHangId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cannot load orders',
        });
      }
    };

    const loadAvailableNhanVienGiaoHang = async () => {
      try {
        const nhanVienGiaoHangData = await fetchNhanVienGiaoHang();
        setAvailableNhanVienGiaoHang(nhanVienGiaoHangData);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cannot load NhanVienGiaoHang list',
        });
      }
    };

    loadOrders();
    loadAvailableNhanVienGiaoHang();
  }, []);

  const handleOpenAssignDialog = (order: Order) => {
    setSelectedOrder(order);
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setSelectedOrder(null);
    setSelectedNhanVienGiaoHangId(null);
  };

  const handleAssignOrder = async () => {
    if (selectedOrder && selectedNhanVienGiaoHangId) {
      handleCloseAssignDialog();
  
      try {
        const assignedBy = 1; // Thay bằng ID của admin hiện tại
        await assignOrderToShipper(selectedOrder.id, selectedNhanVienGiaoHangId, assignedBy);
        setOrders(orders.map((order) =>
          order.id === selectedOrder.id ? { ...order, status: 'Assigned' } : order
        ));
  
        // Hiển thị thông báo thành công sau khi đóng dialog
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Order has been successfully assigned!',
        });
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Assign Error',
          text: error.response?.data?.message || 'An error occurred while assigning the order.',
        });
      }
    }
  };

  const handleChangeStatus = async (order: Order) => {
    if (order.note && order.note.includes('Đơn hàng đã được giao thành công!')) {
      // Chỉ cho phép thay đổi trạng thái thành 'Completed'
      try {
        await updateOrderStatus(order.id, 'Completed');
  
        setOrders(orders.map((o) => o.id === order.id ? { ...o, status: 'Completed' } : o));
  
        MySwal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Trạng thái đơn hàng đã được cập nhật thành Completed.',
        });
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể cập nhật trạng thái đơn hàng.',
        });
      }
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Không thể thay đổi trạng thái',
        text: 'Đơn hàng chưa được xác nhận giao hàng thành công.',
      });
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    const result = await MySwal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Bạn có thực sự muốn xóa đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
    });
  
    if (result.isConfirmed) {
      try {
        await deleteOrder(orderId); // Gọi API xóa đơn hàng
        setOrders(orders.filter(order => order.id !== orderId)); // Cập nhật lại danh sách đơn hàng
        MySwal.fire('Đã xóa!', 'Đơn hàng đã được xóa thành công.', 'success');
      } catch (error) {
        MySwal.fire('Lỗi!', 'Không thể xóa đơn hàng.', 'error');
      }
    }
  };
  
  

  const filteredOrders = orders.filter(order => {
    if (!filterStatus) {
      return true;
    }
  
    if (filterStatus === 'Pending') {
      return order.status === 'Pending';
    }
  
    if (filterStatus === 'Assigned') {
      return order.status === 'Assigned';
    }
  
    if (filterStatus === 'Completed') {
      return order.status === 'Completed' && order.note && order.note.includes('Hàng đã được giao thành công!');
    }
  
    return false;
  });

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Cannot load orders',
      });
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as string)} displayEmpty>
        <MenuItem value=""><em>Tất cả</em></MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Assigned">Assigned</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>

      <Button
      variant="contained"
      color="primary"
      onClick={loadOrders}
      sx={{ margin: '30px', padding: '8px 32px' }}
    >
      Refresh
    </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.invoiceNumber}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{order.totalPrice.toLocaleString()} VND</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.note || 'N/A'}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => navigate(`/invoice/${order.id}`)}>
                    View
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleOpenAssignDialog(order)}>
                    Assign
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleChangeStatus(order)}>
                    Change Status
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog}>
        <DialogTitle>Assign Order to NhanVienGiaoHang</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={selectedNhanVienGiaoHangId}
            onChange={(e) => setSelectedNhanVienGiaoHangId(e.target.value as number)}
          >
            {availableNhanVienGiaoHang.map((nhanVienGiaoHang) => (
              <MenuItem key={nhanVienGiaoHang.id} value={nhanVienGiaoHang.id}>
                {nhanVienGiaoHang.username}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog} color="primary">Cancel</Button>
          <Button onClick={handleAssignOrder} color="secondary">Assign</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
