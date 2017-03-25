function Player() {
  //sets initial variables for player object

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

  //set the objects starting point
  //likely to change
  this.sprite.x = 500;
  this.sprite.y = 610;

  //sets anchor of player sprite for animation flipping
  this.sprite.anchor.set(0.5, 1);

  //instantiates the camera for the main character
  this.camera = new camera();

  //set the objects starting velocities
  this.sprite.vx = 0;
  this.sprite.vy = 0;

  //updates player location and camera location
  this.update = function() {
    //add x velocity to player's x location
    this.camera.updateCamera();
    if (this.sprite.vx < 0) {
      this.sprite.vx = -5 * 60 / fps;
    } else if (this.sprite.vx > 0) {
      this.sprite.vx = 5 * 60 / fps;
    }
    this.sprite.y += this.sprite.vy;
    this.sprite.x += this.sprite.vx;
    this.xValue += this.sprite.vx;
    this.camera.updateCamera();
  };
}
