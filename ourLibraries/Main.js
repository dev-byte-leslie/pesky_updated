// Sprite variables for people
var people1 = [], people2 = [], people3 = [], person1_sick,
  person2_sick, person3_sick, peopleTypes, numPeople, numOfEnemyAi = [],
  animalControlCaught,

  // Sprite variables for carlos
  carlosWalk, carlosJump, carlosIdle, carlosRabies, carlosDown, carlosUp,
  carlosWalk2, carlosJump2, carlosIdle2, carlosRabies2, carlosDown2, carlosUp2,

  //Sprite variables for stanky
  stankyWalk, stankyJump, stankyIdle, stankyAttack, stankyWalk2, stankyJump2,
  stankyIdle2, stankyAttack2,

  //Sprite variables for Walter
  walterWalk, walterFly, walterIdle, walterAttack, walterWalk2, walterFly2,
  walterIdle2, walterAttack2, walterJump, walterJump2,

  //General variables for different objects
  wTexture, whiteFloor, animalTextures,
  animalObjectTexture, houseBackground1, houseOutside1, houseBackgroundTexture1,
  houseOutsideTexture1, doorText, door, floors = [], houseDoors = [], platform,
  doorObj, floorTexture,

  // Inside house stuff
  interiors = [], houses = [], fridges = [], groot, chairs = [], coffeeMakers = [],
  lamps1 = [], lamps2 = [],

  hedgeLocX1, hedgeLocX2, hedgeLocX3, hedgeLocY,

  walterCaught, stankyCaught, carlosCaught, reloadTimer = 0, ePressed = false,

  garbageSprite1, garbageSprite2, garbages = [],

  //vars to hold sprites of houses
  redHouse, blueHouse, beigeHouse, greyHouse, hedge, redHouseNoSky, blueHouseNoSky,
  beigeHouseNoSky, greyHouseNoSky, iDoor, sDoor, hedgeNoSky,

  //Background textures
  title, titleBackground, blackTitleOverlay, backgroundVideo, hedgeBackground, blackOverlay, gameOverText, pointsText,

  //Global var for chaos
  chaos = 0, chaosToAdd = 0,

  //Global vars for points
  points = 0, pointsToAdd = 0;

