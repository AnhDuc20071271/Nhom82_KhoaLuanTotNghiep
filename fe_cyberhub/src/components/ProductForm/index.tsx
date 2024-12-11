import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';

interface ProductFormProps {
  formData: any;
  openForm: boolean;
  editProduct: any;
  setFormData: (formData: any) => void;
  handleCloseForm: () => void;
  handleSaveProduct: (productData: any) => void;
}

const categorySpecs = {
  'Chuột': ['Cảm biến', 'DPI', 'Kết nối', 'LED', 'Trọng lượng', 'Bảo hành'],
  'Bàn Phím': ['Switch', 'Keycaps', 'Kết nối', 'LED', 'Bảo hành'],
  'Màn Hình': ['Kích thước', 'Tấm nền', 'Tần số quét', 'Độ phân giải', 'Cổng kết nối', 'Bảo hành'],
  'PC': ['CPU', 'RAM', 'Ổ cứng', 'VGA', 'Mainboard', 'PSU', 'Case', 'Tản nhiệt'],
  'Laptop Gaming': ['CPU', 'RAM', 'Ổ cứng', 'VGA', 'Màn hình', 'Hệ điều hành'],
};

const ProductForm: React.FC<ProductFormProps> = ({
  formData, openForm, editProduct, setFormData, handleCloseForm, handleSaveProduct
}) => {
  const [specsData, setSpecsData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editProduct && editProduct.basicSpecs) {
      setSpecsData(editProduct.basicSpecs);
    } else {
      // Khởi tạo specsData dựa trên category
      const specsKeys = categorySpecs[formData.category] || [];
      const newSpecsData: { [key: string]: string } = {};
      specsKeys.forEach((key) => {
        newSpecsData[key] = '';
      });
      setSpecsData(newSpecsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProduct, formData.category]);

  useEffect(() => {
    // Khi thay đổi category, cập nhật specsData
    const specsKeys = categorySpecs[formData.category] || [];
    const newSpecsData: { [key: string]: string } = {};
    specsKeys.forEach((key) => {
      newSpecsData[key] = specsData[key] || '';
    });
    setSpecsData(newSpecsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.category]);

  const handleSave = () => {
    // Làm sạch dữ liệu specsData
    const cleanedSpecsData: { [key: string]: string } = {};
    Object.keys(specsData).forEach((key) => {
      const cleanedKey = key.trim();
      const cleanedValue = specsData[key].trim();
      if (cleanedKey && cleanedValue) {
        cleanedSpecsData[cleanedKey] = cleanedValue;
      }
    });

    const productData = {
      ...formData,
      basicSpecs: cleanedSpecsData,
      price: parseFloat(formData.price || 0),
      discount: parseInt(formData.discount || 0, 10),
      stock: parseInt(formData.stock || 0, 10),
    };

    console.log('Payload gửi lên:', JSON.stringify(productData, null, 2));
    handleSaveProduct(productData);
  };

  return (
    <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
      <DialogTitle>{editProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên sản phẩm"
          fullWidth
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Danh mục"
          fullWidth
          select
          SelectProps={{ native: true }}
          value={formData.category || ''}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Chọn danh mục</option>
          {Object.keys(categorySpecs).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Giá"
          fullWidth
          type="number"
          value={formData.price || ''}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Giảm giá (%)"
          fullWidth
          type="number"
          value={formData.discount || ''}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Số lượng"
          fullWidth
          type="number"
          value={formData.stock || ''}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Mô tả"
          fullWidth
          multiline
          rows={3}
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <TextField
          margin="dense"
          label="URL Hình ảnh"
          fullWidth
          value={formData.imageUrl || ''}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />

        {/* Thông số kỹ thuật */}
        {Object.keys(specsData).length > 0 && (
          <>
            <Typography variant="h6" style={{ marginTop: '16px' }}>Thông số kỹ thuật</Typography>
            {Object.keys(specsData).map((specKey) => (
              <TextField
                key={specKey}
                margin="dense"
                label={specKey}
                fullWidth
                value={specsData[specKey] || ''}
                onChange={(e) => setSpecsData({ ...specsData, [specKey]: e.target.value })}
              />
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm} color="primary">Hủy</Button>
        <Button onClick={handleSave} color="primary">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
