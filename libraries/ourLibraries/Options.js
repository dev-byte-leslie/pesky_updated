var optionsGroup = new PIXI.Container();
var buttonBack = createButton($(document).width() / 2, $(document).height() / 2, mainMenu, optionsGroup, 'back');
g.stage.addChild(optionsGroup);

function mainMenu() {
  activeElement = 'mainMenu';
}
