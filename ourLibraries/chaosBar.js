var widthInPixels, heightInPixels, fillColor, strokeColor, lineWidth, xPosition, yPosition;

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
  var frontBar, backBar;

  //Create Back Rectangle
  if(player.chaos == false)
  {
    backBar = g.rectangle(100, 10, 'white', 'white', 2, player.sprite.position.x -157, 430 );
    chaosBar.addChild(backBar);
  }

  //Create Front Rectangle
  if(player.chaos == false)
  {
    frontBar = g.rectangle(1, 10, 'red', 'red', 2, player.sprite.position.x -157, 430 );
    chaosBar.addChild(frontBar);
 }

  chaosBar.outer = frontBar; //so we can change length as necesary
  chaosBar.inner = backBar;

  //chaosBar.outer.width = 30;
  // //Exmaple on how to change the bar

}
