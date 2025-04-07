import { GameObject } from "../Gameobjects.js";
import { Vector2 } from "../Vector2.js";
import { Sprite } from "../Sprite.js";
import { resources } from "../Resource.js";
import { Animations} from "../Animations.js";
import { events } from "../Events.js";
import { isSpaceFree } from "../grid.js";
import { moveTowards } from "./moveTowards.js";
import { walls } from "../walls.js";
import {DOWN, LEFT, RIGHT, UP} from "./Input.js";
import {FrameIndexPattern} from "../FrameIndexPattern.js";
import {    
    STAND_DOWN,
    STAND_LEFT,
    STAND_RIGHT,
    STAND_UP,
    WALK_DOWN,
    WALK_LEFT,
    WALK_RIGHT,
    WALK_UP
  } from "./playerAnimation.js";
import { wsManager } from "../websocket/WebSocketManager.js";
export const left = 'left';
export const right = 'right';
export const up = 'up';
export const down = 'down';

export class Character extends GameObject{

    constructor(x,y){
        super({
            position: new Vector2(x,y)
        });

        // Add input buffer
        this.inputBuffer = [];
        this.lastSentTime = 0;
        this.bufferTimeout = 400; // envia los movimientos cada 400ms
        this.maxBufferSize = 10; // maximo de movimientos en el buffer

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8,-4),
        });
        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.character,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8,-4),
            animations: new Animations({
                walkUp: new FrameIndexPattern(WALK_UP),        
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                standUp: new FrameIndexPattern(STAND_UP),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
            })
        });
        this.addChild(this.body);
        this.facingDirection = down;
        this.destinationPosition = this.position.duplicate();
    }
    bufferInput(direction, position) {
        // se almacenan los movimientos en el buffer
        this.inputBuffer.push({
            direction,
            x: position.x,
            y: position.y,
            timestamp: Date.now()
        });

        // si el buffer esta lleno o si ha pasado el tiempo de espera
        if (this.inputBuffer.length >= this.maxBufferSize || 
            Date.now() - this.lastSentTime > this.bufferTimeout) {
            this.sendBufferedMoves();
        }
    }
    sendBufferedMoves() {
        if (this.inputBuffer.length === 0) return;

        // enviar los movimientos al servidor
        wsManager.socket.send(JSON.stringify({
            type: "player_moves",
            moves: this.inputBuffer,
            id: localStorage.getItem("id"),
        }));

        // limpia el buffer
        this.inputBuffer = [];
        this.lastSentTime = Date.now();
    }
    step(delta, root) {

        // si el jugador esta recogiendo un objeto
        if (this.itemPickupTime > 0) {
          this.workOnItemPickup(delta);
          return;
        }
    
        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 1;
        // Attempt to move again if the hero is at his position
        if (hasArrived) {
          this.tryMove(root)
        }
        if (this.inputBuffer.length > 0 && 
            Date.now() - this.lastSentTime > this.bufferTimeout) {
            this.sendBufferedMoves();
        }
        this.tryEmitPosition()
    }

    tryEmitPosition() {
        if (this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;

        // Buffer the move instead of directly emitting
        this.bufferInput(this.facingDirection, {
            x: this.position.x,
            y: this.position.y
        });

        // Still emit local event for other game components
        events.emit("HERO_POSITION", this.position);
    }

    tryMove(root) {
        const {input} = root;
        // se activan estas animaciones si el jugador esta quieto
        if (!input.direction) {
            if (this.facingDirection === DOWN) {
                this.body.animations.play("standDown");
            }
            if (this.facingDirection === UP) {
                this.body.animations.play("standUp");
            }
            if (this.facingDirection === RIGHT) {
                this.body.animations.play("standRight");
            }
            if (this.facingDirection === LEFT) {
                this.body.animations.play("standLeft");
            }
            return;
        }
    
        // se activan estas animaciones si el jugador se esta moviendo
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;
        if (input.direction === DOWN){
            nextY += gridSize; 
            this.body.animations.play("walkDown");       
        }
        if (input.direction === UP){
            nextY -= gridSize;        
            this.body.animations.play("walkUp");
        }
        if (input.direction === RIGHT){
            nextX += gridSize;        
            this.body.animations.play("walkRight");
        }
        if (input.direction === LEFT){
            nextX -= gridSize;        
            this.body.animations.play("walkLeft");
        }
        this.facingDirection = input.direction ?? this.facingDirection;
    
        // validating if the next position is free
        if (isSpaceFree(walls,nextX,nextY)){
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;
        }
    }    
}