// Called when everything is loaded
$(document).ready(function() {
  initEverything();
});
// Initialize global variables
function initEverything() {
  renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT);
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
  space = keyboard(32);
  shiftKey = keyboard(16);
  switchE = keyboard(69);
  f1 = keyboard(112); // fps toggle
  esc = keyboard(27);
  nVal = keyboard(78); // go to next street
  f = keyboard(70); // attack
  up = keyboard(87);
  left = keyboard(65);
  down = keyboard(83);
  right = keyboard(68);

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
    .add('../images/AiSprites/Walter_Caught.png')
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
    .add('../images/PlayerAnimals/skanky_up.png')
    .add('../images/PlayerAnimals/skanky_down.png')

    //Walter Textures
    .add('../images/PlayerAnimals/WalterFly.png')
    .add('../images/PlayerAnimals/WalterPeck.png')
    .add('../images/PlayerAnimals/WalterWalk.png')
    .add('../images/PlayerAnimals/WalterIdle.png')
    .add('../images/PlayerAnimals/walter_jump.png')
    .add('../images/PlayerAnimals/walter_up.png')
    .add('../images/PlayerAnimals/walter_down.png')

    // Backgrounds
    .add('../images/Backgrounds/CharSelectBackground.png')
    .add('../images/Backgrounds/Title.png')
    .add('../images/Backgrounds/BlackOverlay.png')
    .add('../images/Backgrounds/blackMenuOverlay.png')
    .add('../images/Backgrounds/GameOver.png')
    .add('../images/floor.png')
    .add('../images/HUD/chaosText.png')

    //house sprites/hedge sprite
    .add('../images/WorldObjects/Beige_House.png')
    .add('../images/WorldObjects/Blue_House.png')
    .add('../images/WorldObjects/LongHedge.png')
    .add('../images/WorldObjects/Red_House.png')
    .add('../images/WorldObjects/Grey_House.png')
    .add('../images/WorldObjects/Door_Invisible.png')
    .add('../images/WorldObjects/Beige_House_noSky.png')
    .add('../images/WorldObjects/Blue_House_noSky.png')
    .add('../images/WorldObjects/Grey_House_noSky.png')
    .add('../images/WorldObjects/Red_House_noSky.png')
    .add('../images/WorldObjects/bush_no_back.gif')
    .add('../images/WorldObjects/cloud_back_ground.png')

    //interiors
    .add('../images/HouseObjects/Interior_1.png')
    .add('../images/HouseObjects/Interior_2.png')
    .add('../images/HouseObjects/Interior_3.png')
    .add('../images/HouseObjects/Interior_4.png')

    // Object sprites
    .add('../images/WorldObjects/garbage.png')
    .add('../images/WorldObjects/garbage2.png')
    .add('../images/HouseObjects/chair.png')
    .add('../images/HouseObjects/Coffee_maker.png')
    .add('../images/HouseObjects/fridge.png')
    .add('../images/HouseObjects/lamp_1.png')
    .add('../images/HouseObjects/lamp_2.png')
    .add('../images/HouseObjects/baby_groot.png')
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
  stankyDown = new spriteCreator('../images/PlayerAnimals/skanky_down.png', 45, 45);
  stankyDown2 = new spriteCreator('../images/PlayerAnimals/skanky_down.png', 45, 45);
  stankyUp = new spriteCreator('../images/PlayerAnimals/skanky_up.png', 45, 45);
  stankyUp2 = new spriteCreator('../images/PlayerAnimals/skanky_up.png', 45, 45);

  //Walter sprites
  walterIdle = new spriteCreator('../images/PlayerAnimals/WalterIdle.png', 45, 55);
  walterIdle2 = new spriteCreator('../images/PlayerAnimals/WalterIdle.png', 45, 55);
  walterWalk = new spriteCreator('../images/PlayerAnimals/WalterWalk.png', 45, 55);
  walterWalk2 = new spriteCreator('../images/PlayerAnimals/WalterWalk.png', 45, 55);
  walterFly = new spriteCreator('../images/PlayerAnimals/WalterFly.png', 70, 70);
  walterFly2 = new spriteCreator('../images/PlayerAnimals/WalterFly.png', 70, 70);
  walterAttack = new spriteCreator('../images/PlayerAnimals/WalterPeck.png', 60, 55);
  walterAttack2 = new spriteCreator('../images/PlayerAnimals/WalterPeck.png', 60, 55);
  walterJump = new spriteCreator('../images/PlayerAnimals/walter_jump.png', 43, 53);
  walterJump2 = new spriteCreator('../images/PlayerAnimals/walter_jump.png', 43, 53);
  walterUp = new spriteCreator('../images/PlayerAnimals/walter_up.png', 43, 48);
  walterUp2 = new spriteCreator('../images/PlayerAnimals/walter_up.png', 43, 48);
  walterDown = new spriteCreator('../images/PlayerAnimals/walter_down.png', 43, 48);
  walterDown2 = new spriteCreator('../images/PlayerAnimals/walter_down.png', 43, 48);

  // People sprites
  numPeople = 8; // Total number of people PER SPRITE TYPE
  peopleTypes = 3; // Number of sprite types for people
  // eval() takes a string and turns it into code which makes it
  // much easier to generate and assign repetitive variables
  for (let i = 1; i <= peopleTypes; i++) {
    for (let j = 1; j <= numPeople; j++) { // it is assumed all 3 people arrays have equal length
      eval('person'+i+'_'+j+' = new spriteCreator('+'\'../images/AiSprites/person_'+i+'.png\', 50, 75);');
      eval('people'+i).push(eval('person'+i+'_'+j));
    }
    eval('person'+i+'_sick = new spriteCreator(\'../images/AiSprites/person_'+i+'_sick.png\', 50, 75);');
  }
  animalControlSprite = new spriteCreator('../images/AiSprites/animal_control.png', 60, 75);
  animalControlAttackSprite = new spriteCreator('../images/AiSprites/animal_control_attack.png', 100, 100);
  animalControlAttackSprite.anchor.set(0.5, 1);

  // Objects like garbage
  for (let i = 1; i <= 50; i++) { // 50 garbages in the world
    if (Math.random() < 0.5) {
      eval('garbage' + i + '= new spriteCreator(\'../images/WorldObjects/garbage.png\', 80, 42);');
    } else {
      eval('garbage' + i + '= new spriteCreator(\'../images/WorldObjects/garbage2.png\', 80, 50);');
    }
    eval('garbages.push(garbage' + i + ');');
  }

  // Animal control sprites
  carlosCaught = new spriteCreator('../images/AiSprites/carlos_caught.png', 100, 100);
  stankyCaught = new spriteCreator('../images/AiSprites/stanky_caught.png', 100, 100);
  walterCaught = new spriteCreator('../images/AiSprites/Walter_Caught.png', 100, 100);

  //strings that hold the image for the building on the map
  redHouse = '../images/WorldObjects/Red_House.png';
  blueHouse = '../images/WorldObjects/Blue_House.png';
  greyHouse = '../images/WorldObjects/Grey_House.png';
  beigeHouse = '../images/WorldObjects/Beige_House.png';
  floorTexture = '../images/HouseBackground.png';
  redHouseNoSky = '../images/WorldObjects/Red_House_noSky.png';
  blueHouseNoSky = '../images/WorldObjects/Blue_House_noSky.png';
  greyHouseNoSky = '../images/WorldObjects/Grey_House_noSky.png';
  beigeHouseNoSky = '../images/WorldObjects/Beige_House_noSky.png';

  hedge = '../images/WorldObjects/LongHedge.png';
  hedgeNoSky = '../images/WorldObjects/bush_no_back.gif';
  iDoor = '../images/WorldObjects/Door_Invisible.png';
  sDoor = '../images/AnimalPlaceHolder.png';

  hedgeBackground = new Sprite(TextureCache['../images/Backgrounds/CharSelectBackground.png']);
  let videoTexture = new Texture.fromVideo('../images/Backgrounds/title_background_noOverlay.mp4');
  titleBackground = new Sprite(videoTexture);
  title = new Sprite(TextureCache['../images/Backgrounds/Title.png']);
  blackTitleOverlay = new Sprite(TextureCache['../images/Backgrounds/blackMenuOverlay.png']);
  blackOverlay = new Sprite(TextureCache['../images/Backgrounds/BlackOverlay.png']);
  gameOverText = new Sprite(TextureCache['../images/Backgrounds/GameOver.png']);
  pointsText = new PIXI.Text('Score: '+ points, {font: '50px Road_Rage', fill: '#eeeeee'});
  backgroundVideo = videoTexture.baseTexture.source;
  backgroundVideo.loop = true;

  door = new Sprite(TextureCache['../images/AnimalPlaceHolder.png']);
  houseBackground1 = new Sprite(TextureCache['../images/HouseBackground.png']);
  groot = new spriteCreator('../images/HouseObjects/baby_groot.png', 50, 50);

  for (let i = 1; i <= 4; i++) {
    interiors.push(eval('new Sprite(TextureCache[\'../images/HouseObjects/Interior_' + i +'.png\']);'));
  }

  for (let i = 0; i < 61; i++) {
    eval('fridge'+i+'= new spriteCreator(\'../images/HouseObjects/fridge.png\', 100, 100);');
    fridges.push(eval('fridge'+i));
    eval('coffeeMaker'+i+'= new spriteCreator(\'../images/HouseObjects/Coffee_maker.png\', 28, 28);');
    coffeeMakers.push(eval('coffeeMaker'+i));
    eval('chair'+i+'= new spriteCreator(\'../images/HouseObjects/chair.png\', 80, 100);');
    chairs.push(eval('chair'+i));
    eval('lamp1_'+i+'= new spriteCreator(\'../images/HouseObjects/lamp_1.png\', 50, 50);');
    lamps1.push(eval('lamp1_'+i));
    eval('lamp2_'+i+'= new spriteCreator(\'../images/HouseObjects/lamp_2.png\', 50, 50);');
    lamps2.push(eval('lamp2_'+i));

    eval('fridge'+i).loop = false;
    eval('fridge'+i).anchor.set(0.5, 1);
    eval('fridge'+i).hasBeenRuined = false;

    eval('coffeeMaker'+i).loop = false;
    eval('coffeeMaker'+i).anchor.set(0.5, 1);
    eval('coffeeMaker'+i).hasBeenRuined = false;

    eval('chair'+i).loop = false;
    eval('chair'+i).anchor.set(0.5, 1);
    eval('chair'+i).hasBeenRuined = false;

    eval('lamp1_'+i).loop = false;
    eval('lamp1_'+i).anchor.set(0.5, 1);
    eval('lamp1_'+i).hasBeenRuined = false;

    eval('lamp2_'+i).loop = false;
    eval('lamp2_'+i).anchor.set(0.5, 1);
    eval('lamp2_'+i).hasBeenRuined = false;
  }
  setTimeout(function() {
    backgroundVideo.play();
    startMenu();
    g.state = menuState;
  }, 1000);
}

function updateThings() {
  updateFps();
  updateChaos();
  updatePoints();
  updateAI();
  numOfEnemyAi.forEach(function(animalControl) {
    animalControl.updateAiMovement();
  });
}
