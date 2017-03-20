//Load the music
sounds.load([
  "music/pinklife.mp3"
]);

sounds.whenLoaded = setup;

function setup() {
  console.log("sounds loaded");

//Create the sounds
  var music = sounds["music/pinklife.mp3"];

  //Make the music loop
  music.loop = true;

  //Set the music volume
  music.volume = 0.7;

  //Capture the keyboard events
  var b = keyboard(66),
      c = keyboard(67),
      d = keyboard(68);
      space = keyboard(32);

  //Control the sounds based on which keys are pressed

  //Play the loaded music sound
  b.press = function() {
    if (!music.playing) {
      music.play();
    }
    console.log("music playing");
  };

  //Pause the music
  c.press = function() {
    music.pause();
    console.log("music paused");
  };

  //Restart the music
  d.press = function() {
    music.restart();
    console.log("music restarted");
  };
}

/*space.press = function(){ jumpSound() };

function jumpSound() {
  soundEffect(
    523.25,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    3,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo: [delay, feedback, filter]
    undefined     //reverb: [duration, decay, reverse?]
  );
}*/

var optionsGroup = new PIXI.Container();
let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
var buttonMute = createButton(WIDTH / 2, HEIGHT * 0.5 - 90, muteAudio, optionsGroup, 'mute');

optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
optionsGroup.addChild(buttonMute);
g.stage.addChild(optionsGroup);

function mainMenu() {
  g.state = menuState;
}

function muteAudio() {
// add later
}
