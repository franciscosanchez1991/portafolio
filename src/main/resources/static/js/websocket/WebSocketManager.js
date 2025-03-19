export class WebSocketManager{
    constructor(){
        this.socket = new WebSocket('ws://localhost:8080/ws');
        this.socket.onopen = function (event) {
            console.log('WebSocket is connected.');
        };
        this.socket.onmessage = function (event) {
            console.log('Message from server ', event.data);
        };
        this.socket.onclose = function (event) {
            console.log('WebSocket is closed.');
        };
    }
    sendMessage(message){
        this.socket.send(message);
    }
    closeConnection(){
        this.socket.close();
    }
}