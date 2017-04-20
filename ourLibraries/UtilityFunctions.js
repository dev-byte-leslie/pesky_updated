//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump if space is pressed and player isn't moving vertically
  if (player.spacePush && !player.jumping && !disableMovement) {
    player.jumping = true;
    if (player.animal !== 'skunk') {
      player.sprite.vy = -2.51;
    } else {
      setTimeout(function() {
        player.jumping = false;
        player.sprite.gotoAndStop(0);
        player.setTextures(5);
        player.doingIdle = false;
        player.sprite.gotoAndStop(0);
      }, 1000);
    }
    player.setTextures(2);
    jumpSound.play();
    player.sprite.gotoAndStop(0);
    player.sprite.animationSpeed = 0.1;
    player.sprite.play();
  }
  let timeoutID;
  if (!player.isFlying && player.jumping && player.canFly) {
    timeoutID = setTimeout(function() {
      if (player.jumping && player.spacePush) {
        player.isFlying = true;
        player.setTextures(12);
        player.sprite.vy = player.sprite.y > 500 ? -2.51 : 0;
        disableAttacking = true;
      }
    }, 500);
  } else if (player.isFlying) {
    if (player.spacePush && player.sprite.y > 500) {
      player.sprite.vy = -2.51;
    } else if (player.spacePush) {
      player.sprite.vy = 0;
    }
  }
  if (!player.spacePush) {
    clearTimeout(timeoutID);
  }
}

//build the inside of a house
function enterHouse() {
  disableMovement = true;
  numOfEnemyAi.forEach(function(animalCont1) {
    animalCont1.aCObject.gotoAndStop(0);
  });
  player.doIdle();
  setTimeout(function() {
    // Teleport AC away from player so they don't get killed right outside the door
    numOfEnemyAi.forEach(function(animalCont1) {
      if (animalCont1.aCObject.x >= player.sprite.x - 400) {
        animalCont1.aCObject.x -= 600;
      } else if (animalCont1.aCObject.x < player.sprite.x + 400) {
        animalCont1.aCObject.x += 600;
      }
    });
    gameObjects.removeChild(map);
    g.stage.removeChild(gameObjects);
    gameObjects.addChild(house);
    g.stage.addChild(gameObjects);

    //keep track of world coordinates
    player.holdX = player.sprite.x;

    player.sprite.x = player.inHouseX;
    player.sprite.y = player.inHouseY;

    door.x = player.sprite.x + 70;
    door.y = player.sprite.y - 60;
    interior1.x = player.sprite.x - 200;
    interior1.y = player.sprite.y - 200;
    house.addChild(interior1);
    house.addChild(door);
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
  // Teleport AC away from player so they don't get killed right outside the door
  numOfEnemyAi.forEach(function(animalCont1) {
    if (animalCont1.aCObject.x >= player.sprite.x - 400) {
      animalCont1.aCObject.x -= 600;
    } else if (animalCont1.aCObject.x < player.sprite.x + 400) {
      animalCont1.aCObject.x += 600;
    }
  });

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
  player.setTextures(10);
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
function updateChaos() {
  chaosBar.inner.x =  g.stage.pivot.x - 157;
  // doesn't let chaos bar get longer than it's supposed to be
  chaos += chaosToAdd;
  chaosToAdd = 0;
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
  let shakeAmt = 0.000025 * chaos / 25;
  animalAnimated.shake(chaosBar, shakeAmt, true);
  animalAnimated.update();
}

function updatePoints() {
  points += pointsToAdd * numOfEnemyAi.length;
  pointsToAdd = 0;
}
