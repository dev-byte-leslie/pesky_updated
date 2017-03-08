var tutorialGroup = new PIXI.Container();
buttonBack = createButton($(document).width() / 2, $(document).height() / 2, mainMenu, tutorialGroup, 'back');
var tutorial = new PIXI.Text('use arrow keys to move\n\n\navoid animal control\n\n\nwreak havoc\n\n\n', {font: '50px Arial', fill: 'red'});
tutorialGroup.addChild(tutorial);
tutorialGroup.addChild(buttonBack);
g.stage.addChild(tutorialGroup);

function mainMenu() {
  g.state = menuState;
}
