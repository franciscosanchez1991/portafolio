# Portfolio
Hey there! This is a little project I'm working on: a real-time multiplayer game where you can interact with other people while tackling your own tasks. Plus, this is my portfolio page, where I'm showcasing my CV with a design that i liked. 

# Diagrama Cliente-Servidor con "Predicción + Corrección de Estado"

```plaintext
+--------------------+                          +------------------------+
|                    |        Input            |                        |
|     Cliente A      |-----------------------> |        Servidor        |
|  (React + Canvas)  |                         |   (Spring Boot WS)     |
|                    |                         |                        |
| 1. Input local     |                         | 2. Valida la acción    |
|    (mover, disparar)|                         |    (colisión, reglas)  |
|                    |                         |                        |
| 3. Predice en local|                         | 4. Actualiza el estado |
|    (animación en UI)|                        |    global              |
|                    |                         |                        |
|                    | <---------------------  |                        |
| 5. Corrige estado  |      Estado oficial     | 6. Broadcast a todos   |
|    si es necesario |                         |    los clientes        |
+--------------------+                          +------------------------+


+--------------------+
|     Cliente B      | <--------------------------
|  (Otro jugador)    |     Recibe broadcast       |
|                    |     (mueve sprite ajeno)   |
+--------------------+

+--------------------+
|     Cliente C      | <--------------------------
|                    |                           |
|                    |     Recibe broadcast       |
+--------------------+
```

### **Explicación del flujo**

1. **El cliente A** predice localmente (mueve su propio personaje rápido en pantalla).
2. El **cliente A** envía su acción al servidor (WebSocket).
3. **Spring Boot** valida (colisiones, límites, trampas).
4. El **servidor** decide si es legal y envía el estado oficial.
5. El **cliente A** corrige (si la predicción local fue errónea).
6. Todos los clientes reciben el estado sincronizado del juego.

### **Beneficios**
- Baja latencia visual (el cliente "predice").
- Seguridad (el backend siempre valida).
- Sincronización global entre jugadores.
