//TODO: SPEED UP GOOSE IDLE ANIMATION
function Player(stringAnimal) { //Temporary way to change animal sprites
  //sets initial variables for player object
  //Arrays to hold all the sprites
  // 0,1 = Attack 1 and 2
  // 2,3 = Fly/jump 1 and 2
  // 4,5 = Walk 1 and 2
  // 6,7 = Idle 1 and 2
  // 8,9 = Down 1 and 2
  //10,11 = Up 1 and 2
  this.gooseSprites = [walterAttack, walterAttack2, walterFly, walterFly2, walterWalk,
    walterWalk2, walterIdle, walterIdle2];

  this.raccoonSprites = [carlosRabies, carlosRabies2, carlosJump, carlosJump2,
    carlosWalk, carlosWalk2, carlosIdle, carlosIdle2, carlosDown, carlosDown2,
    carlosUp, carlosUp2];

  this.skunkSprites = [stankyAttack, stankyAttack2, stankyJump, stankyJump2,
    stankyWalk, stankyWalk2, stankyIdle, stankyIdle2];

  if (stringAnimal == 'raccoon') {
    this.spriteArray = this.raccoonSprites; //sprite object of the player character
  } else if (stringAnimal == 'goose') {
    this.spriteArray = this.gooseSprites;
  } else {
    this.spriteArray = this.skunkSprites;
  }

  //assign to the walk sprite of the designated array
  this.sprite = this.spriteArray[4];

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
        player.sprite.gotoAndStop(0);
        player.sprite._texture = player.spriteArray[5]._texture;
        player.sprite._textures = player.spriteArray[5]._textures;
        this.doingIdle = false;
        player.sprite.gotoAndStop(0);
        floorHit.y = 600;
      })) {
      if (fps >= 45) {  // lower than around 45, the player falls too quickly and through the floor
        if (player.jumping && player.sprite.vy != 0) {
          player.sprite.vy += 0.05 * 144 / fps; // add gravity
        }
      }
    }
    if (!disableMovement) {
      this.sprite.y += this.sprite.vy; //add y velocity to player's y location
      this.sprite.x += this.sprite.vx; //add x velocity to player's x location
      this.xValue += this.sprite.vx;
      if (left.isDown) {
        if (fps >= 30) {
          player.sprite.vx = -5 * 60 / fps;
        } else {
          player.sprite.vx = -5;
        }
        player.sprite.scale.x = 1;
        player.sprite.animationSpeed = 0.1;
        player.sprite.play();
      } else if (right.isDown) {
        if (fps >= 30) {
          player.sprite.vx = 5 * 60 / fps;
        } else {
          player.sprite.vx = 5;
        }
        player.sprite.play();
        player.sprite.scale.x = -1;
        player.sprite.animationSpeed = 0.1;
      } else {
        player.sprite.vx = 0;
      }
    }
    if (!space.isDown && !player.jumping && player.sprite.vx == 0 &&
      !shiftKey.isDown && !disableMovement) {
      this.doIdle();
    }
    this.camera.updateCamera();
  };
  this.doIdle = function () {
    if (player.sprite._texture != player.spriteArray[7]._texture &&
    player.sprite._textures != player.spriteArray[7]._textures) {
      this.doingIdle = true;
      player.sprite._texture = player.spriteArray[7]._texture;
      player.sprite._textures = player.spriteArray[7]._textures;
      if (stringAnimal == 'goose') {
        this.sprite.animationSpeed = .2;
      } else {
        this.sprite.animationSpeed = 0.05;
      }
      player.sprite.play();
    }
  };
}
