import React, { useState } from 'react';
import {
  Box,
  Typography,
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
import { updateUserRole } from '@api/usersApi';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface UserGridForDashboardProps {
  users: User[];
  currentUserRole: string; // Role of the logged-in user
  onUpdateRole: () => void;
}

const UserGridForDashboard: React.FC<UserGridForDashboardProps> = ({
  users,
  currentUserRole,
  onUpdateRole,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');

  // Open dialog for role update
  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // Handle role change
  const handleChangeRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewRole(event.target.value as string);
  };

  // Update user role
  const handleUpdateRole = async () => {
    if (selectedUser) {
      try {
        await updateUserRole(selectedUser.id, newRole);
        onUpdateRole(); // Refresh users after update
      } catch (error) {
        console.error('Error updating role:', error);
      }
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Danh sách người dùng
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) => !(currentUserRole === 'admin' && user.role === 'admin'))
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleOpenDialog(user)}>
                      Chỉnh sửa vai trò
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
        <DialogContent>
          <Select value={newRole} onChange={handleChangeRole} fullWidth>
            <MenuItem value="NhanVien">Nhân viên</MenuItem>
            <MenuItem value="KhachHang">Khách hàng</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleUpdateRole} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserGridForDashboard;
