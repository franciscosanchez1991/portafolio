package com.proyecto.portafolio.config;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.json.JSONObject;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

// la idea de este handler es manejar las conexiones de los usuarios
@Component
public class UserWebSocketHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(UserWebSocketHandler.class);
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); // permite almacenar las sesiones de los usuarios conectados
    private int maxUsers = 10; // cantidad máxima de usuarios
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception { // se ejecuta cuando un usuario se conecta
        try {
            if (sessions.size() < maxUsers) {
                sessions.put(session.getId(), session);
                logger.info("Usuario conectado: " + session.getId());
                // Send confirmation message to client                
            } else {
                session.close(CloseStatus.POLICY_VIOLATION.withReason("Servidor lleno"));
            }
        } catch (Exception e) {
            logger.error("Error en conexión: ", e);
            session.close(CloseStatus.SERVER_ERROR.withReason(e.getMessage()));
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception { // se ejecuta cuando un usuario envía ejecuta una accion
        try {
            logger.info("Mensaje recibido de " + session.getId() + ": " + message.getPayload());
            JSONObject jsonMessage = new JSONObject(message.getPayload());
            String type = jsonMessage.getString("type");

            switch (type) {
                case "processData":
                    
                    break;
                case "processedResults":
                    for (WebSocketSession clientSession : sessions.values()) {
                        if (clientSession.isOpen()) {
                            clientSession.sendMessage(new TextMessage(message.getPayload()));
                        }
                    }
                    break;
                case "ping":
                    session.sendMessage(new TextMessage("{\"type\": \"pong\"}"));
                    break;
            }
        } catch (Exception e) {
            logger.error("Error procesando mensaje: ", e);
            session.sendMessage(new TextMessage("{\"type\":\"error\",\"message\":\"" + e.getMessage() + "\"}"));
        }      
    }
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        logger.error("Error de transporte para sesión " + session.getId(), exception);
        sessions.remove(session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception { // se ejecuta cuando un usuario se desconecta
        sessions.remove(session.getId());
        // exception
        String e = status.getReason();

        System.out.println("Usuario desconectado: " + session.getId()+ " " + e);
    }
}
