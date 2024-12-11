package com.cyberhub_backend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "InvoiceSequence")
public class InvoiceSequence {

    @Id
    @Temporal(TemporalType.DATE)
    private Date invoiceDate;

    @Column(nullable = false)
    private Integer dailyCount;

    // Getters và Setters
    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Integer getDailyCount() {
        return dailyCount;
    }

    public void setDailyCount(Integer dailyCount) {
        this.dailyCount = dailyCount;
    }
}
