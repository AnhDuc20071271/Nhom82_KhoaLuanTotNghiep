// src/types/index.ts

export interface OrderDetailExtendedDTO {
    productId: number;
    productName: string;
    imageUrl: string;
    quantity: number;
    price: number; // Thêm trường price
}

export interface OrderHistoryDTO {
    orderId: number;
    orderDate: string; // hoặc Date nếu bạn chuyển đổi ở backend
    totalPrice: number;
    status: string;
    invoiceNumber: string;
    note: string | null;
    orderDetails: OrderDetailExtendedDTO[];
}
