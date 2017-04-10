var widthInPixels, heightInPixels, fillColor, strokeColor, lineWidth, xPosition, yPosition

function initChaosBar()
{
  let box = g.rectangle(
    widthInPixels,
    heightInPixels,
    'fillColor',
    'strokeColor',
    lineWidth,
    xPosition,
    yPosition
  );

  //Create Chaos Bar Containier
  chaosBar.position.set(0 , 0);
  var frontBar, backBar

  //Create Back Rectangle
  if(player)
  {
    backBar = g.rectangle(100, 20, 'white', 'white', 5, player.sprite.position.x -160, 426 );
    chaosBar.addChild(backBar);
    print("in back bar")
  }

  //Create Front Rectangle
  if(player)
  {
    frontBar = g.rectangle(80, 20, 'red', 'red', 5, player.sprite.position.x -160, 426 );
    chaosBar.addChild(frontBar);
    print("in front bar")
  }

  chaosBar.outer = frontBar; //so we can change length as necesary

  //chaosBar.outer.width = 30;
  // //Exmaple on how to change the bar

}
