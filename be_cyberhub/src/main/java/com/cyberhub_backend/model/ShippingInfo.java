package com.cyberhub_backend.model;

import javax.persistence.*;

@Entity
@Table(name = "ShippingInfo")
public class ShippingInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_id")
    private Long shippingId;

    @Column(name = "address_line")
    private String addressLine;

    @Column(name = "ward")
    private String ward;

    @Column(name = "district")
    private String district;

    @Column(name = "city")
    private String city;

    @Column(name = "special_notes")
    private String specialNotes;

    @Column(name = "invoice_required")
    private boolean invoiceRequired;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // Getters và Setters
    public Long getShippingId() {
        return shippingId;
    }

    public void setShippingId(Long shippingId) {
        this.shippingId = shippingId;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getSpecialNotes() {
        return specialNotes;
    }

    public void setSpecialNotes(String specialNotes) {
        this.specialNotes = specialNotes;
    }

    public boolean isInvoiceRequired() {
        return invoiceRequired;
    }

    public void setInvoiceRequired(boolean invoiceRequired) {
        this.invoiceRequired = invoiceRequired;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
