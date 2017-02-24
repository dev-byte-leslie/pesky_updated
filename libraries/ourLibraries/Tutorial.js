var tutorialGroup = new PIXI.Container();
buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
tutorialGroup.addChild(buttonBack); // this button is reused for credits and tutorial
var tutorial = new PIXI.Text('use arrow keys to move');
tutorialGroup.addChild(tutorial);
g.stage.addChild(tutorialGroup);

function mainMenu() {
  g.state = menuState;
}
