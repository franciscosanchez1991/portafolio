import { GameLoop } from "./Gameloop.js";
import {resources} from "./Resource.js";
import { Input } from "./Input.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./Vector2.js";
import { gridCells, isSpaceFree } from "./grid.js";
import { LEFT, RIGHT, UP, DOWN } from "./Input.js";
import { moveTowards } from "./moveTowards.js";
import { walls } from "./walls.js";
import { Animations } from "./Animations.js";
import { FrameIndexPattern } from "./FrameIndexPattern.js";
import { WALK_RIGHT,WALK_DOWN,WALK_LEFT,WALK_UP, STAND_UP, STAND_DOWN, STAND_LEFT,STAND_RIGHT } from "./playerMovement/playerAnimation.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const background = new Sprite({
    resource: resources.images.fondo,
    frameSize: new Vector2(320, 180)
});
const money = new Sprite({
    resource: resources.images.moneda,
    frameSize: new Vector2(32, 32)
})
const shelf = new Sprite({
    resource: resources.images.shelf,
    frameSize: new Vector2(48, 48)
});
const Header = new Sprite({
    resource: resources.images.header,
    frameSize: new Vector2(320, 16)
});
const character = new Sprite({
    resource: resources.images.character,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 1,
    position: new Vector2(gridCells(6), gridCells(5)),
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
const wallsSprite = new Sprite({
    resource: resources.images.wall,
    frameSize: new Vector2(320, 32),    
});
const characterDestinationPosition = character.position.duplicate();
let characterFacing = DOWN;
const input = new Input();

const update = (delta) => {
    const distance = moveTowards(character, characterDestinationPosition, 1);    
    const hasArrived = distance <= 1;
    // trying to move to the desired position
    if (hasArrived) {
        tryMove();
    }
    // character animations
    character.step(delta);
};

const tryMove = () => {
    if (!input.direction) {
        if (characterFacing === DOWN) {
            character.animations.play("standDown");
        }
        if (characterFacing === UP) {
            character.animations.play("standUp");
        }
        if (characterFacing === RIGHT) {
            character.animations.play("standRight");
        }
        if (characterFacing === LEFT) {
            character.animations.play("standLeft");
        }
        return;
    }

    let nextX = characterDestinationPosition.x;
    let nextY = characterDestinationPosition.y;
    const gridSize = 16;
    if (input.direction === DOWN){
        nextY += gridSize; 
        character.animations.play("walkDown");       
    }
    if (input.direction === UP){
        nextY -= gridSize;        
        character.animations.play("walkUp");
    }
    if (input.direction === RIGHT){
        nextX += gridSize;        
        character.animations.play("walkRight");
    }
    if (input.direction === LEFT){
        nextX -= gridSize;        
        character.animations.play("walkLeft");
    }
    characterFacing = input.direction ?? characterFacing;

    // validating if the next position is free
    if (isSpaceFree(walls,nextX,nextY)){
        characterDestinationPosition.x = nextX;
        characterDestinationPosition.y = nextY;
    }
}

const draw = () => {    
    background.drawImage(ctx, 0, 0);   
    wallsSprite.drawImage(ctx, 0, 16); 
    shelf.drawImage(ctx, 155, 97);  // x,y    
    shelf.drawImage(ctx, 126, 97);  // x,y    
    shelf.drawImage(ctx, 97, 97);    
    shelf.drawImage(ctx, 68, 97);  // x,y    
    shelf.drawImage(ctx, 39, 97);  // x,y    
    Header.drawImage(ctx, 0, 0);
    money.drawImage(ctx, 5, 4);

    // text
    ctx.font = "10px Arial";    
    ctx.fillText("Hello World",13,11);

    // Draw entities
    const characterOffset = new Vector2(200,-21);
    const characterX = character.position.x + characterOffset.x;
    const characterY = character.position.y +1 + characterOffset.y;
    character.drawImage(ctx, characterX, characterY);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
