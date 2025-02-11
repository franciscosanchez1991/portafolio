package com.proyecto.portafolio.dao;

import java.util.List;

import com.proyecto.portafolio.models.UserModel;

public interface UserDao {
    List<UserModel> getUsers();
}
