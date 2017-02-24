var optionsGroup = new PIXI.Container();
let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
g.stage.addChild(optionsGroup);

function mainMenu() {
  g.state = menuState;
}
