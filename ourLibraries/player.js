function Player() {
  //sets initial variables for player object

  //sets whether the player is near a door
  this.nearDoor = false;

  //sprite object of the player character
  this.sprite = animalObject;

  //whether the player is jumping
  this.jumping = false;
  //the max jumpHeight of the player
  this.jumpHeight = 350;
  //whether the spacebar is being pressed or not
  this.spacePush = false;
  //lowest Height the player character can get
  this.lowestHeight = 600;

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

  //sets anchor of player sprite for animation flipping
  this.sprite.anchor.set(0.5, 1);

  //instantiates the camera for the main character
  this.camera = new camera();

  //set the objects starting velocities
  this.sprite.vx = 0;
  this.sprite.vy = 0;

  //updates player location and camera location
  this.update = function() {
    console.log(player.sprite.y);

    //add x velocity to player's x location
    this.camera.updateCamera();
    if (this.sprite.vx < 0 && fps != 0) {
      this.sprite.vx = -5 * 60 / fps;
    } else if (this.sprite.vx > 0 && fps != 0) {
      this.sprite.vx = 5 * 60 / fps;
    }
    if (!b.hit(
      player.sprite,
      floors,
      true, false, false,
      function(collision, floorHit) {
        player.sprite.vy = 0;
        player.sprite.y = floorHit.y;
        player.jumping = false;
        floorHit.y = 600;
        if (left.isDown) {
          if (fps >= 30) {
            player.sprite.vx = -5 * 60 / fps;
          } else {
            player.sprite.vx = -5;
          }
          player.sprite.play();
          player.sprite.animationSpeed = .1;
        } else if (right.isDown) {
          if (fps >= 30) {
            player.sprite.vx = 5 * 60 / fps;
          } else {
            player.sprite.vx = 5;
          }
          player.sprite.play();
          player.sprite.animationSpeed = .1;
        } else {
          player.sprite.vx = 0;
        }
      })) {
      if (fps >= 45) {  // lower than around 45, the player falls too quickly and through the floor
        if (player.jumping && player.sprite.vy != 0) {
          player.sprite.vy += 0.25 * Math.round(600 / fps) / 10;
        }
      }
    }
    this.sprite.y += this.sprite.vy;
    this.sprite.x += this.sprite.vx;
    this.xValue += this.sprite.vx;
    this.camera.updateCamera();
  };
}
