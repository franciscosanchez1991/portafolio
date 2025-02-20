package com.proyecto.portafolio.models;

import java.sql.Date;
import javax.persistence.*;

@Entity
@Table(name = "transactions")
public class Transactions {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transaction")
    private int idTransaction;
    
    @Column(nullable = false)
    private int quantity;
    
    @Column(name = "total_amount", nullable = false)
    private float total_amount;
    
    @Column(nullable = false)
    private Date date;
    
    @Column(nullable = false)
    private int type; // 1 = sale, 2 = purchase, 3 = replenishment

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    public int getIdTransaction() {
        return idTransaction;
    }
    public void setIdTransaction(int idTransaction) {
        this.idTransaction = idTransaction;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public float getTotal_amount() {
        return total_amount;
    }
    public void setTotal_amount(float total_amount) {
        this.total_amount = total_amount;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
    public Inventory getInventory() {
        return inventory;
    }
    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    
}
