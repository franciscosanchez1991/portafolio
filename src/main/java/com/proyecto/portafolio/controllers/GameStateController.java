package com.proyecto.portafolio.controllers;

import org.springframework.stereotype.Component;

@Component
public class GameStateController {
    private volatile boolean isGameRunning = false;

    public synchronized void startGame() {
        isGameRunning = true;
    }

    public synchronized void stopGame() {
        isGameRunning = false;
    }

    public synchronized boolean isGameRunning() {
        return isGameRunning;
    }
}