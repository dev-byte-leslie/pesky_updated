var optionsGroup = new PIXI.Container();
let buttonBack = createButton(renderer.width * 0.15, renderer.height * .85, mainMenu, optionsGroup, 'back');
optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
g.stage.addChild(optionsGroup);

function mainMenu() {
  g.state = menuState;
}
