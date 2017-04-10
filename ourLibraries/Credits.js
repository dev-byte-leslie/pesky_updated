var creditsGroup, credits, credits2, credits3;
function initCredits() {
  creditsGroup = new PIXI.Container();
  buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, creditsGroup, 'back');
  let creditsStyle =
  {
    'title' : { font: '144px Road_Rage', fill: '#ffffff'},
    'title2' : { font: '96px Road_Rage', fill: '#ffffff'},
    'name' : { font: '72px Road_Rage', fill: '#ffffff'},
  };
  // Credits must be broken into smaller sprites because
  // WebGL has a limitation of 8192x8192 size texture for the cache
  credits = new PIXI.MultiStyleText('<title>PESKY\n\n\n</title>' +
    '<title2>UW-Stout\nGDD-325\n\n\n\n</title2>' +
    '<title2>Art\n\n\n\n\n</title2>' +
    '<name>Susan Evans\n\nAllan Seckora\n</name>' +
    '<title2>Programming\n</title2>\n',
    creditsStyle,
    { align: 'center' }
  );
  credits2 = new PIXI.MultiStyleText(
    '<name>\nAlex Hill\n\nDan Hying\n\nLeslie Murphy\n\nThomas Rosik\n</name>' +
    '<title2>\nInstructor\n\n\n\n\n</title2>' +
    '<name>Seth Berrier</name>',
    creditsStyle,
    { align: 'center' }
  );
  credits3 = new PIXI.MultiStyleText(
    '<title2>Music\n\n</title2>' +
    '<name>Tristan Lohengrin</name>',
    creditsStyle,
    { align: 'center' }
  );
  credits.anchor.set(0.5, 0);
  credits.y = HEIGHT + 10;
  credits.x = WIDTH / 2;
  credits2.anchor.set(0.5, 0);
  credits2.x = WIDTH / 2;
  credits2.y = credits.height - HEIGHT;
  credits3.anchor.set(0.5, 0);
  credits3.x = WIDTH / 2;
  credits3.y = credits2.y + credits2.height - 150;
  buttonBack.scale.x = 0.5;
  buttonBack.scale.y = 0.5;
  creditsGroup.addChild(credits);
  creditsGroup.addChild(credits2);
  creditsGroup.addChild(credits3);
  creditsGroup.addChild(buttonBack);
  g.stage.addChild(creditsGroup);
}
