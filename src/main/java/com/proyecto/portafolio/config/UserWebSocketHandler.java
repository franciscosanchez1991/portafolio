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

import com.proyecto.portafolio.services.ResourceService;

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

            // aqui voy a enviar los datos de resource, walls, grid
            switch (type) {
                case "processData":
                    // recursos
                    ResourceService resourceService = new ResourceService();
                    resourceService.loadResource("resource_character", "static/sprites/hero-sheet.png");
                    resourceService.loadResource("resource_wall", "static/sprites/pared.png");
                    resourceService.loadResource("resource_background", "static/sprites/suelo3_320x180.png");
                    resourceService.loadResource("resource_shelf", "static/sprites/shelf.png");
                    resourceService.loadResource("resource_shadow", "static/sprites/shadow.png");
                    // enviar datos
                    JSONObject response = new JSONObject()
                        .put("type", "resourceData")
                        .put("resources", new JSONObject()
                            .put("character", resourceService.getEncodedResource("resource_character"))
                            .put("wall", resourceService.getEncodedResource("resource_wall"))
                            .put("background", resourceService.getEncodedResource("resource_background"))
                            .put("shelf", resourceService.getEncodedResource("resource_shelf"))
                            .put("shadow", resourceService.getEncodedResource("resource_shadow"))
                        );
                    
                    session.sendMessage(new TextMessage(response.toString()));                    
                    break;
                
                case "player_moves":
                    for (WebSocketSession clientSession : sessions.values()) {
                        if (clientSession.isOpen()) {
                            clientSession.sendMessage(new TextMessage(message.getPayload()));
                        }
                    }
                    break;                    
                
                case "processedResults":
                    for (WebSocketSession clientSession : sessions.values()) {
                        if (clientSession.isOpen()) {
                            clientSession.sendMessage(new TextMessage(message.getPayload()));
                        }
                    }
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
