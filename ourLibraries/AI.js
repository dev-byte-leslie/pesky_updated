function updateAI() {
  for (let i = 1; i <= peopleTypes; i++) {
    eval('people'+i).forEach(function(person) {
      person.y = 525;
      if (this != person) {
        b.hit(this, eval('people'+i)), true, false, false, function() {
          this.vx = 0;
        };
      }
    });
    b.hit(player.sprite, eval("people"+i), false, false, false,
      function(collision, personHit) {
      if (!personHit.isRunning) {
        if (isAttacking) { // if player is attacking
          if (personHit._texture != eval("person"+i+"_sick._texture")
          && personHit._textures != eval("person"+i+"_sick._textures")) {
            personHit._texture = eval("person"+i+"_sick._texture");
            personHit._textures = eval("person"+i+"_sick._textures");
            personHit.vx = personHit.scale.x * 0.3;
            personHit.animationSpeed = 0.08;
            chaosToAdd += 10;
            pointsToAdd += 10;
            updatePoints();
          }
        }
        if (personHit._texture != eval("person"+i+"_sick._texture")
        && personHit._textures != eval("person"+i+"_sick._textures")) {
          personHit.scale.x *= -1;
          personHit.vx *= -1.5;
          personHit.isRunning = true;
          personHit.animationSpeed *= 1.5;
          setTimeout(function() {
            personHit.isRunning = false;
            if (personHit._texture != eval("person"+i+"_sick._texture")
            && personHit._textures != eval("person"+i+"_sick._textures")) {
              personHit.vx = personHit.scale.x;
              personHit.animationSpeed = 0.08;
            }
          }, 2000);
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
      if (person.x + person.vx * 60 / fps > 12000) {
        person.vx = -1;
        person.scale.x = -1;
      } else if (person.x + person.vx * 60 / fps < -11800) {
        person.vx = 1;
        person.scale.x = 1;
      }
    });
  }
}
