//---------------------------------------------------------Thomas Rosik---------------------------------------------------------------
//TODO: Make it so AI LEAVES WHEN CHANGING IN HEDGE OR INSIDE A HOUSE
function spawnAnimalControl(x, y) {
  this.aCObject = new spriteCreator('../images/AiSprites/animal_control.png', 60, 75);

  //change the anchor point of the sprite so when it flips it looks normal
  this.aCObject.anchor.set(0.5, 1);

  //set sprite animation speed to not be too fast
  this.aCObject.animationSpeed = .15;

  //set x and y values of sprite
  this.aCObject.x = x;  //900;
  this.aCObject.y = y;  //700;

  //instantiate the velocities to be 0 in both directions
  this.speed = 3;
  this.aCObject.vx = 0;
  this.aCObject.vy = 0;
  this.aCObject.doingAttack = false;

  //detection distrance
  this.detection = 300;
  this.closeToPlayer = false;

  //Sound to be played when player is close to the AI
  this.playCloseSound = false;

  //method that will be called every time "play" is called to deal with
  // ai movement
  this.aiMovement = function() {
    // makes the ai go faster the more chaos that is caused. Change
    // the number that chaos is divided by to tweak the rate of increase
    // Makes ai able to detect player at greater distances the more chaos that is caused
    if (chaos) {
      this.speed = (3 + (Math.floor(chaos / 10) * 0.3)) * 60 / fps;
      this.detection = 300 + (chaos * 124);
    }

    //Plays the sound when player is too close
    if (Math.abs(this.aCObject.x - player.sprite.x) <= 800 &&
      this.playCloseSound == false) {
      this.playCloseSound = true;
      aiCloseSound.playFrom(0);
    }

    //stops the sound from playing if player is too far or too close to ai
    if (Math.abs(this.aCObject.x - player.sprite.x) > 500 ||
      Math.abs(this.aCObject.x - player.sprite.x) < 300) {
      this.playCloseSound = false;
      aiCloseSound.pause();
    }

    if (Math.abs(this.aCObject.x - player.sprite.x) <= this.detection) {
      this.closeToPlayer = true;
    } else {
      this.closeToPlayer = false;
    }

    if (this.closeToPlayer && player.sprite.y <= this.aCObject.y) {
      //if player is to the right of enemy
      if (!this.aCObject.doingAttack) {
        this.aCObject.vx = -1 * Math.sign(this.aCObject.x - player.sprite.x) * this.speed;
        this.aCObject.scale.x = -1 * Math.sign(this.aCObject.x - player.sprite.x);
        this.aCObject.play();
      }
    }

    //if player is next to enemy
    if (b.hitTestRectangle(this.aCObject, player.sprite)) {
      this.aCObject.doingAttack = true;
      let ac = this;
      if (this.aCObject._texture != animalControlAttackSprite._texture &&
        this.aCObject._textures != animalControlAttackSprite._textures) {
        this.aCObject._texture = animalControlAttackSprite._texture;
        this.aCObject._textures = animalControlAttackSprite._textures;
        this.aCObject.gotoAndStop(0);
        this.aCObject.vx = 0;
        this.aCObject.animationSpeed = 0.25;
        this.aCObject.play();
        setTimeout(function() { ac.catchPlayer() }, 500);
      }
    }

    //stops enemy movement if player is too far away
    if (Math.abs(this.aCObject.x - player.sprite.x) > this.detection) {
      this.aCObject.gotoAndStop(0);
      this.aCObject.vx = 0;
      this.aCObject.vy = 0;
    }

    //add x and y velocities to the animal control object
    this.aCObject.x += this.aCObject.vx * 60 / fps;
    this.aCObject.y += this.aCObject.vy * 60 / fps;
  };

  this.catchPlayer = function() {
    this.aCObject.doingAttack = false;
    this.aCObject.animationSpeed = 0.1;
    if (b.hitTestRectangle(this.aCObject, player.sprite) && g.state == play) {
      this.aCObject.gotoAndStop(0);
      //TODO: subtract point when caught
      //chaosToAdd -= 30;
      //pointsToAdd -= 30;
      //updatePoints();
      this.aCObject.scale.x = -1;
      if (player.animal == 'raccoon') {
        this.aCObject._texture = carlosCaught._texture;
        this.aCObject._textures = carlosCaught._textures;
        raccoonAlive = false;
      } else if (player.animal == 'skunk') {
        this.aCObject._texture = stankyCaught._texture;
        this.aCObject._textures = stankyCaught._textures;
        skunkAlive = false;
      } else {
        this.aCObject._texture = walterCaught._texture;
        this.aCObject._textures = walterCaught._textures;
        gooseAlive = false;
      }
      player.holdX = player.sprite.x;
      player.sprite.visible = false;
      this.aCObject.play();
      g.state = caughtState;
      animalControlCaught = this;
    } else {
      this.aCObject.vx = 0;
      this.aCObject._texture = animalControlSprite._texture;
      this.aCObject._textures = animalControlSprite._textures;
      this.aCObject.gotoAndStop(0);
    }
  };
}
