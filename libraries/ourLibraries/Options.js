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
