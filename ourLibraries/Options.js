var gameMusic, menuMusic, jumpSound, aiCloseSound, buttonMute, buttonFullscreen,
  optionsGroup, soundsArray = [], isFullscreen = false;
// load the music and sounds
sounds.load([
  "../sound/music/GameMusic.wav",
  "../sound/music/MenuMusic.wav",
  "../sound/music/Jump.wav",
  "../sound/music/PoliceScanner.wav"
]);

sounds.whenLoaded = loadSounds;

function loadSounds() {
gameMusic = sounds["../sound/music/GameMusic.wav"];
menuMusic = sounds["../sound/music/MenuMusic.wav"];
jumpSound = sounds["../sound/music/Jump.wav"];
aiCloseSound = sounds["../sound/music/PoliceScanner.wav"];

soundsArray.push(gameMusic);
soundsArray.push(menuMusic);
soundsArray.push(jumpSound);
soundsArray.push(aiCloseSound);

  jumpSound.volume = 0.5;
  menuMusic.volume = 0.5;
  menuMusic.loop = true;

  gameMusic.volume = 0.5;
  gameMusic.loop = true;
  if (g.state = menuState) {
    menuMusic.play();
  }
}
function initOptions() {
  optionsGroup = new PIXI.Container();
  optionsGroup.addChild(blackTitleOverlay);
  let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
  buttonBack.scale.set(0.5, 0.5);
  buttonMute = createButton(WIDTH - 250, HEIGHT * 0.5 - 90, muteAudio, optionsGroup, 'mute');
  buttonMute.scale.set(0.5, 0.5);
  buttonFullscreen = createButton(WIDTH - 250, HEIGHT * 0.75 - 90, toggleFullscreen, optionsGroup, 'fullscreen');
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
  } else {
    if (document.documentElement.exitFullscreen) {
      document.documentElement.exitFullscreen();
    } else if (document.documentElement.webkitExitFullscreen) {
      document.documentElement.webkitExitFullscreen();
    } else if (document.documentElement.mozCancelFullScreen) {
      document.documentElement.mozCancelFullScreen();
    } else if (document.documentElement.msExitFullscreen) {
      document.documentElement.msExitFullscreen();
    }
  }
}
