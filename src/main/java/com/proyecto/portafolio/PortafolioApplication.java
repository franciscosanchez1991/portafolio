package com.proyecto.portafolio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.proyecto.portafolio.controllers.GameStateController;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class PortafolioApplication {
    @Autowired
    private GameStateController gameStateController;

    public static void main(String[] args) {
        SpringApplication.run(PortafolioApplication.class, args);
    }

    @PostConstruct
    public void startGameLoop() { // basically to start/stop the game and controll the fps
        Thread gameThread = new Thread(() -> {
            while (true) {
                if (gameStateController.isGameRunning()) {
                    updateGameLogic();
                }
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        gameThread.setDaemon(true);
        gameThread.start();
    }

    private void updateGameLogic() {
        System.out.println("Actualizando lógica del juego...");
    }
}
