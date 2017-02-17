/********************************************************************
*
*File: characterSwitch.js
*Project: Pesky
*Author: Leslie Murphy
*Description: JavaScript code that implements switching chracters.
*Date: 2-15-17
*Comments: Inital pseudocode framework. Inital git upload.
*
*********************************************************************/

 function switchCharacter()
 {
     // TODO: animate the player up
     //  TODO: set active to false, it disappears.
      state = switchCharacter; //a sort of pause state
      displayMenu();
 }

 function displayMenu()
 {
     handleInput()
//    TODO: Menu dissappears
//    TODO: Object is changes from original one to the newly selected one
 }

 function handleInput()
 {
   //TOFO: implement button presses in if statements
    if(/*user pressed raccoon button*/)
    {
      Raccoon.active = true;
      player = Raccoon;
      //TODO: draw new player
    }


    if(/*user pressed skunk button*/)
    {
      Skunk.active = true;
      player = Skunk;
      //TODO: draw new player

    }

    if(/*user presses goose button*/ )
    {
      Goosoe.active = true;
      player = Goose;
      //TODO: draw new player
    }

  }
