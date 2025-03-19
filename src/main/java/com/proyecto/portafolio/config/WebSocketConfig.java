package com.proyecto.portafolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// WebSocketConfig.java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    // limito la conexion a solo react
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // Registrar el handler en la ruta "/ws" y permitir origen localhost
        registry.addHandler(userWebSocketHandler(), "/ws")
                .setAllowedOrigins("http://localhost:8080","http://localhost:5173");
                //.setAllowedOriginPatterns("*");  // (Opcional: permitir cualquier origen en dev)
    }

    // Definir el handler como bean para poder inyectarlo si es necesario
    @Bean    
    public WebSocketHandler userWebSocketHandler() {
        return new UserWebSocketHandler();
    }
}
