import { resources } from '../Resource.js';
import {backend} from './Routing.js';
export class WebSocketManager {
    static instance = null;
    resources = {
        images: {},
        isLoaded: false
    };
    constructor() {        
        if (WebSocketManager.instance) {
            return WebSocketManager.instance;
        }
        this.socket = new WebSocket(`${backend}`);
        this.setupEventHandlers();
        WebSocketManager.instance = this;
    }
    setupEventHandlers() {
        // para evitar crear multiples conexiones con un mismo usuario
        if (!this.socket.onopen) {
            this.socket.onopen = (event) => {
                console.log("Connected to WebSocket");
                // login
                const login = prompt("Please enter your name. If it is not already created, it will be created automatically", "Player");
                const password = prompt("Please enter your password", "Password");
                
                // send login to server as JSON
                this.socket.send(JSON.stringify({
                    type_sesion: 'login',
                    username: login,
                    password: password,
                    type: "processData"
                }));
            };
        }

        this.socket.onmessage = (event) => {
            //console.log("Message received:", event.data);
            const data = JSON.parse(event.data);            
            localStorage.setItem("id", data.id);
            switch(data.type) {
                case 'resourceData':                    
                    const event = new CustomEvent('this_player', {
                        detail: data.id
                        
                    });                    
                    window.dispatchEvent(event);
                    resources.initializeFromWebSocket(data.resources);
                    break;
                case 'move_validation':
                    // Handle server validation of moves
                    if (!data.valid) {
                        // Implement rubber-banding if server rejects move
                        event.emit("MOVE_REJECTED", data.correctPosition);
                    }                    
                    break;                
                case 'player_moves':
                    if (data.id !== localStorage.getItem("id")) {
                        // Update other players' positions
                        const event = new CustomEvent('player_moves', { 
                            detail: data 
                        });
                        window.dispatchEvent(event);
                    }
                default:
                    if (data.id !== localStorage.getItem("id")) {
                        // Update other players' positions
                        const event = new CustomEvent('new_player', { 
                            detail: this 
                        });
                        window.dispatchEvent(event);
                    }
                    break;
            }
        };
        this.socket.onclose = (event) => {
            console.log("WebSocket closed. Code:", event.code);
            
            if (event.code === 1008) { // POLICY_VIOLATION → servidor lleno
                alert("Servidor lleno. Por favor, intenta más tarde.");
            } else {
                alert("Conexión cerrada. Código: " + event.code);
            }
            window.location.href = "/"; // redirige a tu pantalla de login/menu principal
        };
        
        this.socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            alert("Error de conexión con el servidor.");
            window.location.href = "/";
        };
    }

    getResources() {
        return this.resources;
    }
    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }
}

// Create single instance
export const wsManager = new WebSocketManager();