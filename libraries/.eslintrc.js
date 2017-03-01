module.exports = {
  "env": {
    "browser": true,
  },
  "parserOptions": {
    "ecmaVersion": 6
  },
  "globals": {
    "PIXI": false
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error","single"],
    "semi": ["error","always"],
    "no-console": ["warn", { "allow": ["info", "error"] }]
  }
};
