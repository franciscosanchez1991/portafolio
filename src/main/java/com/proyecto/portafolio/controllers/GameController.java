package com.proyecto.portafolio.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.portafolio.dao.WallRequest;
import com.proyecto.portafolio.models.Vector2;
import com.proyecto.portafolio.services.UserService;
import com.proyecto.portafolio.services.WallService;

@RestController
@RequestMapping("/api/game")
public class GameController {
    @Autowired
    private WallService wallService;
    @Autowired
    private UserService userService;

    @PostMapping("/walls")
    public ResponseEntity<?> addWall(@RequestBody WallRequest request) {
        Vector2 start = new Vector2(request.getStartX(), request.getStartY());
        Vector2 end = new Vector2(request.getEndX(), request.getEndY());
        WallService.Wall wall = new WallService.Wall(start, end, request.getThickness());
        wallService.addWall(wall);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/collision")
    public ResponseEntity<Boolean> checkCollision(
            @RequestParam double x,
            @RequestParam double y,
            @RequestParam double radius) {
        boolean collision = wallService.checkCollision(new Vector2(x, y), radius);
        return ResponseEntity.ok(collision);
    }

    @PostMapping("/select-character")
    public ResponseEntity<String> selectCharacter(@RequestBody Map<String, Object> data) {
        int userId = Integer.valueOf(data.get("userId").toString());
        String character = data.get("character").toString();
        userService.updateCharacter(userId, character);
        return ResponseEntity.ok("Personaje seleccionado: " + character);
    }
}