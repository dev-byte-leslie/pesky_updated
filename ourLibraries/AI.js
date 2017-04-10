function updateAI() {
  for (let i = 1; i <= peopleTypes; i++) {
    b.hit(player.sprite, eval("people"+i), false, false, false,
      function(collision, personHit) {
      if (!personHit.isRunning) {
        if (personHit._texture != eval("person"+i+"_sick._texture")
        && personHit._textures != eval("person"+i+"_sick._textures")) {
          personHit.scale.x *= -1;
          personHit.isRunning = true;
          personHit.vx *= -4;
          personHit.animationSpeed *= 4;
          setTimeout(function() {
            personHit.isRunning = false;
            personHit.vx /= 4;
            personHit.animationSpeed /= 4;
          }, 2000);
        }
      }
      if (disableMovement) { // if player is attacking
        if (personHit._texture != eval("person"+i+"_sick._texture")
        && personHit._textures != eval("person"+i+"_sick._textures")) {
          personHit._texture = eval("person"+i+"_sick._texture");
          personHit._textures = eval("person"+i+"_sick._textures");
          personHit.vx *= 0.3;
        }
      }
    });
  }
  updateAIMovement();
}

function updateAIMovement() {
  for (let i = 1; i <= peopleTypes; i++) {
    eval("people" + i).forEach(function(person) {
      person.x += person.vx * 60 / fps;
    });
  }
}
