function Keys() {
  //Capture the keyboard arrow keys
  var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40),
    space = keyboard(32),
    shiftKey = keyboard(16),
    switchE = keyboard(69);


  //Left arrow key `press` method
  left.press = function() {
  //Change the sprite's velocity when the key is pressed
    animalObject.vx = -5;
  };


  //Left arrow key `release` method
  left.release = function() {
  //If the left arrow has been released, and the right arrow isn't down,
  //and the pixie isn't moving vertically, stop the sprite from moving
  //by setting its velocity to zero
    if (!right.isDown) {
      animalObject.vx = 0;
    }
  };


  //Up
  up.press = function() {
  //TODO Make sure only works in certain spots
    animalObject.vy = -5;
    animalObject.vx = 0;
  };


  up.release = function() {
    if (!down.isDown && animalObject.vx === 0) {
      animalObject.vy = 0;
    }
  };


  //Right
  right.press = function() {
    animalObject.vx = 5;
  };


  right.release = function() {
    if (!left.isDown) {
      animalObject.vx = 0;
    }
  };


  //Down
  //TODO Make sure only works in certain spots
  down.press = function() {
    animalObject.vy = 5;
    animalObject.vx = 0;
  };


  down.release = function() {
    if (!up.isDown && animalObject.vx === 0) {
      animalObject.vy = 0;
    }
  };


  space.press = function() {
    //animalObject.play();
    //animalObject.animationSpeed = 0.55;
    player.spacePush = true;
  };


  space.release = function() {
    //animalObject.gotoAndStop(0);

  };

  shiftKey.press = function() {
    //TODO ADD attacking code/attacking animation
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
  };

  switchE.release = function() {
    //TODO maybe use this for something
  };
}
