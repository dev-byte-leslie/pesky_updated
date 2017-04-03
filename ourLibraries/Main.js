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
// TODO clean this up a little
// Sprite variables for people
var person1, person2, person3, person1_sick, person2_sick, person3_sick;

// Sprite variables for carlos
var carlosWalk, carlosJump, carlosIdle, carlosRabies, carlosDown, carlosUp,
  carlosWalk2, carlosJump2, carlosIdle2, carlosRabies2, carlosDown2, carlosUp2;

//Sprite variables for stanky
var stankyWalk, stankyJump, stankyIdle, stankyAttack, stankyWalk2, stankyJump2,
  stankyIdle2, stankyAttack2;

//Sprite variables for Walter
var walterWalk, walterFly, walterIdle, walterAttack, walterWalk2, walterFly2,
  walterIdle2, walterAttack2;

//General variables for different objects
var wTexture, whiteFloor, animalTextures, animalAnimated,
  animalObjectTexture, houseBackground1, houseOutside1, houseBackgroundTexture1,
  houseOutsideTexture1, doorText, door, floors = [], houseDoors = [], platform,
  doorObj, floorTexture, hedgeLocX1, hedgeLocY1, hedgeLocX2, hedgeLocY2;

// General game variables
var lastLoop, thisLoop, fps = 60, disableMovement = false;

//vars to hold sprites of houses
var redHouse, blueHouse, beigeHouse, greyHouse, hedge, iDoor, sDoor;

//Background textures
var titleBackground, hedgeBackground;

var raccoonAlive = true, gooseAlive = true, skunkAlive = true;

