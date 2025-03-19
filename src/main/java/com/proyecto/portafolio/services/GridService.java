package com.proyecto.portafolio.services;

import org.springframework.stereotype.Service;
import com.proyecto.portafolio.models.Vector2;
import java.util.List;

@Service
public class GridService {
    private static final int CELL_SIZE = 16;
    
    public boolean isSpaceFree(Vector2 position, List<Vector2> obstacles) {
        // Convert position to grid coordinates
        int gridX = (int) Math.floor(position.getX() / CELL_SIZE);
        int gridY = (int) Math.floor(position.getY() / CELL_SIZE);
        
        // Check if position collides with any obstacle
        return obstacles.stream().noneMatch(obstacle -> {
            int obstacleX = (int) Math.floor(obstacle.getX() / CELL_SIZE);
            int obstacleY = (int) Math.floor(obstacle.getY() / CELL_SIZE);
            return gridX == obstacleX && gridY == obstacleY;
        });
    }
    
    public Vector2 getGridPosition(Vector2 position) {
        return new Vector2(
            Math.floor(position.getX() / CELL_SIZE) * CELL_SIZE,
            Math.floor(position.getY() / CELL_SIZE) * CELL_SIZE
        );
    }
}