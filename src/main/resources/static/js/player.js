async function selectCharacter(userId, character) {
    try {
        const response = await axios.post('/user/select-character', { userId, character });
        console.log(response.data);
    } catch (error) {
        console.error("Error al seleccionar el personaje:", error.response?.data || error.message);
    }
}

class Player {
    constructor() { // Aquí puedes definir las propiedades de los jugadores
        this.x = 0;
        this.y = 0;
        this.sprite = null;
    }
    drawPlayers() {
        players.clearRect(0, 0, canvasManager.canvases.players.width, canvasManager.canvases.players.height);
        // Aquí dibujas los jugadores dinámicamente
    }

}
const player = new Player();
export default player;