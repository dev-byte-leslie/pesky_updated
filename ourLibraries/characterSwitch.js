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
var buttonRaccoon;
var buttonSkunk;
var buttonGoose;
var switchCharacterGroup; //Container for objects on switch character menu;

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
  //TODO figure out how to assign different button sprites
  hedgeBackground.width = 320;
  hedgeBackground.height = 180;
  switchCharacterGroup.addChild(hedgeBackground);
  switchCharacterGroup.addChild(buttonRaccoon);
  switchCharacterGroup.addChild(buttonSkunk);
  switchCharacterGroup.addChild(buttonGoose);
  g.stage.position.x = 0;
  g.stage.position.y = 0;
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;
  g.stage.pivot.x = 0.5;
  g.stage.pivot.y = 0;
  g.stage.addChild(switchCharacterGroup);
}

// -- Handes Raccoon Button Press -- //
function raccoonInput()
{
  player.setCharacter('raccoon');
  comeFromBush();
}

// -- Handles Skunk Button Press -- //
function skunkInput()
{
  player.setCharacter('skunk');
  comeFromBush();
}

// -- Handles Goose Button Press -- //
function gooseInput()
{
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
  g.stage.position.x = renderer.width / 2;
  g.stage.position.y = renderer.height;
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;
  g.stage.pivot.x = player.sprite.position.x;
  g.stage.pivot.y = 607;
  if (player.spriteArray[8]) {
    player.sprite._texture = player.spriteArray[8]._texture;
    player.sprite._textures = player.spriteArray[8]._textures;
  } else {
    player.sprite._texture = player.spriteArray[4]._texture;
    player.sprite._textures = player.spriteArray[4]._textures;
  }
  if (!player.sprite.visible) {
    player.sprite.x = eval('hedgeLocX' + randomInt(1, 3)) + 157;
  } else {
    player.sprite.x = player.holdX;
  }
  player.camera.updateCamera();
  player.sprite.y = hedgeLocY + 150;
  player.sprite.visible = true;
  gameObjects.visible = true;
  g.state = moveFromHedgeState;
}
