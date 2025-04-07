import { GameLoop } from "./Gameloop.js";
import { Input } from "./playerMovement/Input.js";
import { Sprite } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";
import { gridCells } from "./grid.js";
import { Character } from "./playerMovement/Character.js";
import { GameObject } from "./Gameobjects.js";
import { RemoteCharacter } from "./playerMovement/RemoteCharacter.js";
import { OutsiderInput } from "./playerMovement/OutsiderInput.js";
export default class GameManager {
    constructor(ctx) {
        this.ctx = ctx;
        this.players = {};
        this.mainScene = new GameObject({
            position: new Vector2(0,0)
        });

        // Listen for resources loaded event
        window.addEventListener('resourcesLoaded', (event) => {
            const resources = event.detail;
            //console.log('Resources loaded:', resources);
            this.initializeGameElements(resources);
        });
    }



    initializeGameElements(resources) {
        // background
        const background = new Sprite({
            resource: resources.images.background,
            frameSize: new Vector2(320, 180)
        });
        this.mainScene.addChild(background);
        const wall = new Sprite({
            resource: resources.images.wall,
            frameSize: new Vector2(320, 180)
        });
        this.mainScene.addChild(wall);        

        // shelf section
        const shelfPositions = [
            // Middle row
            { x: 100, y: 97 },
            { x: 130, y: 97 },
            { x: 160, y: 97 },
            { x: 190, y: 97 },
            { x: 220, y: 97 },
            { x: 250, y: 97 }
        ];

        // Create shelves
        shelfPositions.forEach(pos => {
            const shelf = new Sprite({
                resource: resources.images.shelf,
                frameSize: new Vector2(48, 48),
                position: new Vector2(pos.x, pos.y)
            });
            this.mainScene.addChild(shelf);
        });
        
            

        window.addEventListener('this_player', (event) => {                      
            const local = new Character(gridCells(19), gridCells(4));    
            this.mainScene.addChild(local);            
            this.mainScene.input = new Input();  
            const id = event.detail;
            console.log('Player ID:', id);
            this.players[id] = local; // Store the player in the players object
            console.log("Player ID", players);
        });

        window.addEventListener('new_player', (event) => {
            // character     
            const remote = new RemoteCharacter(gridCells(19), gridCells(4));
            this.mainScene.addChild(remote);  
            const id = event.detail.id;
            this.players[id] = remote; 
        });

        // Start game loop
        const gameLoop = new GameLoop(
            (delta) => this.update(delta),
            () => this.draw()
        );
        gameLoop.start();
    }

    update(delta) {
        this.mainScene.stepEntry(delta, this.mainScene);


    }

    draw() {
        // Clear anything stale
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // Save the current state (for camera offset)
        this.ctx.save();
        
        // Draw objects in the mounted scene
        this.mainScene.draw(this.ctx, 0, 0);
        
        // Restore to original state
        this.ctx.restore();
    }
}