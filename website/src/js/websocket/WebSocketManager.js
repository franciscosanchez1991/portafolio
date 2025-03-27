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
        this.socket = new WebSocket(`wss://${backend}/ws`);
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
            console.log("Message received:", event.data);
            const data = JSON.parse(event.data);
    
            switch(data.type) {
                case 'resourceData':
                    resources.initializeFromWebSocket(data.resources);
                    break;
                case 'move_validation':
                    // Handle server validation of moves
                    if (!data.valid) {
                        // Implement rubber-banding if server rejects move
                        event.emit("MOVE_REJECTED", data.correctPosition);
                    }
                    break;
                // ...other cases...
            }
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
    // async loadResources(resourcesData) {
    //     try {

    //         ///////////// zona de modificacion de recursos //////////////            
    //         const characterImage = new Image();
    //         const wallImage = new Image();
    //         const backgroundImage = new Image();
    //         const shelfImage = new Image();
    //         characterImage.src = resourcesData.character;
    //         wallImage.src = resourcesData.wall;
    //         backgroundImage.src = resourcesData.background;
    //         shelfImage.src = resourcesData.shelf;
    //         this.resources.images = {
    //             character: {
    //                 image: characterImage,
    //                 isLoaded: true
    //             },
    //             wall: {
    //                 image: wallImage,
    //                 isLoaded: true
    //             },
    //             background: {
    //                 image: backgroundImage,
    //                 isLoaded: true
    //             },
    //             shelf: {
    //                 image: shelfImage,
    //                 isLoaded: true
    //             }
    //         };
    //         //////////////////////////
    //         this.resources.isLoaded = true;
    //         console.log('All images loaded successfully');
            
    //         // Dispatch event to notify game components
    //         const event = new CustomEvent('resourcesLoaded', { 
    //             detail: this.resources 
    //         });
    //         window.dispatchEvent(event);
    //     } catch (error) {
    //         console.error('Failed to load resources:', error);
    //     }
    // }

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