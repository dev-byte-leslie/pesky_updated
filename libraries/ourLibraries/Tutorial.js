var TutorialGroup = new PIXI.Container();
let buttonBack = createButton($(document).width() / 2, $(document).height() / 2, mainMenu, tutorialGroup, 'back');
var tutorial = new PIXI.Text('use arrow keys to move');
tutorialGroup.addChild(buttonBack); // this button is reused for credits and tutorial
g.stage.addChild(tutorialGroup);

function mainMenu() {
  g.state = menuState;
}
