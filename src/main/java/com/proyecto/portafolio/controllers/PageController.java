package com.proyecto.portafolio.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class PageController {
    @Autowired
    private GameStateController gameStateController;

    @GetMapping("/")
    public String index() {
        gameStateController.stopGame();
        return "index";
    }

    @GetMapping("/game")
    public String game() {
        gameStateController.startGame();
        return "pages/game";
    }

    @GetMapping("/about")
    public String about() {
        gameStateController.stopGame();
        return "about";
    }
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        // Logic to retrieve the file from the storage location
        Resource fileResource = new ClassPathResource("static/downloads/" + filename);// Get resource representing the file
        
        if (!fileResource.exists()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                .body(fileResource);
    }
}