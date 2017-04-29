var gameMusic, menuMusic, jumpSound, aiCloseSound, buttonMute, buttonFullscreen,
  optionsGroup, soundsArray = [], isFullscreen = false, lampBreakSound, chairRipSound,
  fridgeOpenSound, garbageSound1, garbageSound2;
// load the music and sounds
sounds.load([
  "../sound/music/GameMusic.wav",
  "../sound/music/MenuMusic.wav",
  "../sound/music/Jump.wav",
  "../sound/music/PoliceScanner.wav",
  '../sound/music/LampBreak.wav',
  '../sound/music/ChairRip.wav',
  '../sound/music/FridgeOpen.wav',
  '../sound/music/Garbage1.wav',
  '../sound/music/Garbage2.wav'
]);

sounds.whenLoaded = loadSounds;

function loadSounds() {
  gameMusic = sounds["../sound/music/GameMusic.wav"];
  menuMusic = sounds["../sound/music/MenuMusic.wav"];
  jumpSound = sounds["../sound/music/Jump.wav"];
  aiCloseSound = sounds["../sound/music/PoliceScanner.wav"];
  lampBreakSound = sounds['../sound/music/LampBreak.wav'];
  chairRipSound = sounds['../sound/music/ChairRip.wav'];
  fridgeOpenSound = sounds['../sound/music/FridgeOpen.wav'];
  garbageSound1 = sounds['../sound/music/Garbage1.wav'];
  garbageSound2 = sounds['../sound/music/Garbage2.wav'];

  soundsArray.push(gameMusic);
  soundsArray.push(menuMusic);
  soundsArray.push(jumpSound);
  soundsArray.push(aiCloseSound);

  lampBreakSound.volume = 0.25;
  chairRipSound.volume = 0.25;
  jumpSound.volume = 0.25;
  menuMusic.volume = 0.25;
  menuMusic.loop = true;

  gameMusic.volume = 0.25;
  gameMusic.loop = true;
}
function initOptions() {
  optionsGroup = new PIXI.Container();
  optionsGroup.addChild(blackTitleOverlay);
  let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
  buttonBack.scale.set(0.5, 0.5);
  buttonMute = createButton(WIDTH - 250, HEIGHT * 0.5 - 55, muteAudio, optionsGroup, 'mute');
  buttonMute.scale.set(0.5, 0.5);
  buttonFullscreen = createButton(WIDTH - 250, HEIGHT * 0.75 - 55, toggleFullscreen, optionsGroup, 'fullscreen');
  buttonFullscreen.scale.set(0.5, 0.5);
  optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
  g.stage.addChild(optionsGroup);
}

function mainMenu() {
  g.state = menuState;
}

function muteAudio() {
  soundsArray.forEach(function(sound) {
    sound.volume = (sound.volume == 0) ? 0.5 : 0;
  });
}

function toggleFullscreen() {
  if (!isFullscreen) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    isFullscreen = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    isFullscreen = false;
  }
}
