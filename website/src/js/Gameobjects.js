import { Vector2 } from './Vector2.js';
import { events } from './Events.js';

export class GameObject {
    constructor({ position }){
        this.position = position ?? new Vector2(0,0);
        this.children = [];
        this.parent = null;
        this.hasReadyBeenCalled = false;
    }

    // First entry point of the loop
    stepEntry(delta, root) {
        // Call updates on all children first
        this.children.forEach((child) => child.stepEntry(delta, root));

        // Call ready on the first frame
        if (!this.hasReadyBeenCalled) {
        this.hasReadyBeenCalled = true;
        this.ready();
        }

        // Call any implemented Step code
        this.step(delta, root);
    }

    step(_delta){

    }
    // Called before the first `step`
    ready() {
        // ...
    }
    draw(ctx, x, y){
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        this.drawImage(ctx, drawPosX, drawPosY);
        this.children.forEach((child) => {
            child.draw(ctx, drawPosX, drawPosY);
        });
    }

    drawImage(ctx, drawPosX, drawPosY){
        // override this method
    }

    addChild(gameObject){   
        gameObject.parent = this;     
        this.children.push(gameObject);
    }
    removeChild(gameObject) {
        events.unsubscribe(gameObject);
        this.children = this.children.filter(g => {
          return gameObject !== g;
        })
    }
}