// Called when everything is loaded
$(document).ready(function() {
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

  //Capture the keyboard arrow keys/other keys needed for controls
  left = keyboard(37);
  up = keyboard(38);
  right = keyboard(39);
  down = keyboard(40);
  space = keyboard(32);
  shiftKey = keyboard(16);
  switchE = keyboard(69);
  f1 = keyboard(112);
  esc = keyboard(27);

  loader
    .add('../images/AnimalPlaceHolder.png')
    .add('../images/BackGround.png')
    .add('../images/HouseBackground.png')
    .add('../images/HouseOutside.png')
    .add('../images/ACPH.png')

    //Animal Control Textures
    .add('../images/AiSprites/animal_control_attack.png')
    .add('../images/AiSprites/carlos_caught.png')
    .add('../images/AiSprites/stanky_caught.png')
    .add('../images/AiSprites/animal_control.png')

    //People sprites
    .add('../images/AiSprites/person_1.png')
    .add('../images/AiSprites/person_1_sick.png')
    .add('../images/AiSprites/person_2.png')
    .add('../images/AiSprites/person_2_sick.png')
    .add('../images/AiSprites/person_3.png')
    .add('../images/AiSprites/person_3_sick.png')

    //Carlos Textures
    .add('../images/PlayerAnimals/CarlosWalkCycle.png')
    .add('../images/PlayerAnimals/Carlos_attack.png')
    .add('../images/PlayerAnimals/carlos_jump.png')
    .add('../images/PlayerAnimals/carlos_idle1.png')
    .add('../images/PlayerAnimals/carlos_down.png')
    .add('../images/PlayerAnimals/carlos_up.png')

    //Stanky Textures
    .add('../images/PlayerAnimals/Skanky_attack.png')
    .add('../images/PlayerAnimals/Skanky_idle.png')
    .add('../images/PlayerAnimals/Skanky_jump.png')
    .add('../images/PlayerAnimals/Skanky.png')

    //Walter Textures
    .add('../images/PlayerAnimals/WalterFly.png')
    .add('../images/PlayerAnimals/WalterPeck.png')
    .add('../images/PlayerAnimals/WalterWalk.png')
    .add('../images/PlayerAnimals/WalterIdle.png')

    .add('../images/floor.png')

    // Backgrounds
    .add('../images/Backgrounds/CharSelectBackground.png')
    .add('../images/Backgrounds/Title.png')
    .add('../images/Backgrounds/TitleBackground.png')

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
  // I don't know why but sprites can only be switched if there's a second copy that doesn't change
  // Carlos sprites
  carlosIdle = new spriteCreator('../images/PlayerAnimals/carlos_idle1.png', 55, 20);
  carlosIdle2 = new spriteCreator('../images/PlayerAnimals/carlos_idle1.png', 55, 20);
  carlosWalk = new spriteCreator('../images/PlayerAnimals/CarlosWalkCycle.png', 55, 22);
  carlosWalk2 = new spriteCreator('../images/PlayerAnimals/CarlosWalkCycle.png', 55, 22);
  carlosJump = new spriteCreator('../images/PlayerAnimals/carlos_jump.png', 55, 28);
  carlosJump2 = new spriteCreator('../images/PlayerAnimals/carlos_jump.png', 55, 28);
  carlosRabies = new spriteCreator('../images/PlayerAnimals/Carlos_attack.png', 55, 27);
  carlosRabies2 = new spriteCreator('../images/PlayerAnimals/Carlos_attack.png', 55, 27);
  carlosDown = new spriteCreator('../images/PlayerAnimals/carlos_down.png', 45, 45);
  carlosDown2 = new spriteCreator('../images/PlayerAnimals/carlos_down.png', 45, 45);
  carlosUp = new spriteCreator('../images/PlayerAnimals/carlos_up.png', 45, 45);
  carlosUp2 = new spriteCreator('../images/PlayerAnimals/carlos_up.png', 45, 45);

  //Stanky sprites
  stankyIdle = new spriteCreator('../images/PlayerAnimals/Skanky_idle.png', 55, 29);
  stankyIdle2 = new spriteCreator('../images/PlayerAnimals/Skanky_idle.png', 55, 29);
  stankyWalk = new spriteCreator('../images/PlayerAnimals/Skanky.png', 55, 30);
  stankyWalk2 = new spriteCreator('../images/PlayerAnimals/Skanky.png', 55, 30);
  stankyJump = new spriteCreator('../images/PlayerAnimals/Skanky_jump.png', 75, 36);
  stankyJump2 = new spriteCreator('../images/PlayerAnimals/Skanky_jump.png', 75, 36);
  stankyAttack = new spriteCreator('../images/PlayerAnimals/Skanky_attack.png', 70, 39);
  stankyAttack2 = new spriteCreator('../images/PlayerAnimals/Skanky_attack.png', 70, 39);

  //Walter sprites
  walterIdle = new spriteCreator('../images/PlayerAnimals/WalterIdle.png', 45, 55);
  walterIdle2 = new spriteCreator('../images/PlayerAnimals/WalterIdle.png', 45, 55);
  walterWalk = new spriteCreator('../images/PlayerAnimals/WalterWalk.png', 45, 55);
  walterWalk2 = new spriteCreator('../images/PlayerAnimals/WalterWalk.png', 45, 55);
  walterFly = new spriteCreator('../images/PlayerAnimals/WalterFly.png', 70, 70);
  walterFly2 = new spriteCreator('../images/PlayerAnimals/WalterFly.png', 70, 70);
  walterAttack = new spriteCreator('../images/PlayerAnimals/WalterPeck.png', 60, 55);
  walterAttack2 = new spriteCreator('../images/PlayerAnimals/WalterPeck.png', 60, 55);

  //People sprites
  person1 = new spriteCreator('../images/AiSprites/person_1.png', 50, 75);
  person2 = new spriteCreator('../images/AiSprites/person_2.png', 50, 75);
  person3 = new spriteCreator('../images/AiSprites/person_3.png', 50, 75);
  person1_sick = new spriteCreator('../images/AiSprites/person_1_sick.png', 50, 75);
  person2_sick = new spriteCreator('../images/AiSprites/person_2_sick.png', 50, 75);
  person3_sick = new spriteCreator('../images/AiSprites/person_3_sick.png', 50, 75);
  animalControlSprite = new spriteCreator('../images/AiSprites/animal_control.png', 60, 75);

  // Animal control sprites
  carlosCaught = new spriteCreator('../images/AiSprites/carlos_caught.png', 100, 100);
  stankyCaught = new spriteCreator('../images/AiSprites/stanky_caught.png', 100, 100);

  //strings that hold the image for the building on the map
  redHouse = '../images/WorldObjects/Red_House.png';
  blueHouse = '../images/WorldObjects/Blue_House.png';
  greyHouse = '../images/WorldObjects/Grey_House.png';
  beigeHouse = '../images/WorldObjects/Beige_House.png';
  floorTexture = '../images/HouseBackground.png';

  hedge = '../images/WorldObjects/LongHedge.png';
  iDoor = '../images/WorldObjects/Door_Invisible.png';
  sDoor = '../images/AnimalPlaceHolder.png';

  hedgeBackground = new Sprite(TextureCache['../images/Backgrounds/CharSelectBackground.png']);
  titleBackground = new Sprite(TextureCache['../images/Backgrounds/TitleBackground.png']);
  title = new Sprite(TextureCache['../images/Backgrounds/Title.png']);

  door = new Sprite(TextureCache['../images/AnimalPlaceHolder.png']);
  houseBackground1 = new Sprite(TextureCache['../images/HouseBackground.png']);

  startMenu();
  g.state = menuState;
}
// Game loops dependent on state
function menuState() {
  g.stage.position.x = 0;
  g.stage.position.y = 0;
  g.stage.scale.x = 1;
  g.stage.scale.y = 1;
  g.stage.pivot.x = 0.5;
  g.stage.pivot.y = 0;
  hideAll();
  backgroundGroup.visible = true;
  title.position.x = 20;
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
function moveIntoHedgeState() { // freeze the game and move player into hedge
  updateFps();
  if (player.sprite.y > hedgeLocY1 + 150) {
    player.sprite.y += -1 * 60 / fps;
  } else {
    initCharacterSwitch();
    hideAll();
    switchCharacterGroup.visible = true;
    g.state = switchCharacterState;
  }
}
function moveFromHedgeState() {
  updateFps();
  if (player.sprite.y < 600) {
    player.sprite.y += 60 / fps;
  } else {
    player.sprite._texture = player.spriteArray[4]._texture;
    player.sprite._textures = player.spriteArray[4]._textures;
    g.state = play;
  }
}
function caughtState() {
  updateFps();
  if (animalCont1.aCObject.x >= player.holdX + 250) {
    animalCont1.aCObject._texture = animalControlSprite._texture;
    animalCont1.aCObject._textures = animalControlSprite._textures;
    initCharacterSwitch();
    hideAll();
    switchCharacterGroup.visible = true;
    g.state = switchCharacterState;
  } else {
    animalCont1.aCObject.x += 60 / fps;
  }
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
