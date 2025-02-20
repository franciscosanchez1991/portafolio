package com.proyecto.portafolio.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "client")
public class Client {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client")    
    private int idClient;

    @Column(nullable = false)
    private String name;

    @Column(name = "last_name", nullable = false)
    private String last_name;

    @Column(nullable = false)
    private String preferences;

    @Column(name = "last_visit", nullable = false)
    private Date last_visit;
    
    public int getIdClient() {
        return idClient;
    }
    public void setIdClient(int idClient) {
        this.idClient = idClient;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
    public String getPreferences() {
        return preferences;
    }
    public void setPreferences(String preferences) {
        this.preferences = preferences;
    }
    public Date getLast_visit() {
        return last_visit;
    }
    public void setLast_visit(Date last_visit) {
        this.last_visit = last_visit;
    }

    
}
