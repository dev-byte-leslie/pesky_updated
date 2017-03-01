//instantiate variables for the different scenes
// Liable to change depening on how many houses there are
var map = new PIXI.Container(),
  house = new PIXI.Container(),
  sewer = new PIXI.Container(),
  gameObjects = new PIXI.Container();

$(document).ready(function() {
  g.stage.addChild(map);
  g.stage.addChild(house);
  g.stage.addChild(sewer);
  g.stage.addChild(gameObjects);
});

//function setup() {
  //create the background texture from the cache
wTexture = TextureCache['../../images/BackGround.png'];
houseBackgroundTexture1 = TextureCache['../../images/HouseBackground.png'];
houseOutsideTexture1 = TextureCache['../../images/HouseOutside.png'];
doorText = TextureCache['../../images/AnimalPlaceHolder.png'];


  //create the background sprite out of the texture
whiteFloor = new spriteCreator('../../images/BackGround.png', 1000, 1000);
houseBackground1 = new spriteCreator('../../images/HouseBackground.png', 1000, 1000);
houseOutside1 = new spriteCreator('../../images/HouseOutside.png', 400, 400);
door = new spriteCreator('../../images/AnimalPlaceHolder.png', 80, 80);


  //create the animal object

  //Create a animal Control Object
animalCont1 = new spawnAnimalControl(900, 700);


  //TODO shift from basic Sprite Object TO an animated sprite Object
  // Maybe extend a class or look at API for pixi and Animations

  //create the animal object and its texture from the cache
animalObjectTexture = TextureCache['../../images/AnimalPlaceHolder.png'];
animalObject = new Sprite(animalObjectTexture);

  //call the function to build the outside map
buildOutside();
//}

//instantiate global variables that will be used in setup function and in
// other locations
var animalObject, wTexture, tinkPoint, b, whiteFloor, animalTextures, animalAnimated,
  animalObjectTexture, houseBackground1, houseOutside1, houseBackgroundTexture1,
  houseOutsideTexture1, doorText, door;

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
    lowestHeight : 700
  };

  //set the objects starting velocities
  player.sprite.vx = 0;
  player.sprite.vy = 0;

  //set the objects starting point
  player.sprite.x = 300;
  player.sprite.y = 700;

  //position the example house
  houseOutside1.x = 500;
  houseOutside1.y = 400;

  //add both the background and the animal to the stage
  map.addChild(whiteFloor);
  spawnAnimalControl();
  map.addChild(player.sprite);
  //map.addChild(houseOutside1);
}

//variables for animal control
// TODO these will be likely to change, Just are placeholders
var aCTexture, aCObject;

function spawnAnimalControl() {
  aCTexture = TextureCache['../../images/ACPH.png'];
  aCObject = new Sprite(aCTexture);

  aCObject.x = 500;
  aCObject.y = 700;

  aCObject.vx = 0;
  aCObject.vy = 0;

  map.addChild(aCObject);
}

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}
