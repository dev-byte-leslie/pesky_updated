function Player(stringAnimal) {
  // sets initial variables for player object
  // Arrays to hold all the sprites
  // 0,1 = Attack 1 and 2
  // 2,3 = Jump 1 and 2
  // 4,5 = Walk 1 and 2
  // 6,7 = Idle 1 and 2
  // 8,9 = Down 1 and 2
  // 10,11 = Up 1 and 2
  // 12,13 = Walter fly
  this.gooseSprites = [walterAttack, walterAttack2, walterJump, walterJump2, walterWalk,
    walterWalk2, walterIdle, walterIdle2, walterDown, walterDown2, walterUp, walterUp2,
    walterFly, walterFly2];
  this.raccoonSprites = [carlosRabies, carlosRabies2, carlosJump, carlosJump2,
    carlosWalk, carlosWalk2, carlosIdle, carlosIdle2, carlosDown, carlosDown2,
    carlosUp, carlosUp2];
  this.skunkSprites = [stankyAttack, stankyAttack2, stankyJump, stankyJump2,
    stankyWalk, stankyWalk2, stankyIdle, stankyIdle2, stankyDown, stankyDown2,
    stankyUp, stankyUp2];

  this.canFly = (stringAnimal == 'goose');
  this.isFlying = false;
  this.animal = stringAnimal;

  this.setCharacter = function(stringAnimal) {
    if (stringAnimal == 'raccoon') {
      if (this.sprite) this.sprite.scale.set(1, 1);
      this.spriteArray = this.raccoonSprites;
      this.canFly = false;
    } else if (stringAnimal == 'goose') {
      if (this.sprite) this.sprite.scale.set(0.7, 0.7);
      this.spriteArray = this.gooseSprites;
      this.canFly = true;
    } else {
      if (this.sprite) this.sprite.scale.set(1, 1);
      this.spriteArray = this.skunkSprites;
      this.canFly = false;
    }
    this.animal = stringAnimal;
  };

  this.setCharacter(stringAnimal);

  //assign to the walk sprite of the designated array
  this.sprite = this.spriteArray[4];
  this.sprite.vxa = 0; // attacking horizontal velocity
  this.chaos = false;
  this.nearDoor = false; //sets whether the player is near a door
  this.jumping = false; //whether the player is jumping
  this.spacePush = false; //whether the spacebar is being pressed or not
  this.inHouse = false;
  //movement flags for player movement.
  this.active = true;
  this.moveStates = ['Left', 'Right', 'Jump', 'StopL', 'StopR'];

  //the World Coordinate x-value of the player
  //starts at 0 when the player is instantiated
  this.xValue = 0;

  //variables to hold world coordinates when in house.
  this.holdX = 0;
  this.holdY = 0;

  this.inHouseX = 500;
  this.inHouseY = 600;

  //set the objects starting point
  //likely to change
  this.sprite.x = 500;
  this.sprite.y = 600;
  this.sprite.anchor.set(0.5, 1); //sets anchor of player sprite for animation flipping
  this.camera = new camera(); //instantiates the camera for the main character
  this.sprite.vx = 0; //set the objects starting velocities
  this.sprite.vy = 0;
  this.sprite.animationSpeed = 0.1;
  this.doingIdle = false;

  //updates player location and camera location
  this.update = function() {
    //add x velocity to player's x location
    this.camera.updateCamera();
    if (this.sprite.vx < 0 && fps != 0) {
      this.sprite.vx = -5 * 60 / fps;
    } else if (this.sprite.vx > 0 && fps != 0) {
      this.sprite.vx = 5 * 60 / fps;
    }
    // check collision with the floor
    // anonymous function is called when the player touches the floor
    // b.hit returns true/false as well so we can set gravity if it's false
    if (!b.hit(
      player.sprite,
      floors,
      true, false, false,
      function(collision, floorHit) {
        player.sprite.vy = 0;
        player.sprite.y = floorHit.y;
        player.jumping = false;
        player.isFlying = false;
        player.sprite.gotoAndStop(0);
        player.sprite._texture = player.spriteArray[5]._texture;
        player.sprite._textures = player.spriteArray[5]._textures;
        this.doingIdle = false;
        player.sprite.gotoAndStop(0);
        floorHit.y = 600;
        disableAttacking = false;
      })) {
      if (fps >= 20) {  // lower than around 20, the player falls too quickly and through the floor
        if (player.jumping && (player.sprite.vy != 0 || player.canFly)) {
          player.sprite.vy += 0.05 * 144 / fps; // add gravity
        }
      } else {
        player.sprite.vy += 0.2;
      }
    }
    if (!disableMovement) {
      this.sprite.y += this.sprite.vy; //add y velocity to player's y location
      this.sprite.x += this.sprite.vx; //add x velocity to player's x location
      this.xValue += this.sprite.vx;
      if (left.isDown) {
        if (player.sprite._texture != player.spriteArray[5]._texture &&
          player.sprite._textures != player.spriteArray[5]._textures && !player.jumping) {
          player.sprite._texture = player.spriteArray[5]._texture;
          player.sprite._textures = player.spriteArray[5]._textures;
        }
        if (fps >= 30) {
          player.sprite.vx = -5 * 60 / fps;
        } else {
          player.sprite.vx = -5;
        }
        player.sprite.scale.x = player.animal == 'goose' ? 0.7 : 1;
        player.sprite.animationSpeed = 0.1;
        player.sprite.play();
      } else if (right.isDown) {
        if (player.sprite._texture != player.spriteArray[5]._texture &&
          player.sprite._textures != player.spriteArray[5]._textures && !player.jumping) {
          player.sprite._texture = player.spriteArray[5]._texture;
          player.sprite._textures = player.spriteArray[5]._textures;
        }
        if (fps >= 30) {
          player.sprite.vx = 5 * 60 / fps;
        } else {
          player.sprite.vx = 5;
        }
        player.sprite.play();
        player.sprite.scale.x = player.animal == 'goose' ? -0.7 : -1;
        player.sprite.animationSpeed = 0.1;
      } else {
        player.sprite.vx = 0;
      }
    } else { // disableMovement = true, i.e. player is attacking
      player.sprite.x += player.sprite.vxa * 144 / fps;
      // Test hit for garbages every frame to knock them down appropriately
      b.hit(player.sprite, garbages, false, false, false,
        function(collision, garbageHit) {
        if (!garbageHit.knockedOver) {
          if (b.hitTestRectangle(player.sprite, new PIXI.Rectangle(garbageHit.x - 60,
          garbageHit.y - 100, 35, 100))) {
            if (player.animal != 'skunk') {
              if (Math.sign(player.sprite.scale.x) == -1) {
                garbageHit.scale.x = 1;
              } else {
                garbageHit.x -= 60;
                garbageHit.scale.x = -1;
              }
              garbageHit.y += 2;
              garbageHit.knockedOver = true;
              garbageHit.play();
              chaosToAdd += 5;
              pointsToAdd += 5;
            }
            garbageHit.y += 2;
            garbageHit.knockedOver = true;
            garbageHit.play();
            pointsToAdd = 5;
          }
        }
      });
    }
    // Check list of conditions to make sure player is actually idle
    if (!space.isDown && !player.jumping && player.sprite.vx == 0
       && !disableMovement && !left.isDown && !right.isDown) {
      this.doIdle();
    }
    this.camera.updateCamera();

    //controls the player being able to leave the bounds of the world
    if (player.sprite.position.x > 12340) {
      player.sprite.position.x = 12340;
    }
    if (player.sprite.position.x < -11940) {
      player.sprite.position.x = -11940;
    }
    if (player.inHouse && player.sprite.position.x >= 679) {
      player.sprite.position.x = 679;
    }
    if (player.inHouse && player.sprite.position.x <= 329) {
      player.sprite.position.x = 329;
    }
  };
  // Function called to make the player idle
  this.doIdle = function () {
    if (player.sprite._texture != player.spriteArray[7]._texture &&
    player.sprite._textures != player.spriteArray[7]._textures) {
      this.doingIdle = true;
      player.sprite._texture = player.spriteArray[7]._texture;
      player.sprite._textures = player.spriteArray[7]._textures;
      if (player.animal == 'goose') {
        this.sprite.animationSpeed = .2;
      } else {
        this.sprite.animationSpeed = 0.05;
      }
      player.sprite.play();
    }
  };
}
