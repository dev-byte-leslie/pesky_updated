//Create the renderer
var renderer = PIXI.autoDetectRenderer(1920, 1080);
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();
var buttonGroup = new PIXI.DisplayObjectContainer(); // Container for all the menu buttons
var creditsGroup = new PIXI.DisplayObjectContainer(); // Container for objects on credits screen
creditsGroup.visible = false;  // Initialize credits to be invisible at first


var buttonBlankSprite = PIXI.Texture.fromImage('images/btn/buttonBlank.png');
var buttonBlankHoverSprite = PIXI.Texture.fromImage('images/btn/buttonBlankHover.png');
var buttonBlankClickSprite = PIXI.Texture.fromImage('images/btn/buttonBlankClick.png');

// Start button and text
var buttonStart = createButton(renderer.width / 2, renderer.width / 2, startGame, buttonBlankSprite);
var buttonCredits = createButton(renderer.width / 4, renderer.width / 4, showCredits);
var buttonBack = createButton(renderer.width / 2, renderer.height / 4, showMainMenu);

// Add buttons to the button container
buttonGroup.addChild(buttonStart);
buttonGroup.addChild(buttonCredits);

// Add objects to credits group container
creditsGroup.addChild(buttonBack);

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
  this.texture = buttonBlankClickSprite;
}
function onButtonUp() {
  this.texture = buttonBlankSprite;
}
function hoverOver() {
  this.texture = buttonBlankHoverSprite;
}
function startGame() {
  buttonGroup.visible = false;
  var gameText = new PIXI.Text("GAME", {font:"100px Georgia", fill:"red"});
  stage.addChild(gameText);
  // TODO make game element container visible
}
function showCredits() {
  buttonGroup.visible = false;
  creditsGroup.visible = true;
}
function showMainMenu() {
  buttonGroup.visible = true;
  creditsGroup.visible = false;
}
// Create a button with text given its text string, x and y coords, and click function
// Returns a container with the button and text inside
function createButton(x, y, clickFunction, buttonSprite) {
  var localGroup = {};
  var button = new PIXI.Sprite(buttonSprite);
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.position.x = x;
  button.position.y = y;
  button.interactive = true;

  button
    .on('mousedown', onButtonDown)
    .on('mouseup', clickFunction)
    .on('mouseupoutside', onButtonUp)
    .on('mouseover', hoverOver)
    .on('mouseout', onButtonUp);

  return button;
}
