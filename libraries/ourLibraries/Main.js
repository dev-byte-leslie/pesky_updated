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
  houseOutsideTexture1, doorText, door, floor, platform, fps, frameTime = 0,
  lastLoop = new Date, thisLoop, filterStrength = 20;

//vars to hold sprites of houses
var redHouse, blueHouse, beigeHouse, greyHouse, hedge;

$(document).ready(function() {
  //initCharacterSwap();
  initEverything();
});
function initEverything() {
  renderer = new PIXI.CanvasRenderer(WIDTH, HEIGHT);
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
  fpsDisplay = new PIXI.Text('', {font:'12px Arial', fill:'yellow'});
  setInterval(function() {
    fpsDisplay.text = fpsEnabled ? fps : '';
  }, 1000);
  startMenu();
  g.state = menuState;

  loader
    .add('../../images/AnimalPlaceHolder.png')
    .add('../../images/BackGround.png')
    .add('../../images/HouseBackground.png')
    .add('../../images/HouseOutside.png')
    .add('../../images/ACPH.png')
    .add('../../images/PlayerAnimals/CarlosWalkCycle.png')
    .add('../../images/AiSprites/animal_control.png')
    .add('../../images/floor.png')

    //house sprites/hedge sprite
    .add('../../images/WorldObjects/Beige_House.png')
    .add('../../images/WorldObjects/Blue_House.png')
    .add('../../images/WorldObjects/LongHedge.png')
    .add('../../images/WorldObjects/Red_House.png')
    .add('../../images/WorldObjects/Grey_House.png')
    .load(setup);
}

function setup() {
  animalObject = new spriteCreator('../../images/PlayerAnimals/CarlosWalkCycle.png', 55, 22);
  floor = new spriteCreator('../../images/HouseBackground.png', 1000, 1000);

  //strings that hold the image for the building on the map
  redHouse = '../../images/WorldObjects/Red_House.png';
  blueHouse = '../../images/WorldObjects/Blue_House.png';
  greyHouse = '../../images/WorldObjects/Grey_House.png';
  beigeHouse = '../../images/WorldObjects/Beige_House.png';

  hedge = '../../images/WorldObjects/LongHedge.png';

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
  updateFps();
}

// Hide all stage elements
function hideAll() {
  for (var i = 0; i < g.stage.children.length; i++) {
    g.stage.getChildAt(i).visible = false;
  }
}
