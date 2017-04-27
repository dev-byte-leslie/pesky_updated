/********************************************************************
 *
 *File: characterSwitch.js
 *Project: Pesky
 *Author: Leslie Murphy
 *Description: JavaScript code that implements switching chracters.
 *Date: 2-15-17
 *Comments:
 *
 *********************************************************************/
/* globals PIXI, createButton, Raccoon, Skunk, Goose, WIDTH, HEIGHT, switchCharacterState,
 */ //Tells EsLint that these things do exist

/* exported switchCharacter, initCharacterSwitch */ //Makes ESLint shut up about the created and not used errors
//1280 x 720
var buttonRaccoon, buttonSkunk, buttonGoose, switchCharacterGroup;

function initCharacterSwitch()
{
  switchCharacterGroup = new PIXI.Container();
  if (raccoonAlive) {
    buttonRaccoon = createButton(80, 85, raccoonInput, switchCharacterGroup, 'carlos');
  } else {
    buttonRaccoon = createButton(80, 85, function() {}, switchCharacterGroup, 'carlos', 'Click', false);
  }
  if (skunkAlive) {
    buttonSkunk = createButton(160, 85, skunkInput, switchCharacterGroup, 'stanky');
  } else {
    buttonSkunk = createButton(160, 85, function() {}, switchCharacterGroup, 'stanky', 'Click', false);
  }
  if (gooseAlive) {
    buttonGoose = createButton(240, 85, gooseInput, switchCharacterGroup, 'walter');
  } else {
    buttonGoose = createButton(240, 85, function() {}, switchCharacterGroup, 'walter', 'Click', false);
  }
  hedgeBackground.width = 320;
  hedgeBackground.height = 180;
  switchCharacterGroup.addChild(hedgeBackground);
  switchCharacterGroup.addChild(buttonRaccoon);
  switchCharacterGroup.addChild(buttonSkunk);
  switchCharacterGroup.addChild(buttonGoose);
  g.stage.position.set(0, 0);
  g.stage.scale.set(4, 4);
  g.stage.pivot.set(0.5, 0);
  g.stage.addChild(switchCharacterGroup);
}
function raccoonInput() { // -- Handes Raccoon Button Press -- //
  if (!newLevelVal) {
    initGame('raccoon');
    hideAll();
    gameObjects.visible = true;
    player.sprite.y = hedgeLocY + 150;
    player.sprite.x = hedgeLocX2 + 157;
    player.setTextures(8);
    player.sprite.play();
    player.holdX = hedgeLocX2 + 157;
    disableAttacking = true;
    let c = new camera();
    c.updateCamera();
    g.state = moveFromHedgeState;
    newLevelVal = false;
  }
  player.setCharacter('raccoon');
  comeFromBush();
}
function skunkInput() { // -- Handles Skunk Button Press -- //
  if (!newLevelVal) {
    initGame('skunk');
    hideAll();
    gameObjects.visible = true;
    player.sprite.y = hedgeLocY + 150;
    player.sprite.x = hedgeLocX2 + 157;
    player.setTextures(8);
    player.sprite.play();
    player.holdX = hedgeLocX2 + 157;
    disableAttacking = true;
    let c = new camera();
    c.updateCamera();
    g.state = moveFromHedgeState;
    newLevelVal = false;
  }
  player.setCharacter('skunk');
  comeFromBush();
}
function gooseInput() { // -- Handles Goose Button Press -- //
  if (!newLevelVal) {
    initGame('goose');
    hideAll();
    gameObjects.visible = true;
    player.sprite.y = hedgeLocY + 150;
    player.sprite.x = hedgeLocX2 + 157;
    player.setTextures(8);
    player.sprite.play();
    player.holdX = hedgeLocX2 + 157;
    disableAttacking = true;
    let c = new camera();
    c.updateCamera();
    g.state = moveFromHedgeState;
    newLevelVal = false;
  }
  player.setCharacter('goose');
  comeFromBush();
}

function comeFromBush() {
  switchCharacterGroup.removeChild(hedgeBackground);
  switchCharacterGroup.removeChild(buttonRaccoon);
  switchCharacterGroup.removeChild(buttonSkunk);
  switchCharacterGroup.removeChild(buttonGoose);
  g.stage.removeChild(switchCharacterGroup);
  disableAttacking = false;
  g.stage.position.set(renderer.width / 2, renderer.height);
  g.stage.scale.set(4, 4);
  g.stage.pivot.set(player.sprite.x, 607);
  player.setTextures(8);
  if (!player.sprite.visible) {
    player.sprite.x = eval('hedgeLocX' + randomInt(1, 3)) + 157;
  } else {
    player.sprite.x = player.holdX;
  }
  player.camera.updateCamera();
  player.sprite.y = hedgeLocY + 150;
  player.sprite.visible = gameObjects.visible = true;
  numOfEnemyAi.forEach(function(animalCont1) {
    let randX = Math.random() < 0.5 ? player.sprite.x - 600 : player.sprite.x + 600;
    animalCont1.aCObject.x = randX;
  });
  g.state = moveFromHedgeState;
}
