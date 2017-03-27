//Load the music
sounds.load([
  '../sound/music/pinklife.mp3'
]);

sounds.whenLoaded = loadSounds;

function loadSounds() {

//Create the sounds
  var music = sounds['../sound/music/pinklife.mp3'];

  //Make the music loop
  music.loop = true;

  //Set the music volume
  music.volume = 0.7;

  //Capture the keyboard events
  var b = keyboard(66),
    c = keyboard(67),
    d = keyboard(68);

  //Control the sounds based on which keys are pressed

  //Play the loaded music sound
  b.press = function() {
    if (!music.playing) {
      music.play();
    }
    console.log('music playing');
  };

  //Pause the music
  c.press = function() {
    music.pause();
    console.log('music paused');
  };

  //Restart the music
  d.press = function() {
    music.restart();
    console.log('music restarted');
  };
}
var optionsGroup;
function initOptions() {
  optionsGroup = new PIXI.Container();
  let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
  var buttonMute = createButton(WIDTH / 2, HEIGHT * 0.5 - 90, muteAudio, optionsGroup, 'mute');

  optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
  optionsGroup.addChild(buttonMute);
  g.stage.addChild(optionsGroup);
}

function mainMenu() {
  g.state = menuState;
}

function muteAudio() {
// add later
}
