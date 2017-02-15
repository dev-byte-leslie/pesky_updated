function aiMovemnt() {
  /*if (aCObject.x < 0) {
    aCObject.x = 1000;
  }

  if (aCObject.x > 1000) {
    aCObject.x = 0;
  }

  if (aCObject.vx == 0) {
    aCObject.vx = 5;
  }*/

  if (aCObject.y > 700) {
    aCObject.y = 700;
  }

//if player is to the right of enemy
  if (aCObject.x < player.sprite.x) {
    aCObject.vx = 3.5;
  }

//if player is to the left of enemy
  if (aCObject.x > player.sprite.x) {
    aCObject.vx = -3.5;
  }

//if player is below enemy
  if (aCObject.y < player.sprite.y) {
    aCObject.vy = 3.5;
  }

//if player is above enemy
  if (aCObject.y > player.sprite.y) {
    aCObject.vy = -3.5;
  }

  //if player is next to enemy
  if (b.hitTestRectangle(aCObject, player.sprite)) {
    aCObject.vy = 0;
    aCObject.vx = 0;
  }
}
