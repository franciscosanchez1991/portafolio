class Resources {
    constructor() {
        this.images = {};
        this.loadedImages = 0;
        this.totalImages = 0;
        this.isInitialized = false;
    }

    initializeFromWebSocket(resourcesData) {
        if (this.isInitialized) return;

        const imageKeys = {
            character: resourcesData.character,
            wall: resourcesData.wall,
            background: resourcesData.background,
            shelf: resourcesData.shelf,
            shadow: resourcesData.shadow,
        };

        this.totalImages = Object.keys(imageKeys).length;
        
        Object.entries(imageKeys).forEach(([key, src]) => {
            const img = new Image();
            
            img.onload = () => {
                this.images[key].isLoaded = true;
                this.loadedImages++;
                
                if (this.areAllImagesLoaded()) {
                    // Dispatch event when all images are loaded
                    const event = new CustomEvent('resourcesLoaded', { 
                        detail: this 
                    });
                    window.dispatchEvent(event);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${key}`);
            };

            this.images[key] = {
                image: img,
                isLoaded: false
            };
            
            // Set source after attaching events
            img.src = src;
        });

        this.isInitialized = true;
    }

    areAllImagesLoaded() {
        return this.loadedImages === this.totalImages;
    }
}

export const resources = new Resources();