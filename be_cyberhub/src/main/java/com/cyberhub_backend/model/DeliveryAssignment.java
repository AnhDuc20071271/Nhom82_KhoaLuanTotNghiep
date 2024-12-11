package com.cyberhub_backend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "DeliveryAssignments")
public class DeliveryAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assignment_id")
    private Long assignmentId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "assigned_by", nullable = false)
    private Long assignedBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to_user_id")
    private User assignedToUser;

    @ManyToOne
    @JoinColumn(name = "assigned_to_shipper_id")
    private Shipper assignedToShipper;

    @Column(name = "assigned_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date assignedAt = new Date();

    // Getters và Setters

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Long getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(Long assignedBy) {
        this.assignedBy = assignedBy;
    }

    public User getAssignedToUser() {
        return assignedToUser;
    }

    public void setAssignedToUser(User assignedToUser) {
        this.assignedToUser = assignedToUser;
    }

    public Shipper getAssignedToShipper() {
        return assignedToShipper;
    }

    public void setAssignedToShipper(Shipper assignedToShipper) {
        this.assignedToShipper = assignedToShipper;
    }

    public Date getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(Date assignedAt) {
        this.assignedAt = assignedAt;
    }
}
