package com.proyecto.portafolio.dao;

import java.util.List;

import com.proyecto.portafolio.models.User;

public interface UserDao {
    List<User> getUsers();

    User getUserById(int id);

    void updateUser(User user);

    void deleteUser(User user);

    void createUser(User user);
}
