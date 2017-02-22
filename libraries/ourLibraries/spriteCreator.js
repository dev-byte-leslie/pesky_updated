function spriteCreator(stringTexture, width, height) {
  if (typeof stringTexture != 'string') {
    this.stringTexture = String(stringTexture);
  }
  else {
    this.stringTexture = stringTexture;
  }
  this.texture = animalAnimated.filmstrip(stringTexture, width, height);

  this.sprite = new MovieClip(this.texture);

  return this.sprite;
}
