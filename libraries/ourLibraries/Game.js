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
  animalCont1 = new spawnAnimalControl(WIDTH * 0.703125, 0.83333 * HEIGHT);
  buildOutside();
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

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}
