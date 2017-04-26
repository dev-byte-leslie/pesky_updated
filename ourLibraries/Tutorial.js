var tutorialGroup, tutorial, tutorialShadow;
function initTutorial() {
  tutorialGroup = new PIXI.Container();
  buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, tutorialGroup, 'back');
  buttonBack.scale.set(0.5, 0.5);
  tutorial = new PIXI.Text(' a - move left\n d - move right\n e - enter houses/hedges' +
    '\n f - attack\n space bar - jump',
    {font: '50px Road_Rage', fill: '#F77A77', padding: 100});
  tutorialShadow = new PIXI.Text(' a - move left\n d - move right\n e - enter houses/hedges' +
    '\n f - attack\n space bar - jump',
    {font: '50px Road_Rage', fill: '#000000', padding: 100});
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
