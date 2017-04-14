//----------------------------------------------------------Thomas Rosik-------------------------------------------------------------------
//variable to control if movement stops when landing during a jump
var moveMent = false;
var left, up, right, down, space, shiftKey, switchE, f1, esc, nVal, f;
var fpsEnabled = false;
var isAttacking = false;
var disableAttacking = false;
var keyCodes = [];
var attackInterval;

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
      if (!disableMovement) player.sprite.gotoAndStop(0);
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
      if (!disableMovement) player.sprite.gotoAndStop(0);
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
  };

  nVal.press = function() {
    if (player.sprite.position.x >= 12340 || player.sprite.position.x <= -11940) {
      gameObjects.removeChild(chaosBar);
      points = 0;
      people1 = [];
      people2 = [];
      people3 = [];
      garbages = [];
      // People sprites
      numPeople = 8; // Total number of people PER SPRITE TYPE
      peopleTypes = 3; // Number of sprite types for people
      // eval() takes a string and turns it into code which makes it
      // much easier to generate and assign repetitive variables
      for (let i = 1; i <= peopleTypes; i++) {
        for (let j = 1; j <= numPeople; j++) { // it is assumed all 3 people arrays have equal length
          eval('person'+i+'_'+j+' = new spriteCreator('+'\'../images/AiSprites/person_'+i+'.png\', 50, 75);');
          eval('people'+i).push(eval('person'+i+'_'+j));
        }
        eval('person'+i+'_sick = new spriteCreator(\'../images/AiSprites/person_'+i+'_sick.png\', 50, 75);');
      }

      // Objects like garbage
      for (let i = 1; i <= 50; i++) { // 50 garbages in the world
        eval('garbage' + i + '= new spriteCreator(\'../images/WorldObjects/garbage.png\', 80, 42);');
        eval('garbages.push(garbage' + i + ');');
      }
      initGame(player.animal);
    }
  };
}
