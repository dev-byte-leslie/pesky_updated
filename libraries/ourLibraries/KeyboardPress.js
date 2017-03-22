//----------------------------------------------------------Thomas Rosik-------------------------------------------------------------------
//variable to control if movement stops when landing during a jump
var moveMent = false;
var left, up, right, down, space, shiftKey, switchE;

function Keys() {
  //Capture the keyboard arrow keys/other keys needed for controls
  left = keyboard(37);
  up = keyboard(38);
  right = keyboard(39);
  down = keyboard(40);
  space = keyboard(32);
  shiftKey = keyboard(16);
  switchE = keyboard(69);

  //Left arrow key `press` method
  left.press = function() {
  //Change the sprite's velocity when the key is pressed
    player.sprite.scale.x = 1;
    if (!player.jumping) {
      animalObject.vx = -5;
      player.sprite.play();
      player.sprite.animationSpeed = .1;
    } else {
      player.sprite.gotoAndStop(0);
    }
    moveMent = true;
  };


  //Left arrow key `release` method
  left.release = function() {
  //If the left arrow has been released, and the right arrow isn't down,
  //and the pixie isn't moving vertically, stop the sprite from moving
  //by setting its velocity to zero
    if (!right.isDown) {
      player.sprite.gotoAndStop(0);
      if (!player.jumping) {
        animalObject.vx = 0;
      }
      moveMent = false;
    }
  };


  //Up
  up.press = function() {
  //TODO Make sure only works in certain spots
  };


  up.release = function() {
  };


  //Right
  right.press = function() {
    player.sprite.scale.x = -1;
    if (!player.jumping) {
      player.sprite.play();
      player.sprite.animationSpeed = .1;
      animalObject.vx = 5;
    } else {
      player.sprite.gotoAndStop(0);
    }
    moveMent = true;
  };


  right.release = function() {
    if (!left.isDown) {
      player.sprite.gotoAndStop(0);
      if (!player.jumping) {
        animalObject.vx = 0;
      }
      moveMent = false;
    }
  };


  //Down
  //TODO Make sure only works in certain spots
  down.press = function() {
  };


  down.release = function() {
  };


  space.press = function() {
    //animalObject.animationSpeed = 0.55;
    player.spacePush = true;
  };


  space.release = function() {
    //animalObject.gotoAndStop(0);
    player.spacePush = false;

  };

  shiftKey.press = function() {
    //TODO ADD attacking code/attacking animation
    player.attack();

  };

  shiftKey.release = function() {
    //TODO stop the attacking code/animation
  };

  switchE.press = function() {
    //TODO add changes whether it is house, sewer, or character changes
    // location
    if (b.hitTestRectangle(player.sprite, houseOutside1)) {
      enterHouse();
    }

    if (b.hitTestRectangle(player.sprite, door)) {
      buildOutside();
    }
    if (b.hitTestRectangle(player.sprite, hedge))
    {
      hideAll();
      switchCharacterGroup.visible = true;
      switchCharacter();
    }
  };

  switchE.release = function() {
    //TODO maybe use this for something
  };
}
