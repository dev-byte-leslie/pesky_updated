//----------------------------------------------------------Thomas Rosik-------------------------------------------------------------------
//variable to control if movement stops when landing during a jump
var moveMent = false,
  left, up, right, down, space, shiftKey, switchE, f1, esc, nVal, f,
  fpsEnabled = false,
  isAttacking = false,
  disableAttacking = false,
  keyCodes = [],
  attackInterval,
  fPressed = false;

function Keys() {
  space.press = function() {
    player.spacePush = true;
  };

  space.release = function() {
    player.spacePush = false;
  };

  f.press = function() {
    if (!fPressed) {
      if (!player.jumping && !disableMovement && !disableAttacking && !ePressed) {
        disableMovement = isAttacking = fPressed = true;
        if (player.animal == 'raccoon') {
          setTimeout(function() {
            player.sprite.vxa = player.sprite.scale.x * -1;
          }, 250);
        }
        let delay = 650;
        if (player.animal == 'skunk') {
          delay = 750;
        }
        setTimeout(function() {
          if (disableMovement && isAttacking && !ePressed) {
            player.sprite.vxa = 0;
            player.doIdle();
            disableMovement = isAttacking = fPressed = false;
          }
        }, delay);
        if (!player.testTextures(0)) {
            player.setTextures(0);
        }
        player.sprite.gotoAndStop(0);
        player.sprite.play();
        player.sprite.animationSpeed = 0.2;
        player.doingIdle = false;
      }
    }
  };

  switchE.press = function() {
    if (!ePressed && !fPressed) {
      if (!player.inHouse && b.hit(player.sprite, houseDoors, false, false, false,
        function(collision, doorHit) {
          if (!player.jumping && g.state != caughtState && g.state != gameOverState) {
            ePressed = true;
            let index = houseDoors.indexOf(doorHit);
            enterHouse(index % interiors.length, index);
          }
        })){}


      if (player.inHouse && b.hit(player.sprite, door, false, false, false,
        function(collision, doorHit) {
          ePressed = true;
          buildOutside();
        })) {
      }


      for (let i = 1; i <= 3; i++) {
        if (!player.jumping && !player.inHouse) {
          if (b.hitTestRectangle(player.sprite,
            new PIXI.Rectangle(eval('hedgeLocX'+i)+157, hedgeLocY, 1, 300),
            false, false, false)) {
            ePressed = true;
            player.setTextures(11);
            player.sprite.play();
            player.sprite.x = eval('hedgeLocX'+i) + 157;
            player.holdX = eval('hedgeLocX'+i) + 157;
            disableAttacking = true;
            g.state = moveIntoHedgeState;
          }
        }
      }
    }
  };

  f1.press = function() {
    //fpsEnabled = !fpsEnabled;
    //chaosToAdd += 5;
    pointsToAdd += 50;
    chaosToAdd += 50;
  };

  nVal.press = function() {
    if (player.sprite.position.x >= 12330 || player.sprite.position.x <= -11940) {
      newLevelVal = true;
      gameObjects.removeChild(map);
      gameObjects.removeChild(chaosBar);
      chaos = 0;
      pointsToAdd += 10;
      updatePoints();
      people1 = [];
      people2 = [];
      people3 = [];
      garbages = [];
      interiors = [];
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
        if (Math.random() < 0.5) {
          eval('garbage' + i + '= new spriteCreator(\'../images/WorldObjects/garbage.png\', 80, 42);');
        } else {
          eval('garbage' + i + '= new spriteCreator(\'../images/WorldObjects/garbage2.png\', 80, 50);');
        }
        eval('garbages.push(garbage' + i + ');');
      }

      for (let i = 1; i <= 4; i++) {
        interiors.push(eval('new Sprite(TextureCache[\'../images/HouseObjects/Interior_' + i +'.png\']);'));
      }

      for (let i = 0; i < 61; i++) {
        eval('fridge'+i+'= new spriteCreator(\'../images/HouseObjects/fridge.png\', 100, 100);');
        fridges.push(eval('fridge'+i));
        eval('coffeeMaker'+i+'= new spriteCreator(\'../images/HouseObjects/Coffee_maker.png\', 28, 28);');
        coffeeMakers.push(eval('coffeeMaker'+i));
        eval('chair'+i+'= new spriteCreator(\'../images/HouseObjects/chair.png\', 80, 100);');
        chairs.push(eval('chair'+i));
        eval('lamp1_'+i+'= new spriteCreator(\'../images/HouseObjects/lamp_1.png\', 50, 50);');
        lamps1.push(eval('lamp1_'+i));
        eval('lamp2_'+i+'= new spriteCreator(\'../images/HouseObjects/lamp_2.png\', 50, 50);');
        lamps2.push(eval('lamp2_'+i));

        eval('fridge'+i).loop = false;
        eval('fridge'+i).anchor.set(0.5, 1);
        eval('fridge'+i).hasBeenRuined = false;

        eval('coffeeMaker'+i).loop = false;
        eval('coffeeMaker'+i).anchor.set(0.5, 1);
        eval('coffeeMaker'+i).hasBeenRuined = false;

        eval('chair'+i).loop = false;
        eval('chair'+i).anchor.set(0.5, 1);
        eval('chair'+i).hasBeenRuined = false;

        eval('lamp1_'+i).loop = false;
        eval('lamp1_'+i).anchor.set(0.5, 1);
        eval('lamp1_'+i).hasBeenRuined = false;

        eval('lamp2_'+i).loop = false;
        eval('lamp2_'+i).anchor.set(0.5, 1);
        eval('lamp2_'+i).hasBeenRuined = false;
      }
      initGame(player.animal);
      player.sprite.y = hedgeLocY + 150;
      player.sprite.x = hedgeLocX2 + 157;
      player.setTextures(8);
      player.sprite.play();
      player.sprite.x = hedgeLocX2 + 157;
      player.holdX = hedgeLocX2 + 157;
      disableAttacking = true;
      let c = new camera();
      c.updateCamera();
      g.state = moveFromHedgeState;
      newLevelVal = false;
    }
  };
}
