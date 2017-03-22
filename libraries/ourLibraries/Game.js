var map, house, sewer, gameObjects, animalCont1;
function initGame() {
  map = new PIXI.Container();
  house = new PIXI.Container();
  sewer = new PIXI.Container();
  gameObjects = new PIXI.Container();

  gameObjects.addChild(map);
  gameObjects.addChild(house);
  gameObjects.addChild(sewer);
  gameObjects.addChild(floor);
  g.stage.addChild(gameObjects);
  player = new Player();
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


  floor.x = 0;
  floor.y = 700;

  //position the example house
  houseOutside1.x = 500;
  houseOutside1.y = 400;

  //add both the background and the animal to the stage
  map.addChild(whiteFloor);
  map.addChild(player.sprite);
  map.addChild(animalCont1.aCObject);
  //map.addChild(houseOutside1);
}
