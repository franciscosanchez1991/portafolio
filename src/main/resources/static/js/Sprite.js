import { GameObject } from "./Gameobjects.js";
import { Vector2 } from "./Vector2.js";

export class Sprite extends GameObject{
    // this works mostly to sprites in a grid, so it can be used for animations
    constructor({
        resource, // image we want to draw
        frameSize, // size of the crop of the image
        hFrames, // how the sprite arranged horizontally
        vFrames, // how the sprite arranged vertically
        frame, // which frame we want to show
        scale, // how large to draw this image
        position, // where to draw it (top left corner)
        animations,
      }) {
      super({
        
      });
      this.resource = resource;
      this.frameSize = frameSize ?? new Vector2(16,16); //size of the image
      this.hFrames = hFrames ?? 1;
      this.vFrames = vFrames ?? 1;
      this.frame = frame ?? 0;
      this.frameMap = new Map();
      this.scale = scale ?? 1;
      this.position = position ?? new Vector2(0,0);
      this.animations = animations ?? null;
      this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let v=0; v<this.vFrames; v++) {
          for (let h=0; h<this.hFrames; h++) {
            this.frameMap.set(
                frameCount,
                new Vector2(this.frameSize.x * h, this.frameSize.y * v)
            )
            frameCount++;            
          }
        }
    }

    step(delta) {
        if (!this.animations) {
          return;
        }
        this.animations.step(delta);
        this.frame = this.animations.frame;
      }

    drawImage(ctx,x,y){      
        if (!this.resource.isLoaded) {
            //console.warn('Resource not loaded yet'+ this.resource);
            // console.log('Resource:', this.resource);
            // console.log('Resource structure:', {
            //     hasImage: !!this.resource.image,
            //     hasIsLoaded: 'isLoaded' in this.resource
            // });
            return;
        }

        let frameCordX = 0;
        let frameCordY = 0;
        const frame = this.frameMap.get(this.frame);
        if (frame){
            frameCordX = frame.x;
            frameCordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCordX,
            frameCordY, // where to start clipping
            frameSizeX, // size of the frame
            frameSizeY, // size of the frame            
            x, // where to draw it
            y, // where to draw it
            frameSizeX * this.scale, // size of the frame
            frameSizeY * this.scale // size of the frame
        );
    }
}