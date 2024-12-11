package com.cyberhub_backend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ShippingConfirmations")
public class ShippingConfirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "confirmation_id")
    private Long confirmationId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "shipper_id")  // Chỉ định đúng tên cột
    private Shipper shipper;

    @Column(name = "confirmed_at")  // Đảm bảo đúng tên cột trong cơ sở dữ liệu
    @Temporal(TemporalType.TIMESTAMP)
    private Date confirmedAt;

    private String note;

    // Getters và Setters
    public Long getConfirmationId() {
        return confirmationId;
    }

    public void setConfirmationId(Long confirmationId) {
        this.confirmationId = confirmationId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Shipper getShipper() {
        return shipper;
    }

    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }

    public Date getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(Date confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
