var mainMenuGroup = new PIXI.Container(); /// Parent container for ALL menu items
var buttonGroup = new PIXI.Container(); // Container for all the menu buttons
var creditsGroup = new PIXI.Container(); // Container for objects on credits screen
var tutorialGroup = new PIXI.Container(); // Container for objects on tutorial screen
// creditsGroup.visible = false;  // Initialize credits to be invisible at first

var buttonStart = createButton($(document).width() / 2, $(document).height() / 16, startGame, buttonGroup, 'start');
var buttonOptions = createButton($(document).width() / 2, $(document).height() / 4, showOptions, buttonGroup, 'options');
var buttonTutorial = createButton($(document).width() / 2, $(document).height() / 2.25, showTutorial, buttonGroup, 'tutorial');
var buttonCredits = createButton($(document).width() / 2, $(document).height() / 1.55, showCredits, buttonGroup, 'credits');
mainMenuGroup.addChild(buttonGroup);
mainMenuGroup.addChild(creditsGroup);
mainMenuGroup.addChild(tutorialGroup);
g.stage.addChild(mainMenuGroup);
// Button interaction functions
function onButtonDown() {
  this.texture = PIXI.Texture.fromImage('../../images/btn/' + this.spriteName + 'Click.png');
}
function onButtonUp() {
  this.texture = PIXI.Texture.fromImage('../../images/btn/' + this.spriteName + 'Blank.png');
}
function hoverOver() {
  this.texture = PIXI.Texture.fromImage('../../images/btn/' + this.spriteName + 'Hover.png');
}
function startGame() {
  //buttonGroup.visible = false;
  activeElement = 'mainGame';
}
function showCredits() {
  activeElement = 'credits';
 // buttonGroup.visible = false;
 // creditsGroup.visible = true;
}
function showTutorial() {
  activeElement = 'tutorial';
}
function showOptions() {
  activeElement = 'options';
}
// Create a button with text given its x and y coords, click function, button group, and sprite name
// Returns the button as a PIXI sprite
function createButton(x, y, clickFunction, buttonGroup, spriteName) {
  var buttonSprite = PIXI.Texture.fromImage('../../images/btn/' + spriteName + 'Blank.png');
  var button = new PIXI.Sprite(buttonSprite);
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.position.x = x;
  button.position.y = y;
  button.interactive = true;
  button.spriteName = spriteName;

  button
    .on('mousedown', onButtonDown)
    .on('click', clickFunction)
    .on('mouseupoutside', onButtonUp)
    .on('mouseover', hoverOver)
    .on('mouseout', onButtonUp);

  buttonGroup.addChild(button);

  return button;
}
