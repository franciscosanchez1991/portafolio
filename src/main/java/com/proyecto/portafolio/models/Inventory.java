package com.proyecto.portafolio.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inventory")
    private int idInventory;

    @Column(name = "name_product", nullable = false)
    private String name_product;

    @Column(nullable = false)
    private int amount;

    @Column(name = "unitary_price", nullable = false)
    private float unitary_price;

    @Column(name = "update_date", nullable = false)
    private Date update_date;
}
