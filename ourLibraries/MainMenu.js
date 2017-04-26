var mainMenuGroup, buttonGroup, backgroundGroup,
tutorialGroup, buttonStart, buttonOptions, buttonCredits, newLevelVal = false;

function startMenu() {
  mainMenuGroup = new PIXI.Container(); /// Parent container for ALL menu items
  buttonGroup = new PIXI.Container(); // Container for all the menu buttons
  tutorialGroup = new PIXI.Container(); // Container for objects on tutorial screen
  backgroundGroup = new PIXI.Container();

  buttonStart = createButton(WIDTH * .8, HEIGHT * 0.25 - 90, startGame, buttonGroup, 'start');
  buttonOptions = createButton(WIDTH * .8, HEIGHT * 0.5 - 90, showOptions, buttonGroup, 'options');
  buttonTutorial = createButton(WIDTH * .8, HEIGHT * 0.75 - 90, showTutorial, buttonGroup, 'tutorial');
  buttonCredits = createButton(WIDTH * .8, HEIGHT - 90, showCredits, buttonGroup, 'credits');

  for (let i = 0; i < buttonGroup.children.length; i++) {
    buttonGroup.getChildAt(i).scale.set(0.5, 0.5);
  }
  titleBackground.width = WIDTH;
  titleBackground.height = HEIGHT;
  titleBackground.position.x = 0;
  titleBackground.position.y = 0;
  title.width = WIDTH;
  title.height = HEIGHT;
  blackTitleOverlay.width = WIDTH;
  blackTitleOverlay.height = HEIGHT;
  title.position.set(100, 0);
  backgroundGroup.addChild(titleBackground);
  mainMenuGroup.addChild(blackTitleOverlay);
  mainMenuGroup.addChild(title);
  mainMenuGroup.addChild(buttonGroup);
  g.stage.addChild(backgroundGroup);
  g.stage.addChild(mainMenuGroup);
}
// Button interaction functions
function onButtonDown() {
  this.texture = PIXI.Texture.fromImage('../images/btn/' + this.spriteName + 'Click.png');
}
function onButtonUp() {
  this.texture = PIXI.Texture.fromImage('../images/btn/' + this.spriteName + 'Blank.png');
}
function hoverOver() {
  this.texture = PIXI.Texture.fromImage('../images/btn/' + this.spriteName + 'Hover.png');
}
function startGame() {
  newLevelVal = true;
  initGame();
  hideAll();
  gameObjects.visible = true;
  player.sprite.y = hedgeLocY + 150;
  player.sprite.x = hedgeLocX2 + 157;
  player.setTextures(8);
  player.sprite.play();
  player.sprite.x = hedgeLocX2 + 157;
  player.holdX = hedgeLocX2 + 157;
  disableAttacking = true;
  let c = new camera();
  c.updateCamera();
  g.state = moveFromHedgeState;
  newLevelVal = false;
}
function showCredits() {
  initCredits();
  hideAll();
  backgroundGroup.visible = creditsGroup.visible = true;
  g.state = creditsState;
}
function showTutorial() {
  initTutorial();
  hideAll();
  backgroundGroup.visible = tutorialGroup.visible = true;
  g.state = tutorialState;
}
function showOptions() {
  initOptions();
  hideAll();
  backgroundGroup.visible = optionsGroup.visible = true;
  g.state = optionsState;
}
// Create a button with text given its x and y coords, click function, button group, and sprite name
// Returns the button as a PIXI sprite
function createButton(x, y, clickFunction, buttonGroup, spriteName,
  spriteState = 'Blank', hasStates = true) {
  var buttonSprite = PIXI.Texture.fromImage('../images/btn/' + spriteName +
    spriteState + '.png');
  var button = new PIXI.Sprite(buttonSprite);
  button.anchor.set(0.5, 0.5);
  button.position.set(x, y);
  button.interactive = true;
  button.spriteName = spriteName;

  if (hasStates) {
    button
      .on('mousedown', onButtonDown)
      .on('click', clickFunction)
      .on('mouseupoutside', onButtonUp)
      .on('mouseover', hoverOver)
      .on('mouseout', onButtonUp);
  }
  buttonGroup.addChild(button);

  return button;
}
