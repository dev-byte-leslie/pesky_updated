function updateAI() {
  b.hit(player.sprite, people1, false, false, false,
    function(collision, personHit) {
    if (disableMovement) { // if player is attacking
      if (personHit._texture != person1_sick._texture
      && personHit._textures != person1_sick._textures) {
        personHit._texture = person1_sick._texture;
        personHit._textures = person1_sick._textures;
        personHit.vx *= 0.3;
      }
    }
  });
  b.hit(player.sprite, people2, false, false, false,
    function(collision, personHit) {
    if (disableMovement) { // if player is attacking
      if (personHit._texture != person2_sick._texture
      && personHit._textures != person2_sick._textures) {
        personHit._texture = person2_sick._texture;
        personHit._textures = person2_sick._textures;
        personHit.vx *= 0.3;
      }
    }
  });
  b.hit(player.sprite, people3, false, false, false,
    function(collision, personHit) {
    if (disableMovement) { // if player is attacking
      if (personHit._texture != person3_sick._texture
      && personHit._textures != person3_sick._textures) {
        personHit._texture = person3_sick._texture;
        personHit._textures = person3_sick._textures;
        personHit.vx *= 0.3;
      }
    }
  });
  updateAIMovement();
}

function updateAIMovement() {
  people1.forEach(function(person) {
    person.x += person.vx * 60 / fps;
  });
  people2.forEach(function(person) {
    person.x += person.vx * 60 / fps;
  });
  people3.forEach(function(person) {
    person.x += person.vx * 60 / fps;
  });
}
