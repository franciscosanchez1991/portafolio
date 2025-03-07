import { GameLoop } from "./Gameloop.js";
import {resources} from "./Resource.js";
import { Input } from "./Input.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./Vector2.js";
import { gridCells, isSpaceFree } from "./grid.js";
import { Character } from "../js/playerMovement/Player.js";
import { GameObject } from "./Gameobjects.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
    position: new Vector2(0,0)
});

const background = new Sprite({
    resource: resources.images.fondo,
    frameSize: new Vector2(320, 180)
});
mainScene.addChild(background);

const money = new Sprite({
    resource: resources.images.moneda,
    frameSize: new Vector2(32, 32)
});
mainScene.addChild(money);
const shelf = new Sprite({
    resource: resources.images.shelf,
    frameSize: new Vector2(48, 48)
});
mainScene.addChild(shelf);
const Header = new Sprite({
    resource: resources.images.header,
    frameSize: new Vector2(320, 16)
});
mainScene.addChild(Header);
const wallsSprite = new Sprite({
    resource: resources.images.wall,
    frameSize: new Vector2(320, 32),    
});
mainScene.addChild(wallsSprite);
const character = new Character(gridCells(6), gridCells(5));
mainScene.addChild(character);
mainScene.input = new Input();

const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
};



const draw = () => {

    // Clear anything stale
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the sky
    background.drawImage(ctx, 0, 0)
  
    // Save the current state (for camera offset)
    ctx.save();
  
    //Offset by camera position
    //ctx.translate(camera.position.x, camera.position.y);
  
    // Draw objects in the mounted scene
    mainScene.draw(ctx, 0, 0);
  
    // Restore to original state
    ctx.restore();
  
    // Draw anything above the game world
    //inventory.draw(ctx, 0, 0)
  
  }
  

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
