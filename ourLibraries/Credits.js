var creditsGroup, credits;
function initCredits() {
  creditsGroup = new PIXI.Container();
  buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, creditsGroup, 'back');
  credits = new PIXI.MultiStyleText('<title>PESKY\n\n\n</title>' +
    '<title2>UW-Stout\nGDD-325\n\n\n\n</title2>' +
    '<title2>Art\n\n\n\n\n</title2>' +
    '<name>Susan Evans\n\nAllan Seckora\n</name>' +
    '<title2>Programming\n\n\n\n\n\n\n</title2>\n' +
    '<name>Alex Hill\n\nDan Hying\n\nLeslie Murphy\n\nThomas Rosik\n</name>' +
    '<name>\n\n\n\nInstructor</name>\n\n' +
    '<name>Seth Berrier</name>',
  {
    'title' : { font: '144px Road_Rage', fill: '#ffffff' },
    'title2' : { font: '96px Road_Rage', fill: '#ffffff' },
    'name' : { font: '72px Road_Rage', fill: '#ffffff' }
  },
  {
    lineJoin: 'round', // Set the lineJoin to round instead of 'miter'
    align: 'center',
  }
);
  credits.anchor.x = 0.5;
  credits.anchor.y = 0.5;
  credits.y = HEIGHT + credits.height / 2 + 10;
  credits.x = WIDTH / 2;
  buttonBack.scale.x = 0.5;
  buttonBack.scale.y = 0.5;
  creditsGroup.addChild(credits);
  creditsGroup.addChild(buttonBack);
  g.stage.addChild(creditsGroup);
}
