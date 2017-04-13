var widthInPixels, heightInPixels, fillColor, strokeColor, lineWidth,
xPosition, yPosition, chaosText, topBar, bottomBar, triangleLeft, triangleRight,
triangleColor, topColor, bottomColor;

function initChaosBar()
{
  topColor = '0xFA9B98';
  triangleColor = '0xF8817E';
  bottomColor = '0xF77A77';
  triangleLeft = new PIXI.Graphics();
  triangleRight = new PIXI.Graphics();
  triangleLeft.beginFill(triangleColor);
  triangleLeft.moveTo(0, 0);
  triangleLeft.lineTo(10, 5);
  triangleLeft.lineTo(0, 10);
  triangleLeft.lineTo(0, 0);
  triangleLeft.endFill();
  triangleLeft.width = 1;
  triangleLeft.y = 431;
  triangleRight.beginFill(triangleColor);
  triangleRight.moveTo(0, 0);
  triangleRight.lineTo(-10, 5);
  triangleRight.lineTo(0, 10);
  triangleRight.lineTo(0, 0);
  triangleRight.endFill();
  triangleRight.width = 1;
  triangleRight.y = 431;
  topBar = g.rectangle(0, 5, topColor, topColor, 2, player.sprite.position.x-157, 430);
  bottomBar = g.rectangle(0, 5, bottomColor, bottomColor, 2, player.sprite.position.x-157, 435);
  let box = g.rectangle(
    widthInPixels,
    heightInPixels,
    'fillColor',
    'strokeColor',
    lineWidth,
    xPosition,
    yPosition
  );
  chaosText = new Sprite(TextureCache['../images/HUD/chaosText.png']);
  chaosText.scale.set(0.1, 0.1);
  chaosText.anchor.set(0.5, 0);

  //Create Chaos Bar Containier
  chaosBar.position.set(0 , 0);
  var frontBar, backBar;

  //Create Back Rectangle
  if(player.chaos == false)
  {
    backBar = g.rectangle(100, 8, '0x282828', '0x282828', 2, player.sprite.position.x-157, 431);
    backBar.alpha = 0.5;
    chaosBar.addChild(backBar);
  }

  //Create Front Rectangle
  if(player.chaos == false)
  {
    frontBar = g.rectangle(0, 10, 'red', 'red', 2, player.sprite.position.x-157, 430);
    chaosBar.addChild(frontBar);
    chaosBar.addChild(chaosText);
    chaosBar.addChild(topBar);
    chaosBar.addChild(bottomBar);
    chaosBar.addChild(triangleLeft);
    chaosBar.addChild(triangleRight);
 }

  //so we can change length as necesary
  chaosBar.outer = frontBar;
  chaosBar.inner = backBar;
}
