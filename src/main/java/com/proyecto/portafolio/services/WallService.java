package com.proyecto.portafolio.services;

import org.springframework.stereotype.Service;
import com.proyecto.portafolio.models.Vector2;
import java.util.ArrayList;
import java.util.List;

@Service
public class WallService {
    private List<Wall> walls;
    private List<Vector2> collisionPoints;

    public WallService() {
        this.walls = new ArrayList<>();
        this.collisionPoints = new ArrayList<>();
    }

    public void addWall(Wall wall) {
        walls.add(wall);
    }

    public List<Wall> getWalls() {
        return walls;
    }

    public List<Vector2> getCollisionPoints() {
        return collisionPoints;
    }

    public boolean checkCollision(Vector2 position, double radius) {
        for (Wall wall : walls) {
            if (wall.isColliding(position, radius)) {
                return true;
            }
        }
        return false;
    }

    // Inner class for Wall
    public static class Wall {
        private Vector2 start;
        private Vector2 end;
        private double thickness;

        public Wall(Vector2 start, Vector2 end, double thickness) {
            this.start = start;
            this.end = end;
            this.thickness = thickness;
        }

        public boolean isColliding(Vector2 point, double radius) {
            // Implement collision detection logic here
            // This is a simplified version - you'll want to implement your specific collision logic
            double x = point.getX();
            double y = point.getY();
            double x1 = start.getX();
            double y1 = start.getY();
            double x2 = end.getX();
            double y2 = end.getY();

            // Calculate distance from point to line segment
            double A = x - x1;
            double B = y - y1;
            double C = x2 - x1;
            double D = y2 - y1;

            double dot = A * C + B * D;
            double len_sq = C * C + D * D;
            double param = -1;
            
            if (len_sq != 0) {
                param = dot / len_sq;
            }

            double xx, yy;

            if (param < 0) {
                xx = x1;
                yy = y1;
            } else if (param > 1) {
                xx = x2;
                yy = y2;
            } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }

            double dx = x - xx;
            double dy = y - yy;
            double distance = Math.sqrt(dx * dx + dy * dy);

            return distance < (radius + thickness);
        }

        // Getters and setters
        public Vector2 getStart() { return start; }
        public void setStart(Vector2 start) { this.start = start; }
        public Vector2 getEnd() { return end; }
        public void setEnd(Vector2 end) { this.end = end; }
        public double getThickness() { return thickness; }
        public void setThickness(double thickness) { this.thickness = thickness; }
    }
}