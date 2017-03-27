//---------------------------------------------------------Thomas Rosik---------------------------------------------------------------
function spawnAnimalControl(x , y) {
  //instantiate animal control sprite
  this.aCObject = new spriteCreator('../images/AiSprites/animal_control.png', 60, 75);

  //change the anchor point of the sprite so when it flips it looks normal
  this.aCObject.anchor.set(0.5, 1);

  //set sprite animation speed to not be too fast
  this.aCObject.animationSpeed = .2;

  //set x and y values of sprite
  this.aCObject.x = x;  //900;
  this.aCObject.y = y;  //700;

  //instantiate the velocities to be 0 in both directions
  this.aCObject.vx = 0;
  this.aCObject.vy = 0;


  //method that will be called every time "play" is called to deal with
  // ai movement
  this.aiMovement = function() {
      //doesnt let ai fall below the "floor"
    if (this.aCObject.y > 700) {
      this.aCObject.y = 700;
    }

    if (Math.abs(this.aCObject.x - player.sprite.x) <=  300 && Math.abs(this.aCObject.y - player.sprite.y) <= 300) {
      //if player is to the right of enemy
      if (this.aCObject.x < player.sprite.x) {
        this.aCObject.vx = 3.5 * 60 / fps;
        this.aCObject.scale.x = 1;
        this.aCObject.play();
      }

    //if player is to the left of enemy
      if (this.aCObject.x > player.sprite.x) {
        this.aCObject.vx = -3.5 * 60 / fps;
        this.aCObject.scale.x = -1;
        this.aCObject.play();
      }

      //if player is next to enemy
      if (b.hitTestRectangle(this.aCObject, player.sprite)) {
        this.aCObject.gotoAndStop(0);
        this.aCObject.vy = 0;
        this.aCObject.vx = 0;
      }
    }

      //stops enemy movement if player is too far away
    if (Math.abs(this.aCObject.x - player.sprite.x) >  300 || Math.abs(this.aCObject.y - player.sprite.y) > 300) {
      this.aCObject.gotoAndStop(0);
      this.aCObject.vx = 0;
      this.aCObject.vy = 0;
    }

    //add x and y velocities to the animal control object
    this.aCObject.x += this.aCObject.vx;
    this.aCObject.y += this.aCObject.vy;
  };
}
