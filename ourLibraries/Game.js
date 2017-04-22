var map, house, sewer, gameObjects, animalCont1, player, chaosBar;
function initGame(animalType = 'raccoon') {
  map = new PIXI.Container();
  house = new PIXI.Container();
  gameObjects = new PIXI.Container();
  chaosBar = new PIXI.Container();

  //calls function that designates what each key does when it is pressed
  // only enable keyboard input (e.g. movement/spacebar) after game is started
  Keys();
  blackOverlay.alpha = gameOverText.alpha = pointsText.alpha = 0;
  gameOverText.scale.set(0.25, 0.25);
  gameOverText.anchor.set(0.5, 0.5);
  pointsText.scale.set(0.25, 0.25);
  gameObjects.addChild(map);
  gameObjects.addChild(chaosBar);
  gameObjects.addChild(fpsDisplay);
  g.stage.addChild(gameObjects);
  createGameWorld();
  player = new Player(animalType);
  player.sprite.x = 500;
  player.sprite.y = 600;
  map.addChild(player.sprite);
  initChaosBar();
  if (newLevelVal) {
    animalCont1 = new spawnAnimalControl(randomInt(minX, maxX), 600, 0.83333 * HEIGHT);
    //animalCont1 = new spawnAnimalControl(player.sprite.x, 600, 0.83333 * HEIGHT);
    numOfEnemyAi.push(animalCont1);
    numOfEnemyAi.forEach(function(animalControl) {
      map.addChild(animalControl.aCObject);
    });
  }
  g.stage.addChild(blackOverlay);
}
