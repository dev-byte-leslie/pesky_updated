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
/* globals createButton, Raccoon, Skunk, Goose, WIDTH, HEIGHT, switchCharacterState,
 */ //Tells EsLint that these things do exist

/* exported switchCharacter, initCharacterSwitch */ //Makes ESLint shut up about the created and not used errors
//1280 x 720
var buttonRaccoon;
var buttonSkunk;
var buttonGoose;
var switchCharacterGroup;

function initCharacterSwitch()
{
  buttonRaccoon = createButton(WIDTH/2, HEIGHT/2, raccoonInput, switchCharacterGroup, 'carlos');
  buttonSkunk = createButton(WIDTH/2, HEIGHT/2, skunkInput, switchCharacterGroup, 'stanky');
  buttonGoose = createButton(WIDTH/2, HEIGHT/2, gooseInput, switchCharacterGroup, 'walter');
}

switchCharacterGroup = new PIXI.Container(); //Container for objects on switch character menu
switchCharacterGroup.addChild(buttonRaccoon);
switchCharacterGroup.addChild(buttonSkunk);
switchCharacterGroup.addChaild(buttonGoose);

function switchCharacter() {

  // -- Determines Which Char Is Active, Animates Up/Sets Inactive-- //
  if (Raccoon.active)
  {
    //TODO: animate the player up
    Raccoon.active = false;
  }
  else if (Skunk.active)
  {
    //TODO: animate the player up
    Skunk.active = false;
  }
  else if (Goose.active)
  {
    //TODO: animate the player up
    Goose.active = false;
  }

  g.state = switchCharacterState; // -- Displays Menu -- //
}

// -- Handes Raccoon Button Press -- //
function raccoonInput()
{
  Raccoon.active = true;
  player.sprite = Raccoon;
  g.state = gameState;
}

// -- Handles Skunk Button Press -- //
function skunkInput()
{
  Skunk.active = true;
  player.sprite = Skunk;
  g.state = gameState;
}

// -- Handles Goose Button Press -- //
function gooseInput()
{
  Goose.active = true;
  player.sprite = Goose;
  g.state = gameState;
}
