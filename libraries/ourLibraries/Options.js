var optionsGroup = new PIXI.Container();
let buttonBack = createButton($(document).width() / 2, $(document).height() / 2, mainMenu, optionsGroup, 'back');
optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
g.stage.addChild(optionsGroup);

function mainMenu() {
  g.state = menuState;
}
