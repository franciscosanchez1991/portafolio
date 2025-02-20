package com.proyecto.portafolio.controllers;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.portafolio.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/select-character")
    public ResponseEntity<String> selectCharacter(@RequestBody Map<String, Object> data) {
        int userId = Integer.valueOf(data.get("userId").toString());
        String character = data.get("character").toString();
        userService.updateCharacter(userId, character);
        return ResponseEntity.ok("Personaje seleccionado: " + character);
    }
}