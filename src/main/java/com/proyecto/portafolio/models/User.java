package com.proyecto.portafolio.models;

import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {

    private List<String> characters = List.of("Vendedor", "Administrador", "reponedor");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(nullable = false)
    private String username; 
    
    @Column(nullable = false)
    private String password;

    @Column(name = "login_date", nullable = false)
    private Date login_date;
    
    @Column(name = "character")
    private String character;

    //generic getters and setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Date getLogin_date() {
        return login_date;
    }
    public void setLogin_date(Date login_date) {
        this.login_date = login_date;
    }
    //////////////////////////
    
    public void updateCharacter(int userId, String character) {
        // Aquí actualizas el personaje seleccionado por el usuario
        if (characters.contains(character)) {
            // Actualizas el personaje en la base de datos
            this.character = character;            
        }
    }
    
    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }
}
