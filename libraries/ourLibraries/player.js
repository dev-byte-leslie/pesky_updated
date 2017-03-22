function Player() {
  //sets initial variables for player object
  this.sprite = animalObject;
  this.jumping = false;
  this.jumpHeight = 350;
  this.spacePush = false;
  this.lowestHeight = 600;
  this.active = true;
  this.moveStates = ['Left', 'Right', 'Jump', 'StopL', 'StopR'];

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
    this.sprite.x += this.sprite.vx;
    this.sprite.y += this.sprite.vy;

    this.camera.updateCamera();
  };
}
