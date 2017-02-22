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

function switchCharacter()
{
     // -- Determines Which Char Is Active, Animates Up/Sets Inactive-- //
  if(Raccoon.active)
    {
         // TODO: animate the player up
    Raccoon.active = false;
  }
  else if(Skunk.active)
    {
         // TODO: animate the player up
    Skunk.active = false;
  }
  else if(Gosoe.active)
    {
         // TODO: animate the player up
    Goose.active = false;
  }

  g.state = switchCharacterState; //a sort of pause state for game
}

//TODO: implement button presses in if statements
function raccoonInput()
{
  Raccoon.active = true;
  player = Raccoon;
    //TODO: draw new player
}


function skunkInput()
{
  Skunk.active = true;
  player = Skunk;
  // TODO: Switch game state back to game
    //TODO: draw new player
}

function gooseInput()
{
  Goosoe.active = true;
  player = Goose;
    //TODO: draw new player
}
