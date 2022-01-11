var chaosText, topBar, bottomBar, triangleLeft, triangleRight,
triangleColor, topColor, bottomColor, frontBar, backBar;

function initChaosBar() {
  // Hexadecimal colors for the chaos bar
  topColor = '0xFA9B98';
  triangleColor = '0xF8817E';
  bottomColor = '0xF77A77';
  // These triangles are on the left and right sides of the bar and give it a beveled look
  triangleLeft = new PIXI.Graphics();
  triangleRight = new PIXI.Graphics();
  // Drawing left triangle starting at the top
  triangleLeft.beginFill(triangleColor);
  triangleLeft.moveTo(0, 0);
  triangleLeft.lineTo(10, 5);
  triangleLeft.lineTo(0, 10);
  triangleLeft.lineTo(0, 0);
  triangleLeft.endFill();
  // Triangle is drawn 10 pixels wide so proportions are correct when scaled up
  triangleLeft.width = 1;
  triangleLeft.y = 431;
  // Drawing right triangle
  triangleRight.beginFill(triangleColor);
  triangleRight.moveTo(0, 0);
  triangleRight.lineTo(-10, 5);
  triangleRight.lineTo(0, 10);
  triangleRight.lineTo(0, 0);
  triangleRight.endFill();
  triangleRight.width = 1;
  triangleRight.y = 431;
  // Top and bottom bars are rectangles of different shades that add to bevel
  topBar = g.rectangle(0, 5, topColor, topColor, 2, player.sprite.position.x-157, 430);
  bottomBar = g.rectangle(0, 5, bottomColor, bottomColor, 2, player.sprite.position.x-157, 435);
  chaosText = new Sprite(TextureCache['./images/HUD/chaosText.png']);
  chaosText.scale.set(0.1, 0.1);
  chaosText.anchor.set(0.5, 0);
  chaosBar.position.set(0, 0);

  //Create Front and back Rectangles and add to container
  if (!player.chaos) {
    backBar = g.rectangle(98, 8, '0x282828', '0x282828', 2, player.sprite.position.x-157, 431);
    backBar.alpha = 0.5;
    frontBar = g.rectangle(0, 10, 'red', 'red', 2, player.sprite.position.x-157, 430);
    chaosBar.addChild(backBar);
    chaosBar.addChild(frontBar);
    chaosBar.addChild(chaosText);
    chaosBar.addChild(topBar);
    chaosBar.addChild(bottomBar);
    chaosBar.addChild(triangleLeft);
    chaosBar.addChild(triangleRight);
  }
  chaosBar.outer = frontBar;
  chaosBar.inner = backBar;
}
