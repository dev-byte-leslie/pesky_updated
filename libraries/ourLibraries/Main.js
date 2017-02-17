var activeElement = 'mainMenu';
var g = hexi(1280, 720, setup);

g.start();

function setup() {
  g.scaleToWindow();
  g.state = play;
}
// Game loop
function play() {
  animate();
  g.scaleToWindow();

  // Check game states
  mainMenuGroup.visible = (activeElement == 'mainMenu');
  creditsGroup.visible = (activeElement == 'credits');
  if (creditsGroup.visible) { // Scroll credits if they're visible
    credits.y -= 2;
  }
  //gameGroup.visible = (activeElement == 'game');
  optionsGroup.visible = (activeElement == 'options');
}

function animate() {
  requestAnimationFrame(animate);
}
