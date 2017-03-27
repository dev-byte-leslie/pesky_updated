//--------------------------------------------------------------Thomas Rosik-----------------------------------------------
function createGameWorld() {
  var gameX = 0;
  var negativeX = new Array(30); //will be bigger, 10 is just for testing

  //positiveX has to be one bigger to accomodate 0
  var positiveX = new Array(31);

  //generate the numbers in the world arrays
  generateWorldSprites(negativeX, positiveX);


  //0 = red house
  // 1 = blue house
  // 2 = beige house
  // 3 = grey house
  // 4 = Hedge
  var curObj, floorObj; //TODO: Figure out positions for the doors for each house
  gameX = -400;
  for (i = 0; i < negativeX.length; i++) {
    if (negativeX[i] == 0) {
      //create correct house object and door object
      curObj = new spawnWorldObject(redHouse, gameX, 410);
      doorObj = new spawnWorldObject(sDoor, gameX + 190, 500); //shows the test so I remember original height
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (negativeX[i] == 1) {
      //create correct house object and door object
      curObj = new spawnWorldObject(blueHouse, gameX, 410);
      doorObj = new spawnWorldObject(sDoor, gameX + 90, 510);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (negativeX[i] == 2) {
      //create correct house object and door object
      curObj = new spawnWorldObject(beigeHouse, gameX, 410);
      doorObj = new spawnWorldObject(sDoor, gameX + 70, 510);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (negativeX[i] == 3) {
      //create correct house object and door object
      curObj = new spawnWorldObject(greyHouse, gameX, 410);
      doorObj = new spawnWorldObject(sDoor, gameX + 320, 510);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else {
      //creates the hedge object at the correct position
      curObj = new spawnWorldObject(hedge, gameX, 407);
    }

    floorObj = new spawnWorldObject(floorTexture, gameX, 600);
    floors.push(floorObj.obSprite);

    map.addChildAt(floorObj.obSprite, 0);
    //map.addChild(curObj.obSprite);
    gameX -= 400;
  }

  gameX = 0;
  for (i = 0; i < positiveX.length; i++) {
    if (positiveX[i] == 0) {
      curObj = new spawnWorldObject(redHouse, gameX, 410);
    } else if (positiveX[i] == 1) {
      curObj = new spawnWorldObject(blueHouse, gameX, 410);
    } else if (positiveX[i] == 2) {
      curObj = new spawnWorldObject(beigeHouse, gameX, 410);
    } else if (positiveX[i] == 3) {
      curObj = new spawnWorldObject(greyHouse, gameX, 410);
    } else {
      curObj = new spawnWorldObject(hedge, gameX, 407);
    }
    floorObj = new spawnWorldObject(floorTexture, gameX, 600);
    floors.push(floorObj.obSprite);
    map.addChildAt(floorObj.obSprite, 0);
    map.addChild(curObj.obSprite);
    gameX += 400;
  }
}

function generateWorldSprites(negVals, posVals) {
  //create protected lengths for the negative and positive x arrays
  var negLength = negVals.length;
  var posLength = posVals.length;

  //generates random number between 0 and 4 for negative x direction
  var curCell;
  for (var i = 0; i < negLength; i++) {
    curCell = randomInt(0, 3);
    negVals[i] = curCell;
  }

  //assigns a random position for the hedge object
  var randINT = randomInt(0, negLength - 1);
  negVals[randINT] = 4;


  //generates random number between 0 and 4 for positive x direction
  for (var i = 0; i < posLength; i++) {
    curCell = randomInt(0, 3);
    posVals[i] = curCell;
  }

  //assigns a random position for the hedge object in the positive direction
  randINT = randomInt(0, posLength - 1);
  posVals[randINT] = 4;
}

function spawnWorldObject(sprite, xval, yval) {
  //assigns the sprite to the object
  this.obSprite = new Sprite(TextureCache[sprite]);

  //assings the x and y valuse to the world object
  this.x = xval;
  this.y = yval;

  //assigns the sprite x and y values using the object x and y values.
  this.obSprite.x = this.x;
  this.obSprite.y = this.y;
}
