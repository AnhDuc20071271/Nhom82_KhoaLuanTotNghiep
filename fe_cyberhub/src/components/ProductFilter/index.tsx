// src/components/ProductFilter/index.tsx
import React, { useState } from 'react';
import { Box, Select, MenuItem, TextField, Button } from '@mui/material';

interface FilterProps {
  onFilter: (filters: { category?: string; nsx?: string; status?: string }) => void;
  categories: string[];
  nsx: string[];
}

const ProductFilter: React.FC<FilterProps> = ({ onFilter, categories, nsx }) => {
  const [category, setCategory] = useState('');
  const [selectedNsx, setSelectedNsx] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilter({ category, nsx: selectedNsx, status });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Loại sản phẩm"
        select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      >
        <MenuItem value="">Tất cả</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Nhà sản xuất"
        select
        value={selectedNsx}
        onChange={(e) => setSelectedNsx(e.target.value)}
        fullWidth
      >
        <MenuItem value="">Tất cả</MenuItem>
        {nsx.map((manufacturer) => (
          <MenuItem key={manufacturer} value={manufacturer}>
            {manufacturer}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Trạng thái"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
      >
        <MenuItem value="">Tất cả</MenuItem>
        <MenuItem value="Còn hàng">Còn hàng</MenuItem>
        <MenuItem value="Hết hàng">Hết hàng</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleFilter}>
        Lọc
      </Button>
    </Box>
  );
};

export default ProductFilter;
