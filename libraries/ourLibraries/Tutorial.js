var tutorialGroup = new PIXI.Container();
buttonBack = createButton(renderer.width * 0.15, renderer.height * .85, mainMenu, optionsGroup, 'back');
tutorialGroup.addChild(buttonBack); // this button is reused for credits and tutorial
var tutorial = new PIXI.Text('use arrow keys to move');
tutorialGroup.addChild(tutorial);
g.stage.addChild(tutorialGroup);

function mainMenu() {
  g.state = menuState;
}
