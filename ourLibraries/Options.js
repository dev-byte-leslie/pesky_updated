var gameMusic, menuMusic, jumpSound, aiCloseSound, optionsGroup, soundsArray = [];
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
  let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
  buttonBack.scale.set(0.5, 0.5);
  var buttonMute = createButton(WIDTH / 2, HEIGHT * 0.5 - 90, muteAudio, optionsGroup, 'mute');
  buttonMute.scale.set(0.5, 0.5);

  optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
  optionsGroup.addChild(buttonMute);
  g.stage.addChild(optionsGroup);
}

function mainMenu() {
  g.state = menuState;
}

function muteAudio() {
  soundsArray.forEach(function(sound) {
    sound.volume = (sound.volume == 0) ? 0.5 : 0;
  });
  //menuMusic.volume = (menuMusic.volume == 0) ? 0.5 : 0;
  //gameMusic.volume = (gameMusic.volume == 0) ? 0.5 : 0;
}
