module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "rules": {
    "indent": [ "error", 2, { "SwitchCase": 1 } ],
    "linebreak-style": [ "error", "unix" ],
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ],
    "no-console": "off",
    "no-unused-vars": [ "error", { "args": "none" } ]
  },
};
