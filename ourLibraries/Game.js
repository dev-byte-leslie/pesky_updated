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
  //gameObjects.addChild(house);
  //gameObjects.addChild(sewer);
  g.stage.addChild(gameObjects);
  gameObjects.addChild(fpsDisplay);
  createGameWorld();
  player = new Player();
  player.sprite.x = 500;
  player.sprite.y = 600;
  map.addChild(player.sprite);

  animalCont1 = new spawnAnimalControl(WIDTH * 0.703125, 0.83333 * HEIGHT);
  map.addChild(animalCont1.aCObject);
}
