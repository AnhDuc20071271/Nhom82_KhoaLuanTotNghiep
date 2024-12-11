// src/components/ProductGridForDashboard/index.tsx

import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, Typography } from '@mui/material';
import styles from './ProductGridForDashboard.module.css';

interface Product {
  id: number;
  name: string;
  category: string; // Loại sản phẩm
  price: number;
  discount: number;
  stock: number;
  description: string;
  imageUrl: string;
}

interface ProductGridForDashboardProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onSelectProduct: (productId: number) => void;
  selectedProducts: number[];
}

const ProductGridForDashboard: React.FC<ProductGridForDashboardProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onSelectProduct,
  selectedProducts,
}) => {
  const [filter, setFilter] = useState({
    category: '',
    stock: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFilter({ ...filter, [name as string]: value });
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory = filter.category ? product.category === filter.category : true;
    const matchStock = filter.stock
      ? filter.stock === 'Còn hàng'
        ? product.stock > 0
        : product.stock === 0
      : true;
    return matchCategory && matchStock;
  });

  return (
    <Box>
      <div className={styles.filterContainer}>
        <Typography variant="h6">Bộ lọc</Typography>
        <Box className={styles.filterBox}>
          <Select
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            displayEmpty
            className={styles.filterSelect}
          >
            <MenuItem value="">Loại sản phẩm</MenuItem>
            <MenuItem value="Laptop">Laptop</MenuItem>
            <MenuItem value="Bàn Phím">Bàn Phím</MenuItem>
            <MenuItem value="Chuột">Chuột</MenuItem>
            <MenuItem value="Màn Hình">Màn Hình</MenuItem>
            <MenuItem value="PC">PC</MenuItem>
            <MenuItem value="Laptop Gaming">Laptop Gaming</MenuItem>
          </Select>

          <Select
            name="stock"
            value={filter.stock}
            onChange={handleFilterChange}
            displayEmpty
            className={styles.filterSelect}
          >
            <MenuItem value="">Trạng thái</MenuItem>
            <MenuItem value="Còn hàng">Còn hàng</MenuItem>
            <MenuItem value="Hết hàng">Hết hàng</MenuItem>
          </Select>

          <Button onClick={() => setFilter({ category: '', stock: '' })} variant="outlined" color="secondary">
            Xóa bộ lọc
          </Button>
        </Box>
      </div>

      <div className={styles.productSummary}>
        <div className={styles.summaryItem}>Tổng sản phẩm <span>{filteredProducts.length}</span></div>
        <div className={styles.summaryItem}>Còn hàng <span>{filteredProducts.filter(p => p.stock > 0).length}</span></div>
        <div className={styles.summaryItem}>Hết hàng <span>{filteredProducts.filter(p => p.stock === 0).length}</span></div>
      </div>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Số thứ tự</th>
            <th>Tên sản phẩm</th>
            <th>Loại sản phẩm</th>
            <th>Giá</th>
            <th>Giảm giá</th>
            <th>Tồn kho</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price} VND</td>
              <td>{product.discount}%</td>
              <td>{product.stock}</td>
              <td className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() => onSelectProduct(product.id)}
                  color={selectedProducts.includes(product.id) ? "success" : "primary"}
                  className={styles.actionButton}
                >
                  {selectedProducts.includes(product.id) ? "Đã chọn" : "Chọn"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default ProductGridForDashboard;
