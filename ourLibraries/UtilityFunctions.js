//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump if space is pressed and player isn't moving vertically
  if (player.spacePush && !player.jumping && !disableMovement) {
    player.jumping = true;
    player.sprite.vy = -2.51;
    player.sprite._texture = player.spriteArray[2]._texture;
    player.sprite._textures = player.spriteArray[2]._textures;
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
        player.sprite._texture = player.spriteArray[12]._texture;
        player.sprite._textures = player.spriteArray[12]._textures;
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
  player.doIdle();
  setTimeout(function() {
    gameObjects.removeChild(map);
    g.stage.removeChild(gameObjects);
    gameObjects.addChild(house);
    g.stage.addChild(gameObjects);

    //keep track of world coordinates
    player.holdX = player.sprite.x;
    player.holdY = player.sprite.y;

    player.sprite.x = player.inHouseX;
    player.sprite.y = player.inHouseY;

    door.x = player.sprite.x + 70;
    door.y = player.sprite.y - 60;
    interior1.x = player.sprite.x - 200;
    interior1.y = player.sprite.y - 200;
    house.addChild(interior1);
    house.addChild(door);
    house.addChild(player.sprite);
    house.addChild(blackOverlay);
    house.addChild(chaosBar);
  }, 1667);

  if (player.spriteArray[10]) {
    player.sprite._texture = player.spriteArray[10]._texture;
    player.sprite._textures = player.spriteArray[10]._textures;
  } else {
    player.sprite._texture = player.spriteArray[4]._texture;
    player.sprite._textures = player.spriteArray[4]._textures;
  }
  g.state = fadeOutOfWorld;
}

//builds the outside game map
function buildOutside() {
  player.inHouse = false;
  disableMovement = true;
  player.doIdle();
  // Teleport AC away from player so they don't get killed right outside the door
  if (animalCont1.aCObject.x >= player.sprite.x - 400) {
    animalCont1.aCObject.x -= 600;
  } else if (animalCont1.aCObject.x < player.sprite.x + 400) {
    animalCont1.aCObject.x += 600;
  }
  setTimeout(function() {
    gameObjects.removeChild(house);
    g.stage.removeChild(blackOverlay);
    g.stage.removeChild(gameObjects);

    player.sprite.x = player.holdX;
    player.sprite.y = 600;

    map.addChild(player.sprite);
    map.addChild(animalCont1.aCObject);
    map.addChild(chaosBar);
    animalCont1.aCObject.vx = 0;
    animalCont1.aCObject.vy = 0;

    gameObjects.addChild(map);
    g.stage.addChild(gameObjects);
    g.stage.addChild(blackOverlay);
  }, 1667);
  if (player.spriteArray[10]) {
    player.sprite._texture = player.spriteArray[10]._texture;
    player.sprite._textures = player.spriteArray[10]._textures;
  } else {
    player.sprite._texture = player.spriteArray[4]._texture;
    player.sprite._textures = player.spriteArray[4]._textures;
  }
  g.state = fadeOutOfHouse;
}

function camera() {
  g.stage.position.x = renderer.width / 2;
  g.stage.position.y = renderer.height;
  //scale it
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;

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

    //g.stage.pivot.y = player.sprite.position.y + 7; // view should include a bit of ground under player
    g.stage.pivot.y = 607; //This can change but doesnt allow the player to see outside of map
  };
}

function updatePoints() {
  //updates position of chaos bar
  if (player) {
    //white bar
    chaosBar.inner.x =  g.stage.pivot.x -157;

    //red bar
    if(points < 97)
    {
      //doesnt let points bar get longer than its supposed to be
      if(points<97 && points>92 && pointsToAdd>5)
      {
        chaosBar.outer.width += 5;
        topBar.width += 5;
        bottomBar.width += 5;
        points += 5;
        pointsToAdd = 0;
      }
      if (points + pointsToAdd > 0) {
        points += pointsToAdd;
        chaosBar.outer.width += pointsToAdd;
        topBar.width += pointsToAdd;
        bottomBar.width += pointsToAdd;
        triangleLeft.width += pointsToAdd / 10;
        triangleRight.width += pointsToAdd / 10;
      } else {
        points = 0;
        chaosBar.outer.width = 0;
        topBar.width = 0;
        bottomBar.width = 0;
        triangleLeft.width = 0;
        triangleRight.width = 0;
      }

      pointsToAdd = 0;
    }
    chaosBar.outer.x =  g.stage.pivot.x - 157;
    chaosText.position.set(chaosBar.inner.x+chaosBar.inner.width/2, chaosBar.outer.y+11);
    triangleLeft.x = topBar.position.x = bottomBar.position.x = chaosBar.outer.x;
    triangleRight.x = topBar.position.x + topBar.width;
    if (animalAnimated.shakingSprites.length == 0) {
      animalAnimated.shake(chaosBar, .0025 * .01 * points * fps / 144, true);
    }
    animalAnimated.update();
  }
}
