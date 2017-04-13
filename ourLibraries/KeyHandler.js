//----------------------------------------------------------Thomas Rosik-------------------------------------------------------------------
//variable to control if movement stops when landing during a jump
var moveMent = false;
var left, up, right, down, space, shiftKey, switchE, f1, esc, nVal, f;
var fpsEnabled = false;
var isAttacking = false;
var disableAttacking = false;
var keyCodes = [];

function Keys() {
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

  space.press = function() {
    player.spacePush = true;
  };

  space.release = function() {
    player.spacePush = false;

  };

  f.press = function() {
    if (!player.jumping && !disableMovement && !disableAttacking) {
      disableMovement = true;
      if (player.animal == 'raccoon') {
        setTimeout(function() {
          player.sprite.vxa = player.sprite.scale.x * -1;
        }, 250);
      }
      player.sprite._texture = player.spriteArray[0]._texture;
      player.sprite._textures = player.spriteArray[0]._textures;
      player.sprite.gotoAndStop(0);
      player.sprite.animationSpeed = 0.2;
      this.doingIdle = false;
      player.sprite.play();
      b.hit(player.sprite, garbages, false, false, false,
        function(collision, garbageHit) {
          if (!garbageHit.knockedOver) {
            if (b.hitTestRectangle(player.sprite, new PIXI.Rectangle(garbageHit.x - 60,
            garbageHit.y - 100, 35, 100))) {
              if (player.sprite.scale.x == -1) {
                garbageHit.scale.x = 1;
              } else {
                garbageHit.x -= 60;
                garbageHit.scale.x = -1;
              }
              garbageHit.y += 2;
              garbageHit.knockedOver = true;
              garbageHit.play();
              pointsToAdd += 5;
            }
          }
        });
    }
  };

  f.release = function() {
    if (!isAttacking && !disableAttacking) {
      isAttacking = true;
      if (!(left.isDown || right.isDown)) {
        setTimeout(function() {
          player.sprite.vxa = 0;
          player.doIdle();
          isAttacking = false;
          disableMovement = false;
        }, 550);
      } else {
        setTimeout(function() {
          player.sprite.vxa = 0;
          player.sprite._texture = player.spriteArray[5]._texture;
          player.sprite._textures = player.spriteArray[5]._textures;
          disableMovement = false;
          isAttacking = false;
        }, 550);
      }
    }
  };

  switchE.press = function() {
    // location
    if (!player.inHouse && b.hit(player.sprite, houseDoors, false, false, false,
        function(collision, doorHit) {
          if (!player.jumping && g.state != caughtState && g.state != gameOverState) {
            enterHouse();
          }
        })) {
    }

    if (b.hit(player.sprite, door, false, false, false) && !player.jumping) {
      buildOutside();
    }
    if (!player.jumping && !player.inHouse) {
      console.log("asdf");
      if (b.hitTestRectangle(player.sprite,
        new PIXI.Rectangle(hedgeLocX1+157, hedgeLocY, 1, 300),
        false, false, false)) {
        if (player.spriteArray[11] && player.spriteArray[11]) {//TODO TEMPORARY CHECK
          player.sprite._texture = player.spriteArray[11]._texture;
          player.sprite._textures = player.spriteArray[11]._textures;
        }
        player.sprite.x = hedgeLocX1 + 157;
        player.holdX = hedgeLocX1 + 157;
        disableAttacking = true;
        g.state = moveIntoHedgeState;
      } else if (b.hitTestRectangle(player.sprite,
        new PIXI.Rectangle(hedgeLocX2+157, hedgeLocY, 1, 300))) {
        if (player.spriteArray[11] && player.spriteArray[11]) {//TODO TEMPORARY CHECK
          player.sprite._texture = player.spriteArray[11]._texture;
          player.sprite._textures = player.spriteArray[11]._textures;
        }
        player.sprite.x = hedgeLocX2 + 157;
        player.holdX = hedgeLocX2 + 157;
        disableAttacking = true;
        g.state = moveIntoHedgeState;
      } else if (b.hitTestRectangle(player.sprite,
        new PIXI.Rectangle(hedgeLocX3+157, hedgeLocY, 1, 300))) {
        if (player.spriteArray[11] && player.spriteArray[11]) {//TODO TEMPORARY CHECK
          player.sprite._texture = player.spriteArray[11]._texture;
          player.sprite._textures = player.spriteArray[11]._textures;
        }
        player.sprite.x = hedgeLocX3 + 157;
        player.holdX = hedgeLocX3 + 157;
        disableAttacking = true;
        g.state = moveIntoHedgeState;
      }
    }
  };

  f1.press = function() {
    fpsEnabled = !fpsEnabled;
  };

  f2.press = function() {
    pointsToAdd += 5;
  }

  esc.release = function() {
    g.state = menuState;
  };

  nVal.press = function() {
    if (player.sprite.position.x >= 12340 || player.sprite.position.x <= -11940) {
      initGame(player.animal);
    }
  };
}
