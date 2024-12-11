// src/components/Invoice.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Invoice.module.css';
import { fetchOrderDetailById } from '@api/ordersDetailApi';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  description: string;
  nsx: string;
  stock: number;
  imageUrl: string;
}

interface OrderDetail {
  id: number;
  quantity: number;
  price: number;
  order: number;
  product: Product;
}

interface ShippingInfo {
  shippingId: number;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
  specialNotes: string;
  invoiceRequired: boolean;
  companyName?: string;
  taxCode?: string;
}

interface InvoiceData {
  id: number;
  orderDate: string;
  totalPrice: number;
  status: string;
  invoiceNumber: string;
  note: string | null;
  orderDetails: OrderDetail[];
  shippingInfo: ShippingInfo;
}

const Invoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (id) {
        try {
          const data = await fetchOrderDetailById(parseInt(id));
          setInvoiceData(data);
        } catch (error) {
          console.error('Không thể lấy dữ liệu hóa đơn:', error);
        }
      }
    };

    fetchInvoiceData();
  }, [id]);

  if (!invoiceData || !invoiceData.orderDetails) {
    return <p>Không có dữ liệu</p>;
  }

  const downloadInvoice = () => {
    if (!invoiceRef.current) return;
    html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.save('invoice.pdf');
    });
  };

  const totalVAT = invoiceData.totalPrice * 0.1;
  const totalWithVAT = invoiceData.totalPrice + totalVAT;

  return (
    <div className="invoice-page">
      <div ref={invoiceRef} className="invoice-container">
        {/* Tiêu đề hóa đơn */}
        <h2 className="invoice-title">HÓA ĐƠN GIÁ TRỊ GIA TĂNG</h2>
        <p className="invoice-subtitle">VAT INVOICE</p>

        {/* Ngày, ký hiệu, số hóa đơn, mã số thuế */}
        <div className="invoice-header">
          <div className="invoice-date">
            Ngày(Date){' '}
            {new Date(invoiceData.orderDate).getDate().toString().padStart(2, '0')}{' '}
            tháng(month){' '}
            {(new Date(invoiceData.orderDate).getMonth() + 1)
              .toString()
              .padStart(2, '0')}{' '}
            năm(year) {new Date(invoiceData.orderDate).getFullYear()}
          </div>
          <div className="invoice-serial">
            Ký hiệu(Serial): 1C24TDP Số(No.): {invoiceData.invoiceNumber}
          </div>
          <div className="invoice-taxcode">
            Mã của CQT: 0022A0764A4B694B189CD1BB0A64478041
          </div>
        </div>

        {/* Thông tin người bán */}
        <div className="seller-info">
          <p className="section-title">Đơn vị bán hàng (Seller)</p>
          <p>
            <strong>Công ty:</strong> CÔNG TY TNHH XYZ
          </p>
          <p>
            <strong>Mã số thuế (VAT code):</strong> 0123456789
          </p>
          <p>
            <strong>Địa chỉ (Address):</strong> 123 Đường ABC, Quận 1, TP.HCM
          </p>
          <p>
            <strong>Điện thoại (Tel):</strong> 02871089666
          </p>
          <p>
            <strong>Số tài khoản (A/C No.):</strong> 1234567890
          </p>
        </div>

        {/* Thông tin người mua */}
        <div className="buyer-info">
          <p className="section-title">Họ tên người mua hàng (Buyer)</p>
          <p>
            <strong>Khách hàng:</strong> {invoiceData.shippingInfo.addressLine}
          </p>
          <p>
            <strong>Tên đơn vị (Company's name):</strong>{' '}
            {invoiceData.shippingInfo.companyName || ''}
          </p>
          <p>
            <strong>Mã số thuế (Tax code):</strong>{' '}
            {invoiceData.shippingInfo.taxCode || ''}
          </p>
          <p>
            <strong>Hình thức thanh toán (Payment method):</strong> TM, CK
          </p>
          <p>
            <strong>Địa chỉ (Address):</strong>{' '}
            {`${invoiceData.shippingInfo.addressLine}, ${invoiceData.shippingInfo.ward}, ${invoiceData.shippingInfo.district}, ${invoiceData.shippingInfo.city}`}
          </p>
        </div>

        {/* Bảng sản phẩm */}
        <table className="products-table">
          <thead>
            <tr>
              <th>
                STT<br />(No.)
              </th>
              <th>
                Tên hàng hóa, dịch vụ<br />(Description)
              </th>
              <th>
                Đơn vị tính<br />(Unit)
              </th>
              <th>
                Số lượng<br />(Quantity)
              </th>
              <th>
                Đơn giá<br />(Unit price)
              </th>
              <th>
                Thành tiền<br />(Chưa thuế GTGT)<br />(Amount not VAT)
              </th>
              <th>
                TS GTGT<br />(VAT rate)
              </th>
              <th>
                Tiền thuế<br />(VAT)
              </th>
              <th>
                Thành tiền<br />(Gồm thuế GTGT)<br />(Amount)
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.orderDetails.map((orderDetail, index) => {
              const amountNotVAT = orderDetail.price * orderDetail.quantity;
              const vat = amountNotVAT * 0.1;
              const amountWithVAT = amountNotVAT + vat;

              return (
                <tr key={orderDetail.id}>
                  <td>{index + 1}</td>
                  <td>{orderDetail.product.name}</td>
                  <td>Cái</td>
                  <td>{orderDetail.quantity}</td>
                  <td>{orderDetail.price.toLocaleString()}</td>
                  <td>{amountNotVAT.toLocaleString()}</td>
                  <td>10%</td>
                  <td>{vat.toLocaleString()}</td>
                  <td>{amountWithVAT.toLocaleString()}</td>
                </tr>
              );
            })}
            {/* Thêm các dòng trống nếu cần */}
            {Array.from({ length: 5 - invoiceData.orderDetails.length }).map(
              (_, index) => (
                <tr key={`empty-${index}`}>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Phần tổng cộng */}
        <div className="total-section">
          <div className="total-row">
            <div>
              <strong>Cộng tiền hàng (Total amount):</strong>
            </div>
            <div>{invoiceData.totalPrice.toLocaleString()} VND</div>
          </div>
          <div className="total-row">
            <div>
              <strong>Thuế GTGT (VAT 10%):</strong>
            </div>
            <div>{totalVAT.toLocaleString()} VND</div>
          </div>
          <div className="total-row">
            <div>
              <strong>Tổng cộng thanh toán (Total amount):</strong>
            </div>
            <div>{totalWithVAT.toLocaleString()} VND</div>
          </div>
          <div className="amount-in-words">
            <strong>Số tiền viết bằng chữ (Amount in words):</strong>{' '}
            {numberToWords(totalWithVAT)} đồng
          </div>
        </div>

        {/* Phần chữ ký */}
        <div className="signatures">
          <div className="signature">
            <p>Người mua hàng (Buyer)</p>
            <p>Ký, ghi rõ họ tên</p>
            <p>(Sign & full name)</p>
          </div>
          <div className="signature">
            <p>Người bán hàng (Seller)</p>
            <p>Ký, đóng dấu, ghi rõ họ tên</p>
            <p>(Sign, stamp & full name)</p>
          </div>
        </div>

        {/* Ghi chú cuối trang */}
        <div className="footer-note">
          (Cần kiểm tra, đối chiếu khi lập, giao nhận hóa đơn / Need to check and
          compare when making and delivering invoices)
        </div>
      </div>
      <button onClick={downloadInvoice} className="download-button">
        Tải Hóa Đơn
      </button>
    </div>
  );
};

// Hàm chuyển số thành chữ (Bạn cần triển khai hoặc sử dụng thư viện)
function numberToWords(number: number): string {
  // Triển khai hàm chuyển số thành chữ ở đây
  return 'Số tiền bằng chữ';
}

export default Invoice;
