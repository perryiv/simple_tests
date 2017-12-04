module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6
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
  "globals": {
    "Int16Array": true,
    "Int32Array": true,
    "Uint16Array": true,
    "Uint32Array": true,
    "Float32Array": true,
    "Float64Array": true
  }
};
