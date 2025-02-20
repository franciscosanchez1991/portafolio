export const walls = new Set();

for (let x = 0; x <= 1000; x += 16) { // the character cant pass the wall
    walls.add(`${x},32`);
}
