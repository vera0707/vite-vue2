const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  parser: 'vue-eslint-parser',
  globals: {
    Nullable: true
  },
  extends: ['plugin:vue/recommended'],
  rules: {}
});
