var tutorialGroup, tutorial, tutorialShadow;
function initTutorial() {
  tutorialGroup = new PIXI.Container();
  buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, tutorialGroup, 'back');
  buttonBack.scale.set(0.5, 0.5);
  tutorial = new PIXI.Text('a - move left\nd - move right\ne - enter houses/hedges' +
    '\nf - attack\nspace bar - jump\nn - change street',
    {font: '50px Road_Rage', fill: '#F77A77'});
  tutorialShadow = new PIXI.Text('a - move left\nd - move right\ne - enter houses/hedges' +
    '\nf - attack\nspace bar - jump\nn - change street',
    {font: '50px Road_Rage', fill: '#000000'});
  tutorial.x += 50;
  tutorialShadow.x += 55;
  tutorialShadow.y += 5;

  tutorialGroup.addChild(tutorialShadow);
  tutorialGroup.addChild(tutorial);
  tutorialGroup.addChild(buttonBack);
  g.stage.addChild(tutorialGroup);
}
function mainMenu() {
  g.state = menuState;
}
