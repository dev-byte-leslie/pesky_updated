//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump
  if (player.spacePush && player.sprite.vy == 0) {
    player.jumping = true;
    player.sprite.vy = -10;
    jump.play();
  }
  if (player.sprite.vy == 0 && player.lastVy >= 0) {
    player.jumping = false;
  }
  if (player.jumping) {
    player.sprite.vy += 0.4;
  }
  player.lastVy = player.sprite.vy;
}

//build the inside of a house
function enterHouse() {
  door.x = 800;
  door.y = 700;

  house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
  stage = house;
}

function attack()
{
  if(Raccoon.active)
  {
    //TODO: do raccoon attack, shoot rabies
  }
  if(Skunk.active)
  {
      //TODO: do skunk attack, spray smells
  }
  if(Goose.active)
  {
    //TODO: do goose attack, fly, poop
  }

//TODO:
// create new instance of projectile for animal
// add to an array of projectiles, limit the size so they can only do it so many times
// once attack is done, remove projectile from screen and array
// create an object for each type of projectile, poop, rabies, spray


}



//builds the outside game map
function buildOutside() {

  //TODO create function that generates unlimited background
  // with different background objects, or use tiling software
  // whichever is the easier of the two

  //create the object that represents the player
  player = {
    sprite : animalObject,
    lastVy : 0,
    jumping : false,
    jumpHeight : 350,
    spacePush : false,
    lowestHeight : 600,
    active : true,
    moveStates : ['Left', 'Right', 'Jump', 'StopL', 'StopR']
  };

  player.sprite.anchor.set(0.5, 1);

  //set the objects starting velocities
  player.sprite.vx = 0;
  player.sprite.vy = 0;

  //set the objects starting point
  player.sprite.x = 300;
  player.sprite.y = 600;

  //position the example house
  houseOutside1.x = 500;
  houseOutside1.y = 400;

  //add both the background and the animal to the stage
  map.addChild(whiteFloor);
  map.addChild(animalCont1.aCObject);
  map.addChild(player.sprite);
  //map.addChild(houseOutside1);

  stage = map;
}

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}

//generates a random integer between the min and max values
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function camera() {
  g.stage.position.x = renderer.width / 2;
  g.stage.position.y = renderer.height / 2;
    //scale it
  g.stage.scale.x = 1.5;
  g.stage.scale.y = 1.5;

  this.updateCamera = function() {
    //now specify which point INSIDE stage must be (0,0)
    g.stage.pivot.x = player.sprite.position.x;
    g.stage.pivot.y = player.sprite.position.y;
  };
}

function createGameWorld() {
  var gameWorld =
    {
      x : 0,
      y : 0,
      width : 1000, //x size of background
      height : 1000 // y size of background
    };

  camera.x = (gameWorld.x / 2) - camera.width / 2;
  camera.y = (gameWorld.y / 2) - camera.height / 2;
}
