// Global variables
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

var animalObject, wTexture, whiteFloor, animalTextures, animalAnimated,
  animalObjectTexture, houseBackground1, houseOutside1, houseBackgroundTexture1,
  houseOutsideTexture1, doorText, door, floor, platform, fpsDisplay;

//vars to hold sprites of houses
var redHouse, blueHouse, beigeHouse, greyHouse, hedge;

$(document).ready(function() {
  //initCharacterSwap();
  initEverything();
});
function initEverything() {
  renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT);
  b = new Bump(PIXI);
  tinkPoint = new Tink(PIXI, renderer.view);
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
  animalAnimated = new SpriteUtilities(PIXI);
  g = hexi(WIDTH, HEIGHT, setupGame);
  g.start();
}
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

function setupGame() {
  g.scaleToWindow();
  fpsDisplay = new PIXI.Text(fps.getFPS(), {font:'12px Arial', fill:'yellow'});
  startMenu();
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

    //house sprites/hedge sprite
    .add('../../images/Beige_House.png')
    .add('../../images/Blue_House.png')
    .add('../../images/LongHedge.png')
    .add('../../images/Red_House.png')
    .add('../../images/Grey_House.png')
    .load(setup);
}

function setup() {
  animalObject = new spriteCreator('../../images/CarlosWalkCycle.png', 55, 22);
  //whiteFloor = new spriteCreator('../../images/BackGround.png', 1280, 720);
  //houseBackground1 = new spriteCreator('../../images/HouseBackground.png', 1000, 1000);
  //houseOutside1 = new spriteCreator('../../images/HouseOutside.png', 400, 400);
  //door = new spriteCreator('../../images/AnimalPlaceHolder.png', 80, 80);
  //floor = new PIXI.Rectangle(WIDTH / 2, HEIGHT, WIDTH * 0.5, 200);
  floor = new spriteCreator('../../images/HouseBackground.png', 1000, 1000);

  //strings that hold the image for the building on the map
  redHouse = '../../images/Red_House.png';
  blueHouse = '../../images/Blue_House.png';
  greyHouse = '../../images/Grey_House.png';
  beigeHouse = '../../images/Beige_House.png';

  hedge = '../../images/LongHedge.png';

}
// Game loops dependent on state
function menuState() {
  hideAll();
  mainMenuGroup.visible = true;
}
function optionsState() {

}
function creditsState() {
  credits.y -= 2;
}
function tutorialState() {

}
function switchCharacterState() {

}
function play() {
  if (b.hit(floor, player.sprite)) {
    player.sprite.vy = 0;
    player.sprite.y = floor.y;
    floor.y = 700;
  } else {
    //player.sprite.vy += 0.4;
  }

  //call functions for player and ai logic
  player.update();
  //jump();
  animalCont1.aiMovement();
  tinkPoint.update();
  fpsDisplay.x = player.sprite.x - 160;
  fpsDisplay.y = player.sprite.y - 180;
  fpsDisplay.text = fpsEnabled ? fps.getFPS() : '';
}

// Hide all stage elements
function hideAll() {
  for (var i = 0; i < g.stage.children.length; i++) {
    g.stage.getChildAt(i).visible = false;
  }
}
