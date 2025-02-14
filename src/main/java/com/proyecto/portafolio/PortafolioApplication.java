package com.proyecto.portafolio;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class PortafolioApplication {
    private volatile boolean running = true;

    public static void main(String[] args) {
        SpringApplication.run(PortafolioApplication.class, args);
    }

    @PostConstruct
    public void startGameLoop() {
        Thread gameThread = new Thread(() -> {
            while (running) {
                updateGameLogic();
                try {
                    Thread.sleep(100); // Control del ciclo de actualización (10 FPS aprox)
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        gameThread.setDaemon(true);
        gameThread.start();
    }

    private void updateGameLogic() {
        System.out.println("Actualizando lógica del juego...");
        // Aquí puedes actualizar el estado del juego, mover NPCs, etc.
    }

    public void stopGameLoop() {
        running = false;
    }
}
