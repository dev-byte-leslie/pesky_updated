//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump if space is pressed and player isn't moving vertically
  let jumpVelocity = player.inHouse ? -2.01 : -2.51;
  if (player.spacePush && !player.jumping && !disableMovement) {
    player.jumping = true;
    if (player.animal !== 'skunk') {
      player.sprite.vy = jumpVelocity;
    } else {
      setTimeout(function() {
        player.sprite.vy = jumpVelocity / 1.5;
      }, 400);
    }
    player.setTextures(2);
    jumpSound.play();
    player.sprite.gotoAndStop(0);
    player.sprite.animationSpeed = 0.1;
    player.sprite.play();
  }
  let timeoutID;
  let flyHeight = player.inHouse ? 570 : 500;
  if (!player.isFlying && player.jumping && player.canFly) {
    timeoutID = setTimeout(function() {
      if (player.jumping && player.spacePush) {
        player.isFlying = true;
        player.setTextures(12);
        player.sprite.vy = player.sprite.y > flyHeight ? jumpVelocity : 0;
        disableAttacking = true;
      }
    }, 500);
  } else if (player.isFlying) {
    if (player.spacePush && player.sprite.y > flyHeight) {
      player.sprite.vy = jumpVelocity;
    } else if (player.spacePush) {
      player.sprite.vy = 0;
    }
  }
  if (!player.spacePush) {
    clearTimeout(timeoutID);
  }
}

//build the inside of a house
function enterHouse(interiorNum, realIndex) {
  disableMovement = true;
  numOfEnemyAi.forEach(function(animalCont1) {
    animalCont1.aCObject.gotoAndStop(0);
  });
  player.holdX = player.sprite.x;
  player.doIdle();
  setTimeout(function() {
    let fridge = fridges[realIndex],
      chair = chairs[realIndex],
      lamp1 = lamps1[realIndex],
      lamp2 = lamps2[realIndex],
      coffeeMaker = coffeeMakers[realIndex];

    gameObjects.removeChild(map);
    g.stage.removeChild(gameObjects);
    gameObjects.addChild(house);
    g.stage.addChild(gameObjects);


    //keep track of world coordinates
    player.sprite.x = player.inHouseX;
    player.sprite.y = player.inHouseY;

    door.scale.x = 0.35;
    door.y = player.sprite.y - 10;
    fridge.y = 595;
    coffeeMaker.y = 558;
    switch (interiorNum) { // place items individually based on the house background
      case 0:
        door.x = 500;
        fridge.x = 645;
        chair.x = 332;
        chair.y = 615;
        lamp2.x = 506;
        lamp2.y = 570;
        coffeeMaker.x = 625;
        break;
      case 1:
        door.x = 500;
        fridge.x = 583;
        fridge.scale.x = -1;
        chair.x = 340;
        chair.y = 615;
        lamp1.x = 454;
        lamp1.y = 572;
        coffeeMaker.x = 600;
        break;
      case 2:
        door.x = 500;
        fridge.x = 600;
        chair.x = 343;
        chair.y = 615;
        lamp1.x = 379;
        lamp1.y = 572;
        coffeeMaker.x = 660;
        break;
      case 3:
        door.x = 500;
        fridge.x = 363;
        chair.x = 505;
        chair.y = 615;
        lamp1.x = 546;
        lamp1.y = 574;
        coffeeMaker.x = 350;
        break;
    }
    interiors[interiorNum].x = player.sprite.x - 200;
    interiors[interiorNum].y = player.sprite.y - 215;
    house.addChild(interiors[interiorNum]);
    house.addChild(chair);
    house.addChild(lamp1);
    house.addChild(lamp2);
    house.addChild(coffeeMaker);
    house.addChild(fridge);
    //house.addChild(door);
    house.addChild(player.sprite);
    house.addChild(chaosBar);
    house.addChild(blackOverlay);
  }, 1667);
  player.setTextures(10);
  g.state = fadeOutOfWorld;
}

//builds the outside game map
function buildOutside() {
  disableMovement = true;
  player.doIdle();

  setTimeout(function() {
    gameObjects.removeChild(house);
    g.stage.removeChild(blackOverlay);
    g.stage.removeChild(gameObjects);

    player.sprite.x = player.holdX;
    player.sprite.y = 600;

    player.inHouse = false;

    map.addChild(player.sprite);
    numOfEnemyAi.forEach(function(animalCont1) {
      map.addChild(animalCont1.aCObject);
      animalCont1.aCObject.vx = 0;
      animalCont1.aCObject.vy = 0;
    });
    map.addChild(chaosBar);
    gameObjects.addChild(map);
    g.stage.addChild(gameObjects);
    g.stage.addChild(blackOverlay);
  }, 1667);
  player.setTextures(8);
  g.state = fadeOutOfHouse;
}

function camera() {
  g.stage.position.set(renderer.width / 2, renderer.height);
  g.stage.scale.set(4, 4);

  this.updateCamera = function() {
    //now specify which point INSIDE stage must be (0,0)
    if (player.sprite.position.x > 12200 || player.sprite.position.x < -11800) {
      if (player.sprite.position.x > 12000) {
        g.stage.pivot.x = 12200;
      } else {
        g.stage.pivot.x = -11800;
      }
    } else {
      if (player.inHouse) {
        if (player.sprite.position.x >= 539) {
          g.stage.pivot.x = player.sprite.position.x - (player.sprite.position.x - 539);
        } else if (player.sprite.position.x <= 470) {
          g.stage.pivot.x = player.sprite.position.x + (470 - player.sprite.position.x);
        } else {
          g.stage.pivot.x = player.sprite.position.x;
        }
      } else {
        g.stage.pivot.x = player.sprite.position.x;
      }
    }
    g.stage.pivot.y = 607;
  };
}
let shakeTimer = 0;
function updateChaos() {
  chaosBar.inner.x =  g.stage.pivot.x - 157;
  // doesn't let chaos bar get longer than it's supposed to be
  chaos += chaosToAdd;
  if (chaos > 100) {
    chaos = 100;
  } else if (chaos < 0) {
    chaos = 0;
  }
  chaosBar.outer.width = topBar.width = bottomBar.width = chaos;
  triangleLeft.width = triangleRight.width = chaos / 10;
  chaosBar.outer.x = g.stage.pivot.x - 157;
  chaosText.position.set(chaosBar.inner.x + chaosBar.inner.width / 2, chaosBar.outer.y + 11);
  triangleLeft.x = topBar.position.x = bottomBar.position.x = chaosBar.outer.x;
  triangleRight.x = topBar.position.x + topBar.width;
  let shakeAmt = chaos / 50;//0.0005 * chaos / 25;
  if (shakeTimer >= fps) {
    animalAnimated.shake(chaosBar, shakeAmt, false);
    shakeTimer = 0;
  } else {
    shakeTimer++;
  }

  animalAnimated.update();
  chaosToAdd = 0;
}

function updatePoints() {
  points += pointsToAdd * numOfEnemyAi.length;
  pointsToAdd = 0;
  pointsText.text = 'Score: ' + points;
  pointsText.anchor.set(0.5, 0.5);
}
