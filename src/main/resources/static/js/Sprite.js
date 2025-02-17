import { Vector2 } from "./Vector2";

export class Sprite{
    // this works mostly to sprites in a grid, so it can be used for animations
    constructor({
        resource, // image source
        frameSize, // size of each frame
        hFrames, // number of horizontal frames
        vFrames, // number of vertical frames
        frame, // frame i want to show
        scale, // scale of the sprite
        position, // where to draw it
    }){
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16,16); // if frameSize is not defined, it will be 0,0
        this.hFrames = hFrames ?? 1; // if hFrames is not defined, it will be 1
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0,0);
        this.buildFrameMap();
    }

    buildFrameMap(){
        let frameCount = 0;
        for(let y = 0; y < this.vFrames; y++){
            for(let x = 0; x < this.hFrames; x++){
                this.frameMap.set(frameCount, new Vector2(this.frameSize.x *x, this.frameSize.x *y));
                frameCount++;
            }
        }
    }

    drawImage(ctx,x,y){
        if (!this.resource.isLoaded) {
            console.warn('Resource not loaded yet');
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