import canvasManager from "./canvasManager.js";
import {resources} from "./resources.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./Vector2.js";
const uiCtx = canvasManager.ctx.ui; // Obtener el contexto del canvas de fondo
const backgroundCtx = canvasManager.ctx.background; // Obtener el contexto del canvas de fondo

const background = new Sprite({
    resource: resources.images.fondo,
    frameSize: new Vector2(500, 500)
});
const money = new Sprite({
    resource: resources.images.moneda,
    frameSize: new Vector2(500, 500)
})


const draw = () => {
    background.drawImage(backgroundCtx, 0, 0);
    money.drawImage(uiCtx, 0, 0);
};

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop); // Call the game loop recursively
}

// Start the game loop once resources are loaded
Object.values(resources.images).every(img => img.isLoaded) ? 
    gameLoop() : 
    setTimeout(() => gameLoop(), 100);