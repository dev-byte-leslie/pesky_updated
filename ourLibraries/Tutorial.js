var tutorialGroup, tutorial;
function initTutorial() {
  tutorialGroup = new PIXI.Container();
  buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, tutorialGroup, 'back');
  tutorial = new PIXI.Text('use arrow keys to move\n\n\n\navoid animal control\n\n\nwreak havoc\n\n\n', {font: '50px Arial', fill: 'red'});

  var keys = PIXI.Texture.fromImage('../images/keys.png');
  var keysSprite = new PIXI.Sprite(keys);
  keysSprite.position.x = WIDTH * 0.45;
  keysSprite.position.y = HEIGHT * 0.01;

  var animalcontrol = PIXI.Texture.fromImage('../images/AiSprites/animal_control.png');
  var animalcontrolSprite = new PIXI.Sprite(animalcontrol);
  animalcontrolSprite.position.x = WIDTH * 0.45;
  animalcontrolSprite.position.y = HEIGHT * 0.4;

  tutorialGroup.addChild(tutorial);
  tutorialGroup.addChild(buttonBack);
  tutorialGroup.addChild(keysSprite);
  tutorialGroup.addChild(animalcontrolSprite);
  g.stage.addChild(tutorialGroup);
}
function mainMenu() {
  g.state = menuState;
}
