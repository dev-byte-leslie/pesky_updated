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
    buttonGroup.getChildAt(i).scale.x = 0.5;
    buttonGroup.getChildAt(i).scale.y = 0.5;
  }
  titleBackground.width = 1280;
  titleBackground.height = 720;
  titleBackground.position.x = 0;
  titleBackground.position.y = 0;
  title.width = 1280;
  title.height = 720;
  title.position.x = 100;
  title.position.y = 0;
  backgroundGroup.addChild(titleBackground);
  g.stage.addChild(backgroundGroup);
  mainMenuGroup.addChild(title);
  mainMenuGroup.addChild(buttonGroup);
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
  player.sprite._texture = player.spriteArray[8]._texture;
  player.sprite._textures = player.spriteArray[8]._textures;
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
  backgroundGroup.visible = true;
  creditsGroup.visible = true;
  g.state = creditsState;
}
function showTutorial() {
  initTutorial();
  hideAll();
  backgroundGroup.visible = true;
  tutorialGroup.visible = true;
  g.state = tutorialState;
}
function showOptions() {
  initOptions();
  hideAll();
  backgroundGroup.visible = true;
  optionsGroup.visible = true;
  g.state = optionsState;
}
// Create a button with text given its x and y coords, click function, button group, and sprite name
// Returns the button as a PIXI sprite
function createButton(x, y, clickFunction, buttonGroup, spriteName,
  spriteState = 'Blank', hasStates = true) {
  var buttonSprite = PIXI.Texture.fromImage('../images/btn/' + spriteName +
    spriteState + '.png');
  var button = new PIXI.Sprite(buttonSprite);
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.position.x = x;
  button.position.y = y;
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
