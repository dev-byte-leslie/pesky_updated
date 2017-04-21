// All game loop functions/states go here to help declutter Main.js
function menuState() {
  g.stage.scale.set(1, 1);
  g.stage.pivot.set(0, 0);
  g.stage.position.set(0, 0);
  hideAll();
  backgroundGroup.visible = true;
  title.position.x = 20;
  updateFps();
  mainMenuGroup.visible = true;
  if (menuMusic) {
    if (!menuMusic.playing) {
      gameMusic.pause();
      menuMusic.play();
    }
  }
}
function optionsState() {
  updateFps();
}
function creditsState() {
  updateFps();
  creditsShadow1.y -= 4 * 60 / fps;
  creditsShadow2.y -= 4 * 60 / fps;
  creditsShadow3.y -= 4 * 60 / fps;
  credits1.y -= 4 * 60 / fps;
  credits2.y -= 4 * 60 / fps;
  credits3.y -= 4 * 60 / fps;
}
function tutorialState() {
  updateFps();
}
function switchCharacterState() {
  updateFps();
}
function moveIntoHedgeState() { // freeze the game and move player into hedge
  updateThings();
  if (player.sprite.y > hedgeLocY + 150) {
    player.sprite.y += -1 * 60 / fps;
  } else {
    initCharacterSwitch();
    hideAll();
    switchCharacterGroup.visible = true;
    g.state = switchCharacterState;
  }
}
function moveFromHedgeState() {
  if (gameMusic) {
    if (!gameMusic.playing) {
      menuMusic.pause();
      gameMusic.play();
    }
  }
  updateThings();
  if (player.sprite.y < 600) {
    player.sprite.y += 60 / fps;
    if (!player.testTextures(8)) {
      player.setTextures(8);
      player.sprite.gotoAndStop(0);
      player.sprite.play();
    }
  } else {
    ePressed = false;
    disableMovement = false;
    disableAttacking = false;
    player.setTextures(4);
    g.state = play;
  }
}
function caughtState() {
  updateThings();
  blackOverlay.x = g.stage.pivot.x - 200;
  blackOverlay.y = 0;
  if (animalControlCaught.aCObject.x >= player.holdX + 250) {
    animalControlCaught.aCObject._texture = animalControlSprite._texture;
    animalControlCaught.aCObject._textures = animalControlSprite._textures;
    if (skunkAlive || raccoonAlive || gooseAlive) {
      initCharacterSwitch();
      hideAll();
      switchCharacterGroup.visible = true;
      g.state = switchCharacterState;
    } else { // all animals are captured
      blackOverlay.x = g.stage.pivot.x - 200;
      blackOverlay.y = 0;
      if (blackOverlay.alpha + 0.01 * 60 / fps < 1) {
        blackOverlay.alpha += 0.01 * 60 / fps;
      } else {
        blackOverlay.alpha = 1;
        gameOverText.x = g.stage.pivot.x - 100;
        gameOverText.y = 470;
        g.stage.add(gameOverText);
        g.state = gameOverState;
      }
    }
  } else {
    animalControlCaught.aCObject.x += 60 / fps;
    numOfEnemyAi.forEach(function(animalCont) {
      animalCont.aCObject.scale.x = -1;
      animalCont.aCObject.play();
      if (animalCont !== animalControlCaught) {
        animalCont.aCObject.x -= 90 / fps;
      }
    });
  }
}
function gameOverState() {
  updateFps();
  if (gameOverText.alpha + 0.005 * 60 / fps < 1) {
    gameOverText.alpha += 0.005 * 60 / fps;
  } else {
    gameOverText.alpha = 1;
    reloadTimer += 1 / fps;
    if (reloadTimer >= 5) {
      window.location.reload();
    }
  }
}
function fadeIntoWorld() {
  updateThings();
  player.camera.updateCamera();
  blackOverlay.x = g.stage.pivot.x - 200;
  blackOverlay.y = 0;
  if (blackOverlay.alpha - 0.01 * 60 / fps > 0) {
    blackOverlay.alpha -= 0.01 * 60 / fps;
  } else {
    ePressed = false;
    disableMovement = false;
    disableAttacking = false;
    blackOverlay.alpha = 0;
    disableMovement = false;
    g.state = play;
  }
}
function fadeIntoHouse() {
  updateThings();
  player.camera.updateCamera();
  blackOverlay.x = g.stage.pivot.x - 200;
  blackOverlay.y = 0;
  if (blackOverlay.alpha - 0.01 * 60 / fps > 0) {
    blackOverlay.alpha -= 0.01 * 60 / fps;
  } else {
    ePressed = false;
    blackOverlay.alpha = 0;
    player.doIdle();
    disableMovement = false;
    g.state = play;
    player.inHouse = true;
  }
}
function fadeOutOfWorld() {
  updateThings();
  if (player.sprite.y > 580) {
    player.sprite.y += -0.2 * 60 / fps;
  }
  player.camera.updateCamera();
  blackOverlay.x = g.stage.pivot.x - 200;
  blackOverlay.y = 0;
  if (blackOverlay.alpha + 0.01 * 60 / fps < 1) {
    blackOverlay.alpha += 0.01 * 60 / fps;
  } else {
    blackOverlay.alpha = 1;
    player.doIdle();
    g.state = fadeIntoHouse;
  }
}
function fadeOutOfHouse() {
  updateThings();
  if (player.sprite.y > 580) {
    player.sprite.y += -0.2 * 60 / fps;
  }
  player.camera.updateCamera();
  blackOverlay.x = g.stage.pivot.x - 200;
  blackOverlay.y = 0;
  if (blackOverlay.alpha + 0.01 * 60 / fps < 1) {
    blackOverlay.alpha += 0.01 * 60 / fps;
  } else {
    blackOverlay.alpha = 1;
    player.doIdle();
    g.state = fadeIntoWorld;
  }
}
function play() {
  if (gameMusic) {
    if (!gameMusic.playing) {
      menuMusic.pause();
      gameMusic.play();
    }
  }
  //call functions for player and ai logic
  blackOverlay.x = player.sprite.x - 200;
  blackOverlay.y = 0;
  player.update();
  jump();
  if (!player.inHouse) { // prevent being captured by invisible animal control
    numOfEnemyAi.forEach(function(animalControl) {
      animalControl.aiMovement();
    });
  }
  updateThings();
}
