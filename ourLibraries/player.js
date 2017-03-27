function Player() {
  //sets initial variables for player object
  this.nearDoor = false; //sets whether the player is near a door
  this.sprite = animalObject; //sprite object of the player character
  this.jumping = false; //whether the player is jumping
  this.spacePush = false; //whether the spacebar is being pressed or not
  this.active = true;
  this.moveStates = ['Left', 'Right', 'Jump', 'StopL', 'StopR']; //movement flags for player movement.
  this.xValue = 0; //the World Coordinate x-value of the player, starts at 0 when the player is instantiated
  this.sprite.x = 500; //set the objects starting point
  this.sprite.y = 600;
  this.sprite.anchor.set(0.5, 1); //sets anchor of player sprite for animation flipping
  this.camera = new camera(); //instantiates the camera for the main character
  this.sprite.vx = 0; //set the objects starting velocities
  this.sprite.vy = 0;
  this.sprite.animationSpeed = 0.1;

  //updates player location and camera location
  this.update = function() {
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
        floorHit.y = 600;
        if (left.isDown) {
          if (fps >= 30) {
            player.sprite.vx = -5 * 60 / fps;
          } else {
            player.sprite.vx = -5;
          }
          player.sprite.scale.x = 1;
          player.sprite.play();
        } else if (right.isDown) {
          if (fps >= 30) {
            player.sprite.vx = 5 * 60 / fps;
          } else {
            player.sprite.vx = 5;
          }
          player.sprite.play();
          player.sprite.scale.x = -1;
        } else {
          player.sprite.vx = 0;
        }
      })) {
      if (fps >= 45) {  // lower than around 45, the player falls too quickly and through the floor
        if (player.jumping && player.sprite.vy != 0) {
          player.sprite.vy += 0.25 * Math.round(600 / fps) / 10; // add gravity based on framerate
        }
      }
    }
    this.sprite.y += this.sprite.vy; //add y velocity to player's y location
    this.sprite.x += this.sprite.vx; //add x velocity to player's x location
    this.xValue += this.sprite.vx;
    this.camera.updateCamera();
  };
}
