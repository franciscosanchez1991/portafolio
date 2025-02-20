package com.proyecto.portafolio.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "business")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_business")
    private int idBusiness;

    @Column(nullable = false)
    private String name;    

    @Column(nullable = false)
    private float money;

    @Column(name = "available_products", nullable = false)
    private int available_products;

    @Column(name = "date_lastest_update", nullable = false)
    private Date date_lastest_update;
    
    public int getIdBusiness() {
        return idBusiness;
    }
    public void setIdBusiness(int idBusiness) {
        this.idBusiness = idBusiness;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public float getMoney() {
        return money;
    }
    public void setMoney(float money) {
        this.money = money;
    }
    public int getAvailable_products() {
        return available_products;
    }
    public void setAvailable_products(int available_products) {
        this.available_products = available_products;
    }
    public Date getDate_lastest_update() {
        return date_lastest_update;
    }
    public void setDate_lastest_update(Date date_lastest_update) {
        this.date_lastest_update = date_lastest_update;
    }

    
}
