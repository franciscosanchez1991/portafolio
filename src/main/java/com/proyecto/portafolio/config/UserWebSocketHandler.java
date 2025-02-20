package com.proyecto.portafolio.config;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class UserWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); // permite almacenar las sesiones de los usuarios conectados
    private int maxUsers = 10; // cantidad máxima de usuarios
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception { // se ejecuta cuando un usuario se conecta
        if (sessions.size() < maxUsers) {
            sessions.put(session.getId(), session);
            System.out.println("Usuario conectado: " + session.getId());
        } else {
            session.close(CloseStatus.POLICY_VIOLATION.withReason("Servidor lleno"));
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception { // se ejecuta cuando un usuario envía ejecuta una accion
        System.out.println("Mensaje recibido de " + session.getId() + ": " + message.getPayload());
        // Aquí procesas los mensajes (como la selección del personaje)
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception { // se ejecuta cuando un usuario se desconecta
        sessions.remove(session.getId());
        System.out.println("Usuario desconectado: " + session.getId());
    }
}
