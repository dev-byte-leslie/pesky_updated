var activeElement = "mainMenu";
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
  if (activeElement != "mainMenu") {
    mainMenuGroup.visible = false;
  }
  if (activeElement == "credits") {

  }
  if (activeElement == "mainGame");
}

function animate() {
  requestAnimationFrame(animate);
}
