var map, house, sewer, gameObjects, animalCont1, player, chaosBar;
function initGame(animalType = 'raccoon') {
  map = new PIXI.Container();
  house = new PIXI.Container();
  gameObjects = new PIXI.Container();
  chaosBar = new PIXI.Container();

  //calls function that designates what each key does when it is pressed
  // only enable keyboard input (e.g. movement/spacebar) after game is started
  Keys();
  blackOverlay.alpha = 0;
  gameOverText.alpha = 0;
  gameOverText.scale.x = 0.25;
  gameOverText.scale.y = 0.25;
  gameObjects.addChild(map);
  gameObjects.addChild(chaosBar);
  g.stage.addChild(gameObjects);
  gameObjects.addChild(fpsDisplay);
  createGameWorld();
  player = new Player(animalType);
  player.sprite.x = 500;
  player.sprite.y = 600;
  map.addChild(player.sprite);
  //create the chaos bar
  initChaosBar();

  animalCont1 = new spawnAnimalControl(WIDTH * 0.703125, 0.83333 * HEIGHT);
  map.addChild(animalCont1.aCObject);
  g.stage.addChild(blackOverlay);
}
