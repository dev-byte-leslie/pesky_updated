$(document).ready(function() {
  //initCharacterSwap();
});
var animalAnimated = new SpriteUtilities(PIXI);
function spriteCreator(stringTexture, width, height) {
  //checks to see if the input is a string
  // if it is not a string it converts it to a string
  if (typeof stringTexture != 'string') {
    this.stringTexture = String(stringTexture);
  }
  else {
    //sets stringTexture to as the varible passed in
    this.stringTexture = stringTexture;
  }
  //creates a filmstrip of the new texture
  this.texture = animalAnimated.filmstrip(stringTexture, width, height);

  //makes the animated sprite object and returns it
  this.sprite = new MovieClip(this.texture);
  return this.sprite;
}
const WIDTH = 1280, HEIGHT = 720;
var g = hexi(WIDTH, HEIGHT, setupGame);
var Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  MovieClip = PIXI.extras.MovieClip;
var renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT);
var b = new Bump(PIXI);
//add the ability to add mouse/input events
var tinkPoint = new Tink(PIXI, renderer.view);
g.start();

function setupGame() {
  g.scaleToWindow();
  g.state = menuState;

  loader
    .add('../../images/AnimalPlaceHolder.png')
    .add('../../images/BackGround.png')
    .add('../../images/HouseBackground.png')
    .add('../../images/HouseOutside.png')
    .add('../../images/ACPH.png')
    .add('../../images/CarlosWalkCycle.png')
    .add('../../images/animal_control.png')
    .add('../../images/floor.png')
    .load(setup);

  //calls function that designates what each key does when it is pressed
  Keys();
}

var animalObject, wTexture, whiteFloor, animalTextures, animalAnimated,
  animalObjectTexture, houseBackground1, houseOutside1, houseBackgroundTexture1,
  houseOutsideTexture1, doorText, door, floor, cameraMain, player;

function setup() {
  animalObject = new spriteCreator('../../images/CarlosWalkCycle.png', 55, 45);
  whiteFloor = new spriteCreator('../../images/BackGround.png', 1280, 720);
  houseBackground1 = new spriteCreator('../../images/HouseBackground.png', 1000, 1000);
  houseOutside1 = new spriteCreator('../../images/HouseOutside.png', 400, 400);
  door = new spriteCreator('../../images/AnimalPlaceHolder.png', 80, 80);
  floor = new spriteCreator('../../images/floor.png', 720, 1);
}
// Game loops dependent on state
function menuState() {
  g.scaleToWindow();
  hideAll();
  mainMenuGroup.visible = true;
}
function optionsState() {
  g.scaleToWindow();
}
function creditsState() {
  g.scaleToWindow();
  credits.y -= 2;
}
function tutorialState() {
  g.scaleToWindow();
}
function switchCharacterState() {
  g.scaleToWindow();
}
function play() {
  g.scaleToWindow();

  /*
  //add x velocity to player's x location
  player.sprite.x += player.sprite.vx;
  player.sprite.y += player.sprite.vy;*/

  //add x and y velocities to the animal control object
  animalCont1.aCObject.x += animalCont1.aCObject.vx;
  animalCont1.aCObject.y += animalCont1.aCObject.vy;

  //call functions for player and ai logic
  player.update();
  jump();
  animalCont1.aiMovement();
  tinkPoint.update();
}

// Hide all stage elements
function hideAll() {
  for (var i = 0; i < g.stage.children.length; i++) {
    g.stage.getChildAt(i).visible = false;
  }
}
