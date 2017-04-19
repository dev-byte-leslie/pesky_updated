var creditsGroup, credits1, credits2, credits3, creditsShadow, creditsShadow2,
  creditsShadow3;
function initCredits() {
  creditsGroup = new PIXI.Container();
  buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, creditsGroup, 'back');
  let creditsStyle =
  {
    'title' : { font: '144px Road_Rage', fill: '#F77A77'},
    'title2' : { font: '96px Road_Rage', fill: '#F77A77'},
    'name' : { font: '72px Road_Rage', fill: '#F77A77'},
  };
  let creditsStyleShadow =
  {
    'title' : { font: '144px Road_Rage', fill: '#000000'},
    'title2' : { font: '96px Road_Rage', fill: '#000000'},
    'name' : { font: '72px Road_Rage', fill: '#000000'},
  };
  // Credits must be broken into smaller sprites because
  // WebGL has a limitation of 8192x8192 size texture for the cache
  credits1 = new PIXI.MultiStyleText('<title>PESKY\n\n\n</title>' +
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
  creditsShadow1 = new PIXI.MultiStyleText('<title>PESKY\n\n\n</title>' +
    '<title2>UW-Stout\nGDD-325\n\n\n\n</title2>' +
    '<title2>Art\n\n\n\n\n</title2>' +
    '<name>Susan Evans\n\nAllan Seckora\n</name>' +
    '<title2>Programming\n</title2>\n',
    creditsStyleShadow,
    { align: 'center' }
  );
  creditsShadow2 = new PIXI.MultiStyleText(
    '<name>\nAlex Hill\n\nDan Hying\n\nLeslie Murphy\n\nThomas Rosik\n</name>' +
    '<title2>\nInstructor\n\n\n\n\n</title2>' +
    '<name>Seth Berrier</name>',
    creditsStyleShadow,
    { align: 'center' }
  );
  creditsShadow3 = new PIXI.MultiStyleText(
    '<title2>Music\n\n</title2>' +
    '<name>Tristan Lohengrin</name>',
    creditsStyleShadow,
    { align: 'center' }
  );
  credits1.anchor.set(0.5, 0);
  credits1.y = HEIGHT + 10;
  credits2.anchor.set(0.5, 0);
  credits2.y = credits1.height - HEIGHT;
  credits3.anchor.set(0.5, 0);
  credits3.y = credits2.y + credits2.height - 150;
  for (let i = 1; i <= 3; i++) {
    eval('credits'+i).x = WIDTH / 2;
    eval('creditsShadow'+i).anchor.set(0.5, 0);
    eval('creditsShadow'+i).x = WIDTH / 2 + 5;
    eval('creditsShadow'+i).y = eval('credits'+i).y + 5;
  }
  buttonBack.scale.x = 0.5;
  buttonBack.scale.y = 0.5;
  creditsGroup.addChild(creditsShadow1);
  creditsGroup.addChild(creditsShadow2);
  creditsGroup.addChild(creditsShadow3);
  creditsGroup.addChild(credits1);
  creditsGroup.addChild(credits2);
  creditsGroup.addChild(credits3);
  creditsGroup.addChild(buttonBack);
  g.stage.addChild(creditsGroup);
}
