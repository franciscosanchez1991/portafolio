class Resources {
    constructor() {
        this.toLoad = {
            fondo: "sprites/suelo3_320x180.png",
            shelf: "sprites/shelf.png",
            header: "sprites/header.png",
            moneda: "sprites/moneda.png",
            character: "sprites/hero-sheet.png",
        };
        this.images = {};
        this.loadedImages = 0;
        this.totalImages = Object.keys(this.toLoad).length;

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            };
            
            img.onload = () => {
                this.images[key].isLoaded = true;
                this.loadedImages++;
                console.log(`Loaded image: ${key}`);
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${key} from path: ${this.toLoad[key]}`);
            };
        });
    }

    areAllImagesLoaded() {
        return this.loadedImages === this.totalImages;
    }
}

export const resources = new Resources();