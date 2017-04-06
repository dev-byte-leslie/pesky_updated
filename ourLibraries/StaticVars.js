// Declare global variables and methods that we'll never touch again to
// cut down on the size of other files, specifically Main.js
const WIDTH = 1280, HEIGHT = 720;
var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  MovieClip = PIXI.extras.MovieClip;
var g, renderer, b, tinkPoint, animalAnimated;
// General game variables
var lastLoop, thisLoop, fps = 60, disableMovement = false, maxX, minX;
var raccoonAlive = true, gooseAlive = true, skunkAlive = true;
// Hide all stage elements
function hideAll() {
  for (var i = 0; i < g.stage.children.length; i++) {
    g.stage.getChildAt(i).visible = false;
  }
}

function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  keyCodes.push(keyCode);

  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    if (keyCodes.includes(event.keyCode)) {
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
  };

  //Attach event listeners
  window.addEventListener(
  'keydown', key.downHandler.bind(key), false
  );
  window.addEventListener(
  'keyup', key.upHandler.bind(key), false
  );

  //Return the `key` object
  return key;
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

//generates a random integer between the min and max values
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
