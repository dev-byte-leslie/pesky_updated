var creditsGroup = new PIXI.Container();
var buttonBack = createButton($(document).width() / 2, $(document).height() / 2, mainMenu, creditsGroup, 'back');
g.stage.addChild(creditsGroup);

function mainMenu() {
  activeElement = 'mainMenu';
}
