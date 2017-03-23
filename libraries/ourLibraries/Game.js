var map, house, sewer, gameObjects, animalCont1, player;
function initGame() {
  map = new PIXI.Container();
  house = new PIXI.Container();
  sewer = new PIXI.Container();
  gameObjects = new PIXI.Container();

  //calls function that designates what each key does when it is pressed
  // only enable keyboard input (e.g. movement/spacebar) after game is started
  Keys();

  gameObjects.addChild(map);
  gameObjects.addChild(house);
  gameObjects.addChild(sewer);
  //gameObjects.addChild(floor);
  g.stage.addChild(gameObjects);
  createGameWorld();
  player = new Player();
  animalCont1 = new spawnAnimalControl(WIDTH * 0.703125, 0.83333 * HEIGHT);
  buildOutside();
}
