//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump if space is pressed and player isn't moving vertically
  if (player.spacePush && (player.sprite.vy == 0 || !player.jumping) && !disableMovement) {
    player.jumping = true;
    player.sprite.vy = -2.51;
    player.sprite._texture = player.spriteArray[2]._texture;
    player.sprite._textures = player.spriteArray[2]._textures;
    if (!player.canFly) {
      player.sprite.gotoAndStop(0);
    }
    player.sprite.animationSpeed = 0.1;
    player.sprite.play();
  }
  if (player.jumping && player.spacePush && player.canFly && player.sprite.y > 500) {
    player.sprite.vy = -2.51;
    disableAttacking = true;
  } else if (player.canFly && player.spacePush) {
    player.jumping = true;
    player.sprite.vy = 0;
    disableAttacking = true;
  }
  player.lastVy = player.sprite.vy; // track what the player's vy was last frame
}

function spriteCreator(stringTexture, width, height) {
  //checks to see if the input is a string
  // if it is not a string it converts it to a string
  if (typeof stringTexture != 'string') {
    this.stringTexture = String(stringTexture);
  } else {
    //sets stringTexture to as the varible passed in
    this.stringTexture = stringTexture;
  }
  //creates a filmstrip of the new texture
  this.texture = animalAnimated.filmstrip(stringTexture, width, height);

  //makes the animated sprite object and returns it
  this.sprite = new MovieClip(this.texture);
  return this.sprite;
}

//build the inside of a house
function enterHouse() {
  player.inHouse = true;

  gameObjects.removeChild(map);
  g.stage.removeChild(gameObjects);
  gameObjects.addChild(house);
  g.stage.addChild(gameObjects);

  //keep track of world coordinates
  player.holdX = player.sprite.x;
  player.holdY = player.sprite.y;

  player.sprite.x = player.inHouseX;
  player.sprite.y = player.inHouseY;

  door.x = player.sprite.x + 70;
  door.y = player.sprite.y - 60;
  interior1.x = player.sprite.x - 200;
  interior1.y = player.sprite.y - 200;
  house.addChild(interior1);
  //house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
}

/*function attack()
{
  var rabies = new spriteCreator('../images/PlayerAnimals/Carlos_attack.png', 55, 45);
  var stink = '../images/PlayerAnimals/Stanky_attack.png';


  //var poop

  if(Raccoon.active)
  {
    player.sprite = rabies;
    player.sprite.play();
  }
  if(Skunk.active)
  {
    player.sprite = stink;
    player.sprite.play();
  }
  /*if(Goose.active)
  {

  }
}*/

//builds the outside game map
function buildOutside() {
  player.inHouse = false;

  gameObjects.removeChild(house);
  g.stage.removeChild(gameObjects);

  player.sprite.x = player.holdX;
  player.sprite.y = 600;

  map.addChild(player.sprite);
  map.addChild(animalCont1.aCObject);

  gameObjects.addChild(map);
  g.stage.addChild(gameObjects);
}

//generates a random integer between the min and max values
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function camera() {
  g.stage.position.x = renderer.width / 2;
  g.stage.position.y = renderer.height;
  //scale it
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;

  this.updateCamera = function() {
    //now specify which point INSIDE stage must be (0,0)
    if (player.sprite.position.x > 12200 || player.sprite.position.x < -11800) {
      if (player.sprite.position.x > 12000) {
        g.stage.pivot.x = 12200;
      } else {
        g.stage.pivot.x = -11800;
      }
    } else {
      g.stage.pivot.x = player.sprite.position.x;
    }

    //g.stage.pivot.y = player.sprite.position.y + 7; // view should include a bit of ground under player
    g.stage.pivot.y = 607; //This can change but doesnt allow the player to see outside of map
  };
}
// Monitor framerate using Date in ms between last frame and this frame
function updateFps() {
  frameTime = (thisLoop = new Date) - lastLoop;
  lastLoop = thisLoop;
  fps = Math.ceil(1000 / frameTime);
  if (player) {
    fpsDisplay.x = player.sprite.x - 160;
    fpsDisplay.y = 426;
  }
}
function updateAI() {
  people1.forEach(function(person) {
    person.x += person.vx;
  });
  people2.forEach(function(person) {
    person.x += person.vx;
  });
  people3.forEach(function(person) {
    person.x += person.vx;
  });
}
