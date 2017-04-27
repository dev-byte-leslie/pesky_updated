function Player(stringAnimal) {
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
  this.speed = 4;

  this.setCharacter = function(stringAnimal) {
    if (stringAnimal == 'raccoon') {
      if (this.sprite) this.sprite.scale.set(1, 1);
      this.spriteArray = this.raccoonSprites;
      this.canFly = false;
    } else if (stringAnimal == 'goose') {
      if (this.sprite) this.sprite.scale.set(0.8, 0.8);
      this.spriteArray = this.gooseSprites;
      this.canFly = true;
    } else {
      if (this.sprite) this.sprite.scale.set(1, 1);
      this.spriteArray = this.skunkSprites;
      this.canFly = false;
    }
    this.animal = stringAnimal;
  };

  this.setTextures = function(texture) {
    this.sprite._texture = this.spriteArray[texture]._texture;
    this.sprite._textures = this.spriteArray[texture]._textures;
  };

  this.testTextures = function(texture) {
    return (this.sprite._texture == this.spriteArray[texture]._texture ||
      this.sprite._textures == this.spriteArray[texture]._textures);
  };

  this.setCharacter(stringAnimal);

  //assign to the walk sprite of the designated array
  this.sprite = this.spriteArray[4];
  this.sprite.vxa = 0; // attacking horizontal velocity
  this.chaos = false;
  this.jumping = false; //whether the this is jumping
  this.spacePush = false; //whether the spacebar is being pressed or not
  this.inHouse = false;

  //the World Coordinate x-value of the this
  //starts at 0 when the this is instantiated
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
  this.sprite.anchor.set(0.5, 1); //sets anchor of this sprite for animation flipping
  this.camera = new camera(); //instantiates the camera for the main character
  this.sprite.vx = 0; //set the objects starting velocities
  this.sprite.vy = 0;
  this.sprite.animationSpeed = 0.1;
  this.doingIdle = false;
  this.sprite.circular = true;

  //updates this location and camera location
  this.update = function() {
    this.camera.updateCamera();
    this.sprite.vx = Math.sign(this.sprite.vx) * this.speed * 60 / fps;
    if (!disableMovement) {
      this.sprite.x += this.sprite.vx; //add x velocity to this's x location
      this.sprite.y += this.sprite.vy; //add y velocity to this's y location
    }
    this.xValue += this.sprite.vx;
    // check collision with the floor
    // anonymous function is called when the this touches the floor
    // b.hit returns true/false as well so we can set gravity if it's false
    let playerObj = this;
    if (!b.hit(
      this.sprite,
      floors,
      true, false, false,
      function(collision, floorHit) {
        playerObj.sprite.vy = 0;
        playerObj.sprite.y = floorHit.y;
        playerObj.jumping = playerObj.isFlying = disableAttacking = false;
        playerObj.sprite.gotoAndStop(0);
        playerObj.setTextures(5);
        playerObj.doingIdle = false;
        disableAttacking = false;
        disableMovement = false;
        ePressed = false;
        playerObj.sprite.gotoAndStop(0);
        floorHit.y = 600;
      })) {
      if (fps >= 20) {  // lower than around 20, the this falls too quickly and through the floor
        if (this.jumping && (this.sprite.vy != 0 || this.canFly)) {
          this.sprite.vy += 0.05 * 144 / fps; // add gravity
        }
      } else {
        this.sprite.vy += 0.2;
      }
    }
    if (!disableMovement) {
      if (left.isDown != right.isDown) {
        if (!this.testTextures(5) && !this.jumping) {
          this.setTextures(5);
        }
        this.sprite.vx = this.speed * 60 / fps * (right.isDown - left.isDown);
        this.sprite.scale.x = Math.abs(this.sprite.scale.x) * -Math.sign(this.sprite.vx);
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
      } else {
        this.sprite.vx = 0;
        if (!this.isFlying && !this.jumping) {
          this.doIdle();
        }
      }
      // Test easily breakable objects, i.e. coffeemaker and lamps
      b.hit(this.sprite, lamps1, false, false, false,
        function(collision, lampHit) {
          if (!lampHit.hasBeenRuined) {
            chaosToAdd += 5;
            pointsToAdd += 5;
            lampHit.play();
            lampHit.hasBeenRuined = true;
          }
        });
      b.hit(this.sprite, coffeeMakers, false, false, false,
        function(collision, coffeeHit) {
          if (!coffeeHit.hasBeenRuined) {
            chaosToAdd += 5;
            pointsToAdd += 5;
            coffeeHit.y += 3;
            coffeeHit.play();
            coffeeHit.hasBeenRuined = true;
          }
        });
      b.hit(this.sprite, lamps2, false, false, false,
        function(collision, lampHit) {
          if (!lampHit.hasBeenRuined) {
            chaosToAdd += 5;
            pointsToAdd += 5;
            lampHit.play();
            lampHit.x += 13;
            lampHit.hasBeenRuined = true;
          }
        });
    } else { // disableMovement = true, i.e. this is attacking
      this.sprite.x += this.sprite.vxa * 144 / fps;
      // Test hit for garbages every frame to knock them down appropriately
      b.hit(this.sprite, garbages, false, false, false,
        function(collision, garbageHit) {
          if (!garbageHit.knockedOver) {
            if (b.hitTestRectangle(playerObj.sprite, new PIXI.Rectangle(garbageHit.x - 60,
            garbageHit.y - 100, 35, 100))) {
              if (Math.sign(playerObj.sprite.scale.x) == -1) {
                garbageHit.scale.x = playerObj.animal == 'skunk' ? -1 : 1;
                if (playerObj.animal == 'skunk') garbageHit.x -= 60;
              } else {
                if (playerObj.animal != 'skunk') garbageHit.x -= 60;
                garbageHit.scale.x = playerObj.animal == 'skunk' ? 1 : -1;
              }
              garbageHit.y += 2;
              garbageHit.knockedOver = true;
              garbageHit.play();
              chaosToAdd += 1;
              pointsToAdd += 1;
            }
          }
        });
      b.hit(this.sprite, fridges, false, false, false,
        function(collision, fridgeHit) {
          if (!fridgeHit.hasBeenRuined) {
            chaosToAdd += 2;
            pointsToAdd += 2;
            fridgeHit.play();
            fridgeHit.hasBeenRuined = true;
          }
        });
      b.hit(this.sprite, chairs, false, false, false,
        function(collision, chairHit) {
          if (!chairHit.hasBeenRuined) {
            chaosToAdd += 5;
            pointsToAdd += 5;
            chairHit.play();
            chairHit.hasBeenRuined = true;
          }
        });
    }
    // Check list of conditions to make sure this is actually idle
    if (!space.isDown && !this.jumping && this.sprite.vx == 0
       && !disableMovement && !left.isDown && !right.isDown) {
      this.doIdle();
    }
    this.camera.updateCamera();

    //controls the this being able to leave the bounds of the world
    if (this.sprite.position.x > 12340) {
      this.sprite.position.x = 12340;
    }
    if (this.sprite.position.x < -11940) {
      this.sprite.position.x = -11940;
    }
    if (this.inHouse && this.sprite.position.x >= 679) {
      this.sprite.position.x = 679;
    }
    if (this.inHouse && this.sprite.position.x <= 329) {
      this.sprite.position.x = 329;
    }
  };
  // Function called to make the this idle
  this.doIdle = function () {
    if (!this.testTextures(7)) {
      this.doingIdle = true;
      this.setTextures(7);
      if (this.animal == 'goose') {
        this.sprite.animationSpeed = .2;
      } else {
        this.sprite.animationSpeed = 0.05;
      }
      this.sprite.play();
    }
  };
}
