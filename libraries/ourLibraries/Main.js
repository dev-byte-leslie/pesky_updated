var g = hexi(1280, 720, setup);
g.start();

function setup() {
  g.scaleToWindow();
  g.state = menuState;
}
// Game loops dependent on state
function menuState() {
  g.scaleToWindow();
  hideAll();
  mainMenuGroup.visible = true;
}
function gameState() {
  g.scaleToWindow();
  hideAll();
  gameGroup.visible = true;
}
function optionsState() {
  g.scaleToWindow();
  hideAll();
  optionsGroup.visible = true;
}
function creditsState() {
  g.scaleToWindow();
  hideAll();
  creditsGroup.visible = true;
  credits.y -= 2;
}
function tutorialState() {
  g.scaleToWindow();
  hideAll();
  tutorialGroup.visible = true;
}

function switchCharacterState()
{
  g.scaleToWndow();
  hideAll();

}



// Hide all stage elements
function hideAll() {
  for (var i = 0; i < g.stage.children.length; i++) {
    g.stage.getChildAt(i).visible = false;
  }
}
