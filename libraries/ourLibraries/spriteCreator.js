function spriteCreator(stringTexture) {
  if (typeof stringTexture != 'string') {
    this.stringTexture = String(stringTexture);
  }
  else {
    this.stringTexture = stringTexture;
  }
  this.texture = TextureCache[this.stringTexture];

  this.sprite = new Sprite(this.texture);

  return this.sprite;
}
