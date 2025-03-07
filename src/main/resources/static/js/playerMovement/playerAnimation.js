const walkingFrames = (rootFrame=0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame+1
            },
            {
                time: 100,
                frame: rootFrame
            },
            {
                time: 200,
                frame: rootFrame+1
            },
            {
                time: 300,
                frame: rootFrame+2
            }
        ]
    }
}

const standingFrames = (rootFrame=0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame
            }
        ]
    }
}

// walking
export const WALK_DOWN = walkingFrames(0);
export const WALK_RIGHT = walkingFrames(3);
export const WALK_UP = walkingFrames(6);
export const WALK_LEFT = walkingFrames(9);

// standing
export const STAND_DOWN = standingFrames(1);
export const STAND_LEFT = standingFrames(10);
export const STAND_RIGHT = standingFrames(4);
export const STAND_UP = standingFrames(7);

export const PICK_UP_DOWN = {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: 12
      }
    ]
  }
  