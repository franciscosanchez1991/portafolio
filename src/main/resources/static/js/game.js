import canvasManager from "./canvasManager.js";

const { background, objects, players } = canvasManager.ctx;
// cargar personaje
const player = new Image();
const imagenes = {
    fondo: new Image(),
    objeto1: new Image(),
    objeto2: new Image(),
    objeto3: new Image()
};
imagenes.fondo.src = "sprites/suelo.png";
// Esperar a que todas las imágenes se carguen antes de dibujarlas
let cargadas = 0;
const total = Object.keys(imagenes).length;
Object.values(imagenes).forEach(img => {
    img.onload = () => {
        cargadas++;
        if (cargadas === total) {
            dibujarImagenes();
        }
    };
});
function dibujarImagenes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.background.imageSmoothingEnabled = false;
    // Dibujar en orden: el fondo primero, luego los objetos encima
    ctx.drawImage(imagenes.fondo, 0, 0, canvas.width, canvas.height); // Imagen de fondo
    ctx.drawImage(imagenes.objeto1, 50, 100, 100, 100); // Objeto 1 (Ej: caja)
    ctx.drawImage(imagenes.objeto2, 70, 120, 80, 80);  // Objeto 2 (Ej: personaje)
    ctx.drawImage(imagenes.objeto3, 85, 90, 50, 50);   // Objeto 3 (Ej: sombrero)
}

function gameLoop() {
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
