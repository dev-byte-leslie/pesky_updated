function Player() {
  this.sprite = animalObject;
  this.jumping = false;
  this.jumpHeight = 350;
  this.spacePush = false;
  this.lowestHeight = 700;
  this.active = true;
  this.moveStates = ['Left', 'Right', 'Jump', 'StopL', 'StopR'];

  //set the objects starting point
  this.sprite.x = 300;
  this.sprite.y = 700;

  this.sprite.anchor.set(0.5, 1);

  this.camera = new camera();

  //set the objects starting velocities
  this.sprite.vx = 0;
  this.sprite.vy = 0;

  this.update = function() {
    //add x velocity to player's x location
    this.sprite.x += this.sprite.vx;
    this.sprite.y += this.sprite.vy;

    this.camera.updateCamera();
  };
}
