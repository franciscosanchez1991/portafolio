package com.proyecto.portafolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -> authz
                .requestMatchers("/ws").permitAll()
                .requestMatchers("/download").permitAll()
                .requestMatchers("/admin/**").authenticated()
                .anyRequest().permitAll()
                                
            )
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
