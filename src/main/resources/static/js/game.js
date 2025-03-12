import { GameLoop } from "./Gameloop.js";
import {resources} from "./Resource.js";
import { Input } from "./Input.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./Vector2.js";
import { gridCells } from "./grid.js";
import { Character } from "../js/playerMovement/Player.js";
import { GameObject } from "./Gameobjects.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
    position: new Vector2(0,0)
});

// background
const background = new Sprite({
    resource: resources.images.fondo,
    frameSize: new Vector2(320, 180)
});
mainScene.addChild(background);

// money
const money = new Sprite({
    resource: resources.images.moneda,
    frameSize: new Vector2(32, 32)
});
mainScene.addChild(money);

// shelf
const shelf = new Sprite({
    resource: resources.images.shelf,
    frameSize: new Vector2(48, 48)
});
mainScene.addChild(shelf);

// header
const Header = new Sprite({
    resource: resources.images.header,
    frameSize: new Vector2(320, 16)
});
mainScene.addChild(Header);

// walls
const walls = new Sprite({
    resource: resources.images.wall,
    frameSize: new Vector2(320, 32),    
});
mainScene.addChild(walls);

// character
const character = new Character(gridCells(6), gridCells(5));
mainScene.addChild(character);
mainScene.input = new Input();

const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
};



const draw = () => {

    // Clear anything stale
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Save the current state (for camera offset)
    ctx.save();
  
    // Draw objects in the mounted scene
    mainScene.draw(ctx, 0, 0);
      
    //resources.areAllImagesLoaded();
    // Restore to original state
    ctx.restore();    
  
  }
  
function waitForResources() {
    if (resources.areAllImagesLoaded()) {
        console.log('All resources loaded, starting game loop');
        const gameLoop = new GameLoop(update, draw);
        gameLoop.start();
    } else {
        console.log('Waiting for resources to load...');
        setTimeout(waitForResources, 100);
    }
}

// Replace the direct gameLoop creation with:
waitForResources();
