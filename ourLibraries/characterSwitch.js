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
var switchCharacterGroup;

function initCharacterSwitch()
{
  if (raccoonAlive) {
    buttonRaccoon = createButton(WIDTH/2, HEIGHT/2, raccoonInput, switchCharacterGroup, 'carlos');
  } else {
    buttonRaccoon = createButton(WIDTH/2, HEIGHT/2, function(){}, switchCharacterGroup, 'carlos');
  }
  if (raccoonAlive) {
    buttonSkunk = createButton(WIDTH/2, HEIGHT/2, skunkInput, switchCharacterGroup, 'stanky');
  } else {
    buttonSkunk = createButton(WIDTH/2, HEIGHT/2, function(){}, switchCharacterGroup, 'stanky');
  }
  if (raccoonAlive) {
    buttonGoose = createButton(WIDTH/2, HEIGHT/2, gooseInput, switchCharacterGroup, 'walter');
  } else {
    buttonGoose = createButton(WIDTH/2, HEIGHT/2, function(){}, switchCharacterGroup, 'walter');
  }
  //TODO figure out how to assign different button sprites
}

switchCharacterGroup = new PIXI.Container(); //Container for objects on switch character menu
switchCharacterGroup.addChild(buttonRaccoon);
switchCharacterGroup.addChild(buttonSkunk);
switchCharacterGroup.addChild(buttonGoose);

function switchCharacter() {

  // -- Determines Which Char Is Active, Animates Up/Sets Inactive-- //
  if (Raccoon.active)
  {
    Raccoon.active = false;
  }
  else if (Skunk.active)
  {
    Skunk.active = false;
  }
  else if (Goose.active)
  {
    Goose.active = false;
  }

  g.state = switchCharacterState; // -- Displays Menu -- //
}

// -- Handes Raccoon Button Press -- //
function raccoonInput()
{
  Raccoon.active = true;
  player = new Player('raccoon');
  g.state = gameState;
}

// -- Handles Skunk Button Press -- //
function skunkInput()
{
  Skunk.active = true;
  player = new Player('anything else');
  g.state = gameState;
}

// -- Handles Goose Button Press -- //
function gooseInput()
{
  Goose.active = true;
  player = new Player('goose');
  g.state = gameState;
}
