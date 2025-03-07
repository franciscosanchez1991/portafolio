import { GameObject } from "../Gameobjects.js";
import { Vector2 } from "../Vector2.js";
import { Sprite } from "../sprite.js";
import { resources } from "../Resource.js";
import { Animations} from "../Animations.js";
import { events } from "../Events.js";
import { isSpaceFree } from "../grid.js";
import { moveTowards } from "../moveTowards.js";
import {DOWN, LEFT, RIGHT, UP} from "../Input.js";
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
async function selectCharacter(userId, character) {
    try {
        const response = await axios.post('/user/select-character', { userId, character });
        console.log(response.data);
    } catch (error) {
        console.error("Error al seleccionar el personaje:", error.response?.data || error.message);
    }
}

export const left = 'left';
export const right = 'right';
export const up = 'up';
export const down = 'down';


export class Character extends GameObject{
    // constructor(){

    //     this.heldDirections = [];   

    //     document.addEventListener('keydown', (e) => {
    //         if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    //             this.onPress(left);
    //         }
    //         if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    //             this.onPress(right);
    //         }
    //         if (e.code === 'ArrowUp' || e.code === 'KeyW') {
    //             this.onPress(up);
    //         }
    //         if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    //             this.onPress(down);
    //         }

    //     });
    //     document.addEventListener('keyup', (e) => {
    //         if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    //             this.onRelease(left);
    //         }
    //         if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    //             this.onRelease(right);
    //         }
    //         if (e.code === 'ArrowUp' || e.code === 'KeyW') {
    //             this.onRelease(up);
    //         }
    //         if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    //             this.onRelease(down);
    //         }
    //     });
    // }

    // get direction(){
    //     return this.heldDirections[0];
    // }

    // onPress(direction){
    //     if (this.heldDirections.indexOf(direction) === -1) { // esto permite no añadir la misma dirección con las 2 teclas
    //         this.heldDirections.unshift(direction);
    //     }
    // }
    // onRelease(direction){
    //     const index = this.heldDirections.indexOf(direction);
    //     if (index === -1) {
    //         return;            
    //     }
    //     // se soltó una dirección que no estaba en la lista 
    //     this.heldDirections.splice(index, 1);
    // }

    constructor(x,y){
        super({
            position: new Vector2(x,y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(0,0),
        });
        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.character,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(0,0),
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

    step(delta, root) {

        // Lock movement if celebrating an item pickup
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
    
        this.tryEmitPosition()
    }

    tryEmitPosition() {
        if (this.lastX === this.position.x && this.lastY === this.position.y) { // in case the character didint move
          return;
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position)
      }

    tryMove(root) {
        const {input} = root;
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