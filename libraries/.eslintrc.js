module.exports = {
  "env": {
    "browser": true,
  },
  "parserOptions": {
    "ecmaVersion": 6
  },
  "globals": {
    "PIXI": false,
    "createButton": false,
    "Raccoon": false,
    "Skunk": false,
    "Goose": false,
    "WIDTH": false,
    "HEIGHT": false,
    "switchCharacterState": false
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error","single"],
    "semi": ["error","always"],
    "no-console": ["warn", { "allow": ["info", "error"] }]
  }
};
