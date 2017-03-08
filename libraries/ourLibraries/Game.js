//instantiate variables for the different scenes
// Liable to change depening on how many houses there are
var map = new PIXI.Container(),
  house = new PIXI.Container(),
  sewer = new PIXI.Container(),
  gameObjects = new PIXI.Container(),
  animalCont1;

gameObjects.addChild(map);
gameObjects.addChild(house);
gameObjects.addChild(sewer);

function initGame() {
  g.stage.addChild(gameObjects);
  animalCont1 = new spawnAnimalControl(900, 600);
  buildOutside();
}

function jump() {
  //start the player jump
  if (!player.jumping && player.spacePush) {
    player.jumping = true;
    animalObject.vy = -10;

  }

  //make sure there is no double jump
  if (player.sprite.y >= player.lowestHeight) {
    player.jumping = false;
    player.spacePush = false;
  }

  //stop from falling too far
  if (player.sprite.y >= player.lowestHeight) {
    player.sprite.y = player.lowestHeight;
  }
}

//build the inside of a house
function enterHouse() {
  door.x = 800;
  door.y = 700;

  house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
}

//builds the outside game map
function buildOutside() {

  //TODO create function that generates unlimited background
  // with different background objects, or use tiling software
  // whichever is the easier of the two

  //create the object that represents the player
  player = {
    sprite : animalObject,
    jumping : false,
    jumpHeight : 350,
    spacePush : false,
    lowestHeight : 610
  };

  //set the objects starting velocities
  player.sprite.vx = 0;
  player.sprite.vy = 0;

  //set the objects starting point
  player.sprite.x = 300;
  player.sprite.y = 610;

  player.sprite.anchor.set(0.5, 1);

  //position the example house
  houseOutside1.x = 500;
  houseOutside1.y = 400;

  //add both the background and the animal to the stage
  map.addChild(whiteFloor);
  map.addChild(player.sprite);
  map.addChild(animalCont1.aCObject);
  //map.addChild(houseOutside1);
}

//variables for animal control
// TODO these will be likely to change, Just are placeholders

function spawnAnimalControl(x, y) {
  //instantiate animal control sprite
  this.aCObject = new spriteCreator('../../images/animal_control.png', 60, 75);

  //change the anchor point of the sprite so when it flips it looks normal
  this.aCObject.anchor.set(0.5, 1);

  //set sprite animation speed to not be too fast
  this.aCObject.animationSpeed = .3;

  //set x and y values of sprite
  this.aCObject.x = x;  //900;
  this.aCObject.y = y;  //600;

  //instantiate the velocities to be 0 in both directions
  this.aCObject.vx = 0;
  this.aCObject.vy = 0;


  //method that will be called every time "play" is called to deal with
  // ai movement
  this.aiMovement = function() {
      //doesnt let ai fall below the "floor"
    if (this.aCObject.y > 600) {
      this.aCObject.y = 600;
    }

    if (Math.abs(this.aCObject.x - player.sprite.x) <=  300 && Math.abs(this.aCObject.y - player.sprite.y) <= 300) {
      //if player is to the right of enemy
      if (this.aCObject.x < player.sprite.x) {
        this.aCObject.vx = 3.5;
        this.aCObject.scale.x = 1;
        this.aCObject.play();
      }

    //if player is to the left of enemy
      if (this.aCObject.x > player.sprite.x) {
        this.aCObject.vx = -3.5;
        this.aCObject.scale.x = -1;
        this.aCObject.play();
      }
    /*
    //if player is below enemy
        if (animalCont1.y < player.sprite.y) {
          animalCont1.vy = 3.5;
        }

    //if player is above enemy
        if (animalCont1.y > player.sprite.y) {
          animalCont1.vy = -3.5;
        }*/

      //if player is next to enemy
      if (b.hitTestRectangle(this.aCObject, player.sprite)) {
        this.aCObject.gotoAndStop(0);
        this.aCObject.vy = 0;
        this.aCObject.vx = 0;
      }
    }

      //stops enemy movement if player is too far away
    if (Math.abs(this.aCObject.x - player.sprite.x) >  300 || Math.abs(this.aCObject.y - player.sprite.y) > 300) {
      this.aCObject.gotoAndStop(0);
      this.aCObject.vx = 0;
      this.aCObject.vy = 0;
    }

    //add x and y velocities to the animal control object
    this.aCObject.x += this.aCObject.vx;
    this.aCObject.y += this.aCObject.vy;
  };
}

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}
