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
    buttonRaccoon = createButton(0, 0, raccoonInput, switchCharacterGroup, 'carlos');
  } else {
    buttonRaccoon = createButton(0, 0, raccoonInput, switchCharacterGroup, 'carlos');
  }
  if (skunkAlive) {
    buttonSkunk = createButton(WIDTH/2, HEIGHT/16, skunkInput, switchCharacterGroup, 'stanky');
  } else {
    buttonSkunk = createButton(WIDTH/2, HEIGHT/16, skunkInput, switchCharacterGroup, 'stanky');
  }
  if (gooseAlive) {
    buttonGoose = createButton(WIDTH/2, HEIGHT/2, gooseInput, switchCharacterGroup, 'walter');
  } else {
    buttonGoose = createButton(WIDTH/2, HEIGHT/2, gooseInput, switchCharacterGroup, 'walter');
  }
  //TODO figure out how to assign different button sprites
  switchCharacterGroup.addChild(houseBackground1);
  switchCharacterGroup.addChild(buttonRaccoon);
  switchCharacterGroup.addChild(buttonSkunk);
  switchCharacterGroup.addChild(buttonGoose);
  g.stage.scale.x = 1;
  g.stage.scale.y = 1;
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
  switchCharacterGroup.removeChild(houseBackground1);
  switchCharacterGroup.removeChild(buttonRaccoon);
  switchCharacterGroup.removeChild(buttonSkunk);
  switchCharacterGroup.removeChild(buttonGoose);
  g.stage.removeChild(switchCharacterGroup);
  disableAttacking = false;
  g.stage.position.x = renderer.width / 2;
  g.stage.position.y = renderer.height;
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;
  if (player.spriteArray[8]) {
    player.sprite._texture = player.spriteArray[8]._texture;
    player.sprite._textures = player.spriteArray[8]._textures;
  } else {
    player.sprite._texture = player.spriteArray[4]._texture;
    player.sprite._textures = player.spriteArray[4]._textures;
  }
  player.sprite.x = player.holdX;
  player.sprite.y = hedgeLocY1 + 150;
  gameObjects.visible = true;
  g.state = moveFromHedgeState;
}
