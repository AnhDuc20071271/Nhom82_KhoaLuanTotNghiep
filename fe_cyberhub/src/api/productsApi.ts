import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8080/products';

// Fetch all products
export const fetchProducts = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.content || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const fetchLaptops = async () => {
  try {
    const response = await axios.get('http://localhost:8080/laptops');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải laptop:', error);
    throw error;
  }
};

export const fetchKeyboards = async () => {
  try {
    const response = await axios.get('http://localhost:8080/keyboards');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải bàn phím:', error);
    throw error;
  }
};

export const fetchMice = async () => {
  try {
    const response = await axios.get('http://localhost:8080/mice');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải chuột:', error);
    throw error;
  }
};

// Create a product
export const createProduct = async (productData: any): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const createLaptop = async (productData: any) => {
  try {
    const response = await axios.post('http://localhost:8080/laptops', productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm laptop:', error);
    throw error;
  }
};

export const createKeyboard = async (productData: any) => {
  try {
    const response = await axios.post('http://localhost:8080/keyboards', productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm bàn phím:', error);
    throw error;
  }
};

export const createMouse = async (productData: any) => {
  try {
    const response = await axios.post('http://localhost:8080/mice', productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm chuột:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: number, productData: any): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updateLaptop = async (productId: number, productData: any) => {
  try {
    const response = await axios.put(`http://localhost:8080/laptops/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật laptop:', error);
    throw error;
  }
};

export const updateKeyboard = async (productId: number, productData: any) => {
  try {
    const response = await axios.put(`http://localhost:8080/keyboards/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật bàn phím:', error);
    throw error;
  }
};

export const updateMouse = async (productId: number, productData: any) => {
  try {
    const response = await axios.put(`http://localhost:8080/mice/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật chuột:', error);
    throw error;
  }
};

// Delete a product

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const deleteLaptop = async (productId: number) => {
  try {
    await axios.delete(`http://localhost:8080/laptops/${productId}`);
  } catch (error) {
    console.error('Lỗi khi xóa laptop:', error);
    throw error;
  }
};

export const deleteKeyboard = async (productId: number) => {
  try {
    await axios.delete(`http://localhost:8080/keyboards/${productId}`);
  } catch (error) {
    console.error('Lỗi khi xóa bàn phím:', error);
    throw error;
  }
};

export const deleteMouse = async (productId: number) => {
  try {
    await axios.delete(`http://localhost:8080/mice/${productId}`);
  } catch (error) {
    console.error('Lỗi khi xóa chuột:', error);
    throw error;
  }
};

// Fetch product by ID
export const fetchProductById = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product by ID');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};