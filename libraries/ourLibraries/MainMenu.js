var mainMenuGroup = new PIXI.Container(); /// Parent container for ALL menu items
var buttonGroup = new PIXI.Container(); // Container for all the menu buttons
var tutorialGroup = new PIXI.Container(); // Container for objects on tutorial screen

var buttonStart = createButton(renderer.width / 2, renderer.height * 0.25 - 90, startGame, buttonGroup, 'start');
var buttonOptions = createButton(renderer.width / 2, renderer.height * 0.5 - 90, showOptions, buttonGroup, 'options');
var buttonTutorial = createButton(renderer.width / 2, renderer.height * 0.75 - 90, showTutorial, buttonGroup, 'tutorial');
var buttonCredits = createButton(renderer.width / 2, renderer.height - 90, showCredits, buttonGroup, 'credits');
mainMenuGroup.addChild(buttonGroup);
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
  g.state = gameState;
}
function showCredits() {
  credits.y = renderer.height + 200;
  g.state = creditsState;
}
function showTutorial() {
  g.state = tutorialState;
}
function showOptions() {
  g.state = optionsState;
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
