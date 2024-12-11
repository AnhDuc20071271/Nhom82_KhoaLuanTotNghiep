import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderDetailById } from '@api/ordersDetailApi';

const OrdersDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetail, setOrderDetail] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderDetailById(id);
        setOrderDetail(data);
      } catch (error) {
        console.error('Failed to fetch order detail:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!orderDetail) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Detail</h2>
      <p><strong>Invoice Number:</strong> {orderDetail.invoiceNumber}</p>
      <p><strong>Order Date:</strong> {new Date(orderDetail.orderDate).toLocaleDateString()}</p>
      <p><strong>Total Price:</strong> {orderDetail.totalPrice}</p>
      <p><strong>Status:</strong> {orderDetail.status}</p>
      <p><strong>Note:</strong> {orderDetail.note || 'N/A'}</p>

      <h3>Shipping Info</h3>
      <p><strong>Address:</strong> {orderDetail.shippingInfo?.addressLine}, {orderDetail.shippingInfo?.ward}, {orderDetail.shippingInfo?.district}, {orderDetail.shippingInfo?.city}</p>
      <p><strong>Special Notes:</strong> {orderDetail.shippingInfo?.specialNotes || 'N/A'}</p>

      <h3>Products</h3>
      <ul>
        {orderDetail.orderDetails.map((item: any) => (
          <li key={item.product.id}>
            <p><strong>Product ID:</strong> {item.product.id}</p>
            <p><strong>Name:</strong> {item.product.name}</p>
            <p><strong>Category:</strong> {item.product.category}</p>
            <p><strong>Price:</strong> {item.product.price}</p>
            <p><strong>Stock:</strong> {item.product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersDetail;
