function createGameWorld() {
  //TODO:create two arrays: One is positive x direction, other is negative directions

  var negativeX = [10]; //will be bigger, 10 is just for testing

  //positiveX has to be one bigger to accomodate 0
  var positiveX = [11];
  // TODO: Take converted player coordinates and draw to the screen the correct sprites
  // TODO: Make sure the sprites/objects are deleted when arent onscreen
}

//takes x value of player to calculate where in the array it is
function playerPosition(x_value) {
  var tempx = x_value;

  if (tempx < 0) {
    tempx *= -1;

    //TODO: Determine whether whole map can be generated at one time.
  }
}

function generateWorldSprites(negVals, posVals) {
  var negLength = negVals.length;
  var posLength = posVals.length;

  
}
