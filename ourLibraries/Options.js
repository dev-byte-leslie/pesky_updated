var gameMusic, menuMusic, jumpSound, aiCloseSound;
// load the music and sounds
sounds.load([
  "../sound/music/GameMusic.wav",
  "../sound/music/MenuMusic.wav",
  "../sound/music/Jump.wav",
  "../sound/music/PoliceScanner.wav"
  // add more sounds (attack, character switch, entering/exiting houses, etc)
]);

sounds.whenLoaded = loadSounds;

function loadSounds() {

// create the sounds
gameMusic = sounds["../sound/music/GameMusic.wav"];
menuMusic = sounds["../sound/music/MenuMusic.wav"];
jumpSound = sounds["../sound/music/Jump.wav"];
aiCloseSound = sounds["../sound/music/PoliceScanner.wav"];


    menuMusic.volume = 0.5;   // menu music volume
    menuMusic.loop = true;    // menu music loops

    gameMusic.volume = 0.5;   // game music volume
    gameMusic.loop = true;    // game music loops

  // menu music plays automatically when menu is active
  // needs more work
  if (g.state = menuState) {
    menuMusic.play();
    console.log('menu music playing');
  }

  // game music plays automatically when game is active
  // needs more work
/*
  if (g.state = play && !menuMusic.playing){
      menuMusic.pause();
      gameMusic.play();
  }
*/

  // capture the keyboard events
  var b = keyboard(66),
      c = keyboard(67),
      d = keyboard(68),
      space = keyboard(32);

  // control the sounds based on which keys are pressed

  // play the menu music
  b.press = function() {
    if (!menuMusic.playing) {
      menuMusic.play();
      gameMusic.pause();
    }
    console.log('menu music playing');
  };

  // play the game music
  d.press = function() {
    if (!gameMusic.playing) {
      gameMusic.play();
      menuMusic.pause();
    }
    console.log('game music playing');
  };

  // pause the music
  c.press = function() {
    menuMusic.pause();
    gameMusic.pause();
    console.log('music paused');
  };
}
var optionsGroup;
function initOptions() {
  optionsGroup = new PIXI.Container();
  let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
  buttonBack.scale.x = 0.5;
  buttonBack.scale.y = 0.5;
  var buttonMute = createButton(WIDTH / 2, HEIGHT * 0.5 - 90, muteAudio, optionsGroup, 'mute');
  buttonMute.scale.x = 0.5;
  buttonMute.scale.y = 0.5;

  optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
  optionsGroup.addChild(buttonMute);
  g.stage.addChild(optionsGroup);
}

function mainMenu() {
  g.state = menuState;
}

function muteAudio() {
  menuMusic.volume = (menuMusic.volume == 0) ? 0.5 : 0;
  gameMusic.volume = (gameMusic.volume == 0) ? 0.5 : 0;
}
