import { GameLoop } from "./Gameloop.js";
import {resources} from "./Resource.js";
import { Input } from "./Input.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./Vector2.js";
import { gridCells, isSpaceFree } from "./grid.js";
import { LEFT, RIGHT, UP, DOWN } from "./Input.js";
import { moveTowards } from "./moveTowards.js";
import { walls } from "./walls.js";
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");


const background = new Sprite({
    resource: resources.images.fondo,
    frameSize: new Vector2(1000, 1000)
});
const money = new Sprite({
    resource: resources.images.moneda,
    frameSize: new Vector2(32, 32)
})
const shelf = new Sprite({
    resource: resources.images.shelf,
    frameSize: new Vector2(124, 124)
});
const character = new Sprite({
    resource: resources.images.character,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 1,
    position: new Vector2(gridCells(6), gridCells(5))
});
const characterDestinationPosition = character.position.duplicate();
const input = new Input();

const update = () => {
    const distance = moveTowards(character, characterDestinationPosition, 1);    
    const hasArrived = distance <= 1;
    // trying to move to the desired position
    if (hasArrived) {
        tryMove();
    }
    return;    
};

const tryMove = () => {
    if (!input.direction) {
        return;
    }

    let nextX = characterDestinationPosition.x;
    let nextY = characterDestinationPosition.y;
    const gridSize = 16;
    if (input.direction === DOWN){
        nextY += gridSize;
        character.frame = 0;
    }
    if (input.direction === UP){
        nextY -= gridSize;
        character.frame = 6;
    }
    if (input.direction === RIGHT){
        nextX += gridSize;
        character.frame = 3;
    }
    if (input.direction === LEFT){
        nextX -= gridSize;
        character.frame = 9;
    }

    // validating if the next position is free
    if (isSpaceFree(walls,nextX,nextY)){
        characterDestinationPosition.x = nextX;
        characterDestinationPosition.y = nextY;
    }
    characterDestinationPosition.x = nextX;
    characterDestinationPosition.y = nextY;
}

const draw = () => {    
    background.drawImage(ctx, 0, 0);
    money.drawImage(ctx, 0, 0);
    shelf.drawImage(ctx, 0, 0);

    // Draw entities
    const characterOffset = new Vector2(-8,-21);
    const characterX = character.position.x + characterOffset.x;
    const characterY = character.position.y +1 + characterOffset.y;
    character.drawImage(ctx, characterX, characterY);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
