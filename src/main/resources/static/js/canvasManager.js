class CanvasManager {
    constructor() {
        this.canvases = { // obtengo los canvas del html y los guardo en un objeto
            background: document.getElementById("backgroundCanvas"), 
            // objects: document.getElementById("objectsCanvas"),
            // players: document.getElementById("playersCanvas"),
        };

        this.ctx = { // obtengo el contexto de los canvas y los guardo en un objeto
            background: this.canvases.background.getContext("2d"),
            // objects: this.canvases.objects.getContext("2d"),
            // players: this.canvases.players.getContext("2d"),
        };

        this.setupCanvas(); // llamo a la función que configura los canvas
        window.addEventListener("resize", () => this.resizeCanvas()); // llamo a la función que redimensiona los canvas, en caso de que el tamaño de la ventana cambie
    }
    // Add the missing setupCanvas method
    setupCanvas() {
        this.resizeCanvas();
        this.drawBackground();
    }    
    resizeCanvas() {
        let aspectRatio = 16 / 9; // Ajusta esto según el diseño del juego
        let width = window.innerWidth;
        let height = width / aspectRatio;
    
        Object.values(this.canvases).forEach(canvas => { // recorro los canvas
            canvas.width = width;
            canvas.height = height;
        });
    
        this.drawBackground(); // Redibujar fondo solo una vez
    }
    
    drawBackground() {
        const backgroundImg = new Image();
        backgroundImg.src = "sprites/suelo_256.png";
        backgroundImg.onload = () => {
            this.ctx.background.imageSmoothingEnabled = false; // Evita el suavizado, sirve para crear sprites pequeños y escalarlos sin problema
            this.ctx.background.drawImage(backgroundImg, 0, 0, this.canvases.background.width, this.canvases.background.height);
        };
        // Add error handling
        backgroundImg.onerror = () => {
            console.error('Error loading background image');
        };
    }  
}

const canvasManager = new CanvasManager(); // creo los canvas necesarios, el canvas de fondo, el de los objetos y el de los jugadores, y los guardo en un objeto
export default canvasManager; // exporto el objeto para poder usarlo en otros archivos