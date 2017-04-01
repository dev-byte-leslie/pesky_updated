//----------------------------------------------------------Thomas Rosik-------------------------------------------------------------------
//variable to control if movement stops when landing during a jump
var moveMent = false;
var left, up, right, down, space, shiftKey, switchE, f1;
var fpsEnabled = false;
var isAttacking = false;
var disableAttacking = false;

function Keys() {
  //Capture the keyboard arrow keys/other keys needed for controls
  left = keyboard(37);
  up = keyboard(38);
  right = keyboard(39);
  down = keyboard(40);
  space = keyboard(32);
  shiftKey = keyboard(16);
  switchE = keyboard(69);
  f1 = keyboard(112);

  //Left arrow key `press` method
  left.press = function() {
  //Change the sprite's velocity when the key is pressed
    if (!player.jumping && !disableMovement && !shiftKey.isDown) {
      player.sprite.scale.x = 1;
      player.sprite.vx = -5 * 60 / fps;
      player.sprite._texture = player.spriteArray[5]._texture;
      player.sprite._textures = player.spriteArray[5]._textures;
      this.doingIdle = false;
      player.sprite.play();
    }
    moveMent = true;
  };


  //Left arrow key `release` method
  left.release = function() {
  //If the left arrow has been released, and the right arrow isn't down,
  //and the pixie isn't moving vertically, stop the sprite from moving
  //by setting its velocity to zero
    if (!right.isDown && !player.jumping) {
      player.sprite.gotoAndStop(0);
      if (!player.jumping) {
        player.sprite.vx = 0;
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
    if (!player.jumping && !disableMovement && !shiftKey.isDown) {
      player.sprite.scale.x = -1;
      player.sprite._texture = player.spriteArray[5]._texture;
      player.sprite._textures = player.spriteArray[5]._textures;
      this.doingIdle = false;
      player.sprite.play();
      player.sprite.vx = 5 * 60 / fps;
    }
    moveMent = true;
  };


  right.release = function() {
    if (!left.isDown && !player.jumping) {
      player.sprite.gotoAndStop(0);
      if (!player.jumping) {
        player.sprite.vx = 0;
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
    player.spacePush = true;
  };


  space.release = function() {
    player.spacePush = false;

  };

  shiftKey.press = function() {
    //attack();
    if (!player.jumping && !disableMovement && !disableAttacking) {
      disableMovement = true;
      player.sprite._texture = player.spriteArray[0]._texture;
      player.sprite._textures = player.spriteArray[0]._textures;
      player.sprite.gotoAndStop(0);
      player.sprite.animationSpeed = 0.2;
      this.doingIdle = false;
      player.sprite.play();
    }
  };

  shiftKey.release = function() {
    if (!isAttacking && !disableAttacking) {
      isAttacking = true;
      if (!(left.isDown || right.isDown)) {
        setTimeout(function() {
          player.doIdle();
          isAttacking = false;
          disableMovement = false;
        }, 750);
      } else {
        setTimeout(function() {
          player.sprite._texture = player.spriteArray[5]._texture;
          player.sprite._textures = player.spriteArray[5]._textures;
          disableMovement = false;
          isAttacking = false;
        }, 750);
      }
    }
  };

  switchE.press = function() {
    // location
    if (!player.inHouse && b.hit(player.sprite, houseDoors, false, false, false,
        function(collision, doorHit) {
          enterHouse();
        })) {
    }

    if (b.hit(player.sprite, door, false, false, false)) {
      buildOutside();
    }
    if (!player.jumping) {
      if (b.hitTestRectangle(player.sprite,
        new PIXI.Rectangle(hedgeLocX1+157, hedgeLocY1, 1, 300),
        false, false, false)) {
          if (player.spriteArray[11] && player.spriteArray[11]) {//TODO TEMPORARY CHECK
            player.sprite._texture = player.spriteArray[11]._texture;
            player.sprite._textures = player.spriteArray[11]._textures;
          }
          player.sprite.x = hedgeLocX2 + 157;
          player.holdX = hedgeLocX1 + 157;
          disableAttacking = true;
          g.state = moveIntoHedgeState;
        } else if (b.hitTestRectangle(player.sprite,
        new PIXI.Rectangle(hedgeLocX2+157, hedgeLocY2, 1, 300))) {
          if (player.spriteArray[11] && player.spriteArray[11]) {//TODO TEMPORARY CHECK
            player.sprite._texture = player.spriteArray[11]._texture;
            player.sprite._textures = player.spriteArray[11]._textures;
          }
          player.sprite.x = hedgeLocX2 + 157;
          player.holdX = hedgeLocX2 + 157;
          disableAttacking = true;
          g.state = moveIntoHedgeState;
      }
    }
  };

  switchE.release = function() {
    //TODO maybe use this for something
  };

  f1.press = function() {
    fpsEnabled = !fpsEnabled;
  };
}
