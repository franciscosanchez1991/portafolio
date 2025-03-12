class Resources {
    constructor() {
        this.toLoad = {
            fondo: "sprites/suelo3_320x180.png",
            shelf: "sprites/shelf.png",
            header: "sprites/header.png",
            moneda: "sprites/moneda8.png",
            character: "sprites/hero-sheet.png",
            wall: "sprites/pared.png",
            shadow: "sprites/shadow.png",
        };
        this.images = {};
        this.loadedImages = 0;
        this.totalImages = Object.keys(this.toLoad).length;

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image(); // for each image, create a new Image object so all can be preloaded and used later, if i use a single Image object, it will be overwritten and only the last image will be loaded
            img.src = this.toLoad[key]; // each image will have a src attribute with the path to the image
            this.images[key] = { // each image will be stored in the images object with the key as the name of the image
                image: img,
                isLoaded: false
            };
            
            img.onload = () => { // once all images are loaded, the onload event will be triggered
                this.images[key].isLoaded = true;
                this.loadedImages++;                
            };

            img.onerror = () => { // if an image fails to load, the onerror event will be triggered
                console.error(`Failed to load image: ${key} from path: ${this.toLoad[key]}`);
            };
        });
    }

    areAllImagesLoaded() { // check if all images are loaded
        return this.loadedImages === this.totalImages;
    }
}

export const resources = new Resources();