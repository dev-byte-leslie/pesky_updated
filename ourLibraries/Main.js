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
  houseOutsideTexture1, doorText, door, floors = [], houseDoors = [], platform, fps = 60, lastLoop, thisLoop;

//vars to hold sprites of houses
var redHouse, blueHouse, beigeHouse, greyHouse, hedge, iDoor;

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

function setupGame() {
  g.scaleToWindow();
  fpsDisplay = new PIXI.Text('', {font:'12px Arial', fill:'yellow'});
  setInterval(function() {
    fpsDisplay.text = fpsEnabled ? fps : '';
  }, 1000);
  startMenu();
  g.state = menuState;

  loader
    .add('../images/AnimalPlaceHolder.png')
    .add('../images/BackGround.png')
    .add('../images/HouseBackground.png')
    .add('../images/HouseOutside.png')
    .add('../images/ACPH.png')
    .add('../images/PlayerAnimals/CarlosWalkCycle.png')
    .add('../images/AiSprites/animal_control.png')
    .add('../images/floor.png')

    //house sprites/hedge sprite
    .add('../images/WorldObjects/Beige_House.png')
    .add('../images/WorldObjects/Blue_House.png')
    .add('../images/WorldObjects/LongHedge.png')
    .add('../images/WorldObjects/Red_House.png')
    .add('../images/WorldObjects/Grey_House.png')
    .add('../images/WorldObjects/Door_Invisible.png')
    .load(setup);
}

function setup() {
  animalObject = new spriteCreator('../images/PlayerAnimals/CarlosWalkCycle.png', 55, 22);

  //strings that hold the image for the building on the map
  redHouse = '../images/WorldObjects/Red_House.png';
  blueHouse = '../images/WorldObjects/Blue_House.png';
  greyHouse = '../images/WorldObjects/Grey_House.png';
  beigeHouse = '../images/WorldObjects/Beige_House.png';
  floorTexture = '../images/HouseBackground.png';

  hedge = '../images/WorldObjects/LongHedge.png';
  iDoor = '../images/WorldObjects/Door_Invisible.png';

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
  //call functions for player and ai logic
  player.update();
  jump();
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
