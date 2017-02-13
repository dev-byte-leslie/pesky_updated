function aiMovemnt() {
  if (aCObject.x < 0) {
    aCObject.x = 1000;
  }

  if (aCObject.x > 1000) {
    aCObject.x = 0;
  }

  if (aCObject.vx == 0) {
    aCObject.vx = 5;
  }
}
