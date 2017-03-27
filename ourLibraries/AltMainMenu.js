//Create the renderer
var renderer = PIXI.autoDetectRenderer(1920, 1080);
renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

// Create a container object called the `stage`
var stage = new PIXI.Container();
var buttonGroup = new PIXI.DisplayObjectContainer(); // Container for all the menu buttons
var creditsGroup = new PIXI.DisplayObjectContainer(); // Container for objects on credits screen
creditsGroup.visible = false;  // Initialize credits to be invisible at first

// Buttons
var buttonStart = createButton(renderer.width / 2, renderer.height / 16, startGame, buttonGroup, 'start');
var buttonOptions = createButton(renderer.width / 2, renderer.height / 4, showOptions, buttonGroup, 'options');
var buttonTutorial = createButton(renderer.width / 2, renderer.height / 2, showTutorial, buttonGroup, 'tutorial');
var buttonCredits = createButton(renderer.width / 4, renderer.height / 2, showCredits, buttonGroup, 'credits');


var buttonBack = createButton(renderer.width / 2, renderer.height / 2, showMainMenu, creditsGroup, 'back');

// Add button container to the stage for display
stage.addChild(buttonGroup);
stage.addChild(creditsGroup);

animate();

function animate() {
    // Render the stage
  renderer.resize(window.innerWidth, window.innerHeight);
  renderer.render(stage);
  requestAnimationFrame(animate);
}

// Button interaction functions
function onButtonDown() {
  this.texture = PIXI.Texture.fromImage('images/btn/' + this.spriteName + 'Click.png');
}
function onButtonUp() {
  this.texture = PIXI.Texture.fromImage('images/btn/' + this.spriteName + 'Blank.png');
}
function hoverOver() {
  this.texture = PIXI.Texture.fromImage('images/btn/' + this.spriteName + 'Hover.png');
}
function startGame() {
  buttonGroup.visible = false;
  var gameText = new PIXI.Text('THIS IS THE GAME', {font:'100px Georgia', fill:'red'});
  stage.addChild(gameText);
  // TODO make game element container visible
}
function showCredits() {
  buttonGroup.visible = false;
  creditsGroup.visible = true;
}
function showTutorial() {
  buttonGroup.visible = false;
  creditsGroup.visible = true;
}
function showOptions() {
  buttonGroup.visible = false;
  creditsGroup.visible = true;
}
function showMainMenu() {
  buttonGroup.visible = true;
  creditsGroup.visible = false;
}
// Create a button with text given its x and y coords, click function, button group, and sprite name
// Returns the button as a PIXI sprite
function createButton(x, y, clickFunction, buttonGroup, spriteName) {
  var buttonSprite = PIXI.Texture.fromImage('images/btn/' + spriteName + 'Blank.png');
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
