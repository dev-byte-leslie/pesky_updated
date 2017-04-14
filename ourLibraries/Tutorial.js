var tutorialGroup, tutorial;
function initTutorial() {
  tutorialGroup = new PIXI.Container();
  buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, tutorialGroup, 'back');
  buttonBack.scale.x = 0.5;
  buttonBack.scale.y = 0.5;
  tutorial = new PIXI.Text('a - move left\nd - move right\ne - enter houses/hedges\nf - attack\nspace bar - jump\nn - change street', {font: '50px Road_Rage', fill: '#F77A77'});
  tutorial.x += 50;

  tutorialGroup.addChild(tutorial);
  tutorialGroup.addChild(buttonBack);
  g.stage.addChild(tutorialGroup);
}
function mainMenu() {
  g.state = menuState;
}

// wasd movement
// n end street
// e enter houses/hedges
