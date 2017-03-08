var tutorialGroup = new PIXI.Container();
buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
var tutorial = new PIXI.Text('use arrow keys to move\n\n\navoid animal control\n\n\nwreak havoc\n\n\n', {font: '50px Arial', fill: 'red'});
var keys = PIXI.Texture.fromImage('../../images/keys.png');
var keysSprite = new PIXI.Sprite(keys);
keysSprite.position.x = WIDTH/2;
keysSprite.position.y = HEIGHT * .01;
tutorialGroup.addChild(tutorial);
tutorialGroup.addChild(buttonBack);
tutorialGroup.addChild(keysSprite);
g.stage.addChild(tutorialGroup);

function mainMenu() {
  g.state = menuState;
}
