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
    player.sprite.gotoAndStop(0);
  } else {
    if (left.isDown) {
      player.sprite.vx = -5;
      player.sprite.play();
      player.sprite.animationSpeed = .1;
    } else if (right.isDown) {
      player.sprite.vx = 5;
      player.sprite.play();
      player.sprite.animationSpeed = .1;
    } else {
      player.sprite.vx = 0;
    }
  }
  // stop the player if they're not actually pressing anything
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

/*function attack()
{
  if(Raccoon.active)
  {
    //TODO: move the projectile, here or in object, or other funtion?
  }
  if(Skunk.active)
  {
      //TODO: do skunk attack, spray smells
  }
  if(Goose.active)
  {
    //TODO: do goose attack, poop
  }

//TODO:
// create new instance of projectile for animal
// add to an array of projectiles, limit the size so they can only do it so many times
// once attack is done, remove projectile from screen and array
// create an object for each type of projectile, poop, rabies, spray


}*/

//builds the outside game map
function buildOutside() {

  floor.x = 0;
  floor.y = 700;

  //position the example house
  //houseOutside1.x = 500;
  //houseOutside1.y = 400;

  //add both the background and the animal to the stage
  //map.addChild(whiteFloor);
  map.addChild(player.sprite);
  map.addChild(animalCont1.aCObject);
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
  g.stage.position.y = renderer.height;
  //scale it
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;

  this.updateCamera = function() {
    //now specify which point INSIDE stage must be (0,0)
    g.stage.pivot.x = player.sprite.position.x;
    g.stage.pivot.y = player.sprite.position.y;
  };
}

var fps = {
  startTime : 0,
  frameNumber : 0,
  getFPS : function() {
    this.frameNumber++;
    var d = new Date().getTime(),
    currentTime = (d - this.startTime) / 1000,
    result = Math.floor((this.frameNumber / currentTime));
    if (currentTime > 1 ) {
      this.startTime = new Date().getTime();
      this.frameNumber = 0;
    }
    return result;
  }
};
