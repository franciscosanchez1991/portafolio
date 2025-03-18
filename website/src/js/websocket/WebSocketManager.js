export class WebSocketManager {
    static instance = null;

    constructor() {
        if (WebSocketManager.instance) {
            return WebSocketManager.instance;
        }
        this.socket = new WebSocket("ws://localhost:8080/ws");
        this.setupEventHandlers();
        WebSocketManager.instance = this;
    }

    setupEventHandlers() {
        this.socket.onopen = (event) => {
            console.log("Connected to WebSocket");
            // login
            const login = prompt("Please enter your name. If it is not already created, it will be created automatically", "Player");
            const password = prompt("Please enter your password", "Password");
            
            // send login to server as JSON
            this.socket.send(JSON.stringify({
                type: 'login',
                username: login,
                password: password
            }));
        };

        this.socket.onmessage = (event) => {
            console.log("Message received:", event.data);
        };

        this.socket.onclose = (event) => {
            console.log("WebSocket closed. Code:", event.code);
            
            if (event.code === 1008) { // POLICY_VIOLATION → servidor lleno
                alert("Servidor lleno. Por favor, intenta más tarde.");
            } else {
                alert("Conexión cerrada. Código: " + event.code);
            }
            window.location.href = "/"; // o redirige a tu pantalla de login/menu principal
        };
        
        this.socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            alert("Error de conexión con el servidor.");
            window.location.href = "/";
        };
    }

    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }
}

// Create single instance
export const wsManager = new WebSocketManager();