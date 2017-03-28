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

var animalObject, jumpSprite, rabies, wTexture, whiteFloor, animalTextures, animalAnimated,
  animalObjectTexture, houseBackground1, houseOutside1, houseBackgroundTexture1,
  houseOutsideTexture1, doorText, door, floors = [], houseDoors = [], platform, fps = 60,
  carlosDefault, carlosJump, lastLoop, thisLoop, doorObj;

//vars to hold sprites of houses
var redHouse, blueHouse, beigeHouse, greyHouse, hedge, iDoor;
// Called when everything is loaded
$(document).ready(function() {
  //initCharacterSwap();
  initEverything();

});
// Initialize global variables
function initEverything() {
  renderer = new PIXI.CanvasRenderer(WIDTH, HEIGHT);
  b = new Bump(PIXI);
  tinkPoint = new Tink(PIXI, renderer.view);
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
  animalAnimated = new SpriteUtilities(PIXI);
  g = hexi(WIDTH, HEIGHT, setupGame);
  g.start();
}
// First of 2 setup functions, this one loads resources
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
    .add('../images/PlayerAnimals/Carlos_attack.png')
    .add('../images/PlayerAnimals/carlos_jump.png')

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
// Second setup function for assigning assets to variables
function setup() {
  animalObject = new spriteCreator('../images/PlayerAnimals/CarlosWalkCycle.png', 55, 22);
  jumpSprite = new spriteCreator('../images/PlayerAnimals/carlos_jump.png', 55, 28);
  carlosDefault = new spriteCreator('../images/PlayerAnimals/CarlosWalkCycle.png', 55, 22);
  carlosJump = new spriteCreator('../images/PlayerAnimals/carlos_jump.png', 55, 28);
  rabies = new spriteCreator('../images/PlayerAnimals/Carlos_attack.png', 55, 45);




  //strings that hold the image for the building on the map
  redHouse = '../images/WorldObjects/Red_House.png';
  blueHouse = '../images/WorldObjects/Blue_House.png';
  greyHouse = '../images/WorldObjects/Grey_House.png';
  beigeHouse = '../images/WorldObjects/Beige_House.png';
  floorTexture = '../images/HouseBackground.png';

  hedge = '../images/WorldObjects/LongHedge.png';
  iDoor = '../images/WorldObjects/Door_Invisible.png';
  sDoor = '../images/AnimalPlaceHolder.png';

  door = new Sprite(TextureCache['../images/AnimalPlaceHolder.png']);
  houseBackground1 = new Sprite(TextureCache['../images/HouseBackground.png']);

}
// Game loops dependent on state
function menuState() {
  hideAll();
  updateFps();
  mainMenuGroup.visible = true;
}
function optionsState() {
  updateFps();
}
function creditsState() {
  updateFps();
  credits.y -= 3 * 60 / fps;
}
function tutorialState() {
  updateFps();
}
function switchCharacterState() {
  updateFps();
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
