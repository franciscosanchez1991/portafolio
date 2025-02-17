class CanvasManager {
    constructor() {
        this.canvases = { // obtengo los canvas del html y los guardo en un objeto
            background: document.getElementById("backgroundCanvas"), 
            ui: document.getElementById("uiCanvas"),
            // objects: document.getElementById("objectsCanvas"),
            players: document.getElementById("charactersCanvas"),
        };

        this.ctx = { // obtengo el contexto de los canvas y los guardo en un objeto
            background: this.canvases.background.getContext("2d"),
            // objects: this.canvases.objects.getContext("2d"),
            players: this.canvases.players.getContext("2d"),
            ui: this.canvases.ui.getContext("2d"),
        };
        this.setupCanvas();        
    }
    setupCanvas() {
        this.resizeCanvas();
        //this.drawBackground();
    }    
    resizeCanvas() {        
        Object.values(this.canvases).forEach(canvas => { // recorro los canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });    
        //this.drawBackground(); // Redibujar fondo solo una vez
    }
}

const canvasManager = new CanvasManager(); // creo los canvas necesarios, el canvas de fondo, el de los objetos y el de los jugadores, y los guardo en un objeto
export default canvasManager; // exporto el objeto para poder usarlo en otros archivos