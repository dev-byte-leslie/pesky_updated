//-----------------------------------------------------Thomas Rosik----------------------------------------------------------------
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  keyCodes.push(keyCode);

  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    if (keyCodes.includes(event.keyCode)) {
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
  };

  //Attach event listeners
  window.addEventListener(
  'keydown', key.downHandler.bind(key), false
  );
  window.addEventListener(
  'keyup', key.upHandler.bind(key), false
  );

  //Return the `key` object
  return key;
}
