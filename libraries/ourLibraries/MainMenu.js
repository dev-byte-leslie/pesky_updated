var mainMenuGroup, buttonGroup, tutorialGroup, buttonStart, buttonOptions, buttonCredits;

function startMenu() {
  mainMenuGroup = new PIXI.Container(); /// Parent container for ALL menu items
  buttonGroup = new PIXI.Container(); // Container for all the menu buttons
  tutorialGroup = new PIXI.Container(); // Container for objects on tutorial screen

  buttonStart = createButton(WIDTH / 2, HEIGHT * 0.25 - 90, startGame, buttonGroup, 'start');
  buttonOptions = createButton(WIDTH / 2, HEIGHT * 0.5 - 90, showOptions, buttonGroup, 'options');
  buttonTutorial = createButton(WIDTH / 2, HEIGHT * 0.75 - 90, showTutorial, buttonGroup, 'tutorial');
  buttonCredits = createButton(WIDTH / 2, HEIGHT - 90, showCredits, buttonGroup, 'credits');
  mainMenuGroup.addChild(buttonGroup);
  g.stage.addChild(mainMenuGroup);
}
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
  initGame();
  hideAll();
  gameObjects.visible = true;
  g.state = play;
}
function showCredits() {
  initCredits();
  hideAll();
  creditsGroup.visible = true;
  g.state = creditsState;
}
function showTutorial() {
  initTutorial();
  hideAll();
  tutorialGroup.visible = true;
  g.state = tutorialState;
}
function showOptions() {
  initOptions();
  hideAll();
  optionsGroup.visible = true;
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
