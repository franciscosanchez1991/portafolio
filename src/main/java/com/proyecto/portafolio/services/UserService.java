package com.proyecto.portafolio.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.portafolio.dao.UserDao;
import com.proyecto.portafolio.models.User;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public void updateCharacter(int userId, String character) {
        // Aquí actualizas el personaje del usuario en la base de datos
        User user = userDao.getUserById(userId);
        user.setCharacter(character);
        userDao.updateUser(user);
    }
}
