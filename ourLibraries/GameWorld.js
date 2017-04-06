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
      doorObj = new spawnWorldObject(iDoor, gameX + 190, 525); //shows the test so I remember original height - 500?
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (negativeX[i] == 1) {
      //create correct house object and door object
      curObj = new spawnWorldObject(blueHouse, gameX, 410);
      doorObj = new spawnWorldObject(iDoor, gameX + 90, 525);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (negativeX[i] == 2) {
      //create correct house object and door object
      curObj = new spawnWorldObject(beigeHouse, gameX, 410);
      doorObj = new spawnWorldObject(iDoor, gameX + 70, 525);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (negativeX[i] == 3) {
      //create correct house object and door object
      curObj = new spawnWorldObject(greyHouse, gameX, 410);
      doorObj = new spawnWorldObject(iDoor, gameX + 320, 525);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else {
      //creates the hedge object at the correct position
      curObj = new spawnWorldObject(hedge, gameX, 407);
      hedgeLocX1 = gameX;
      hedgeLocY = 407;
    }
    floorObj = new spawnWorldObject(floorTexture, gameX, 600);
    floors.push(floorObj.obSprite);
    map.addChildAt(floorObj.obSprite, 0);
    map.addChild(curObj.obSprite);
    gameX -= 400;
  }
  minX = gameX;

  gameX = 0;
  for (i = 0; i < positiveX.length; i++) {
    if (positiveX[i] == 0) {
      curObj = new spawnWorldObject(redHouse, gameX, 410);
      doorObj = new spawnWorldObject(iDoor, gameX + 190, 525); //shows the test so I remember original height
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (positiveX[i] == 1) {
      curObj = new spawnWorldObject(blueHouse, gameX, 410);
      doorObj = new spawnWorldObject(iDoor, gameX + 90, 525);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (positiveX[i] == 2) {
      curObj = new spawnWorldObject(beigeHouse, gameX, 410);
      doorObj = new spawnWorldObject(iDoor, gameX + 70, 525);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else if (positiveX[i] == 3) {
      curObj = new spawnWorldObject(greyHouse, gameX, 410);
      doorObj = new spawnWorldObject(iDoor, gameX + 320, 525);
      houseDoors.push(doorObj.obSprite);
      map.addChild(doorObj.obSprite);

    } else {
      curObj = new spawnWorldObject(hedge, gameX, 407);
      if (hedgeLocX1 && hedgeLocX2) {
        hedgeLocX3 = gameX;
      } else {
        hedgeLocX2 = gameX;
      }
      hedgeLocY = 407;
    }
    floorObj = new spawnWorldObject(floorTexture, gameX, 600);
    floors.push(floorObj.obSprite);
    map.addChildAt(floorObj.obSprite, 0);
    map.addChild(curObj.obSprite);
    gameX += 400;
  }
  maxX = gameX;

  people1.forEach(function(person) {
    person.x = Math.random() < 0.5 ? maxX * Math.random() : minX * Math.random();
    person.y = 525;
    person.animationSpeed = 0.08;
    let direction = Math.random() < 0.5 ? 1 : -1;
    person.vx = direction;
    person.scale.x = direction;
    person.play();
    map.addChild(person);
  });
  people2.forEach(function(person) {
    person.x = Math.random() < 0.5 ? maxX * Math.random() : minX * Math.random();
    person.y = 525;
    person.animationSpeed = 0.08;
    let direction = Math.random() < 0.5 ? 1 : -1;
    person.vx = direction;
    person.scale.x = direction;
    person.play();
    map.addChild(person);
  });
  people3.forEach(function(person) {
    person.x = Math.random() < 0.5 ? maxX * Math.random() : minX * Math.random();
    person.y = 525;
    person.animationSpeed = 0.08;
    let direction = Math.random() < 0.5 ? 1 : -1;
    person.vx = direction;
    person.scale.x = direction;
    person.play();
    map.addChild(person);
  });
  garbages.forEach(function(garbage) {
    garbage.x = Math.random() < 0.5 ? maxX * Math.random() : minX * Math.random();
    garbage.y = 600;
    garbage.anchor.set(0.5, 1);
    garbage.animationSpeed = 0.1;
    garbage.loop = false;
    map.addChild(garbage);
  });

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
  posVals[1] = 4;
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
