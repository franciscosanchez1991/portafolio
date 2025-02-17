async function selectCharacter(userId, character) {
    try {
        const response = await axios.post('/user/select-character', { userId, character });
        console.log(response.data);
    } catch (error) {
        console.error("Error al seleccionar el personaje:", error.response?.data || error.message);
    }
}

export const left = 'left';
export const right = 'right';
export const up = 'up';
export const down = 'down';


export class Character{
    constructor(){

        this.heldDirections = [];   

        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.onPress(left);
            }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.onPress(right);
            }
            if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                this.onPress(up);
            }
            if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                this.onPress(down);
            }

        });
        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.onRelease(left);
            }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.onRelease(right);
            }
            if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                this.onRelease(up);
            }
            if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                this.onRelease(down);
            }
        });
    }

    get direction(){
        return this.heldDirections[0];
    }

    onPress(direction){
        if (this.heldDirections.indexOf(direction) === -1) { // esto permite no añadir la misma dirección con las 2 teclas
            this.heldDirections.unshift(direction);
        }
    }
    onRelease(direction){
        const index = this.heldDirections.indexOf(direction);
        if (index === -1) {
            return;            
        }
        // se soltó una dirección que no estaba en la lista 
        this.heldDirections.splice(index, 1);
    }
}