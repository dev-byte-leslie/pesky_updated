//---------------------------------------------------------Thomas Rosik---------------------------------------------------------------
function aiMovemnt() {
  if (aCObject.y > 700) {
    aCObject.y = 700;
  }
  if (Math.abs(aCObject.x - player.sprite.x) <=  300 && Math.abs(aCObject.y - player.sprite.y) <= 300) {
  //if player is to the right of enemy
    if (aCObject.x < player.sprite.x) {
      aCObject.vx = 3.5;
      aCObject.scale.x = 1;
      aCObject.play();
    }

//if player is to the left of enemy
    if (aCObject.x > player.sprite.x) {
      aCObject.vx = -3.5;
      aCObject.scale.x = -1;
      aCObject.play();
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
      aCObject.gotoAndStop(0);
      aCObject.vy = 0;
      aCObject.vx = 0;
    }
  }

  //stops enemy movement if player is too far away
  if (Math.abs(aCObject.x - player.sprite.x) >  300 || Math.abs(aCObject.y - player.sprite.y) > 300) {
    aCObject.gotoAndStop(0);
    aCObject.vx = 0;
    aCObject.vy = 0;
  }
}
