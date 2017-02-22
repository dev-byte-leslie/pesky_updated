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

var switchCharacterGroup = new PIXI.Contaner(); //Container for objects on switch character menu
buttonRaccoon = createButton(x, y, raccoonInput, switchCharacterGroup, spriteName); //TODO: sprintName, and x and y position(center of button)
buttonSkunk = createButton(x, y, skunkInput, switchCharacterGroup, spriteName); //TODO: sprintName, and x and y position(center of button)
buttonGoose = createButton(x, y, gooseInput, switchCharacterGroup, spriteName); //TODO: sprintName, and x and y position(center of button)

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
  else if (Gosoe.active)
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
  Goosoe.active = true;
  player.sprite = Goose;
  g.state = gameState;
}
