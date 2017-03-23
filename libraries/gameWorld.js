function createGameWorld() {
  var gameX = 0;
  var negativeX = new Array(10); //will be bigger, 10 is just for testing

  //positiveX has to be one bigger to accomodate 0
  var positiveX = new Array(11);
  // TODO: Take converted player coordinates and draw to the screen the correct sprites
  // TODO: Make sure the sprites/objects are deleted when arent onscreen

  //generate the numbers in the world arrays
  generateWorldSprites(negativeX, positiveX);
  //0 = red house
  // 1 = blue house
  // 2 = beige house
  // 3 = grey house
  // 4 = Hedge
  var curObj;
  for (i = 0; i < negativeX.length; i++) {
    if (negativeX[i] == 0) {
      curObj = new spawnWorldObject(redHouse, gameX, 410);
    } else if (negativeX[i] == 1) {
      curObj = new spawnWorldObject(blueHouse, gameX, 410);
    } else if (negativeX[i] == 2) {
      curObj = new spawnWorldObject(beigeHouse, gameX, 410);
    } else if (negativeX[i] == 3) {
      curObj = new spawnWorldObject(greyHouse, gameX, 410);
    } else {
      curObj = new spawnWorldObject(hedge, gameX, 410);
    }
    map.addChild(curObj.obSprite);
    gameX -= 400;
  }
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

  //generates random number between 0 and 4 for negative x direction
  for (var i = 0; i < negLength; i++) {
    var curCell = randomInt(0, 4);
    negVals[i] = curCell;
  }
  //generates random number between 0 and 4 for positive x direction
  for (var i = 0; i < posLength; i++) {
    var curCell = randomInt(0, 4);
    posVals[i] = curCell;
  }
}

function spawnWorldObject(sprite, xval, yval) {
  this.obSprite = new Sprite(TextureCache[sprite]);
  this.x = xval;
  this.y = yval;
  this.obSprite.x = this.x;
  this.obSprite.y = this.y;
}
