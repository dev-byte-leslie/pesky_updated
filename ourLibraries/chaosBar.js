box = g.rectangle(
  widthInPixels,
  heightInPixels,
  "fillColor",
  "strokeColor",
  lineWidth,
  xPosition,
  yPosition
);

//Create Chaos Bar Containier
chaosBar = new Container();
chaosBar.position.set(200, 200);

//Create Background Rectangle
let backBar = g.rectangle(100, 20, "black");
backBar.x = player.sprite.x -160;
backBar.y = 426;
chaosBar.addChild(backBar);

//Create Front Rectangle
let frontBar = g.rectangle(100, 20, "red");
frontBar.x = player.sprite.x -160;
frontBar.y = 426;
chaosBar.addChild(frontBar);

chaosBar.outer = frontBar; //so we can change length as necesary

chaosBar.outer.width = 30;
// //Exmaple on how to change the bar
