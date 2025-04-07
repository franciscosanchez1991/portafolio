export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"
export const DOWN = "DOWN"

export class OutsiderInput {
    constructor() {        
        this.heldDirections = [];
        this.heldKeys = [];
        window.addEventListener('player_moves', (event) => {
            const movement = event.detail;
            console.log('Player moves to:', movement.move, "length", movement.move.length);     
            this.heldDirections = movement.move;       
        });
    }
    get direction() {
        return this.heldDirections[0];
      }
        

    onArrowPressed(direction) {
    // Add this arrow to the queue if it's new
    if (this.heldDirections.indexOf(direction) === -1) {
        this.heldDirections.unshift(direction);
    }
    }

    onArrowReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        if (index === -1) {
            return;
        }
        // Remove this key from the list
        this.heldDirections.splice(index, 1);
    }
}