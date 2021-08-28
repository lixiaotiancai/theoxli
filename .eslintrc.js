module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  extends: [
    'prettier',
  ],
  plugins: [
    "@typescript-eslint"
  ],
  env: {
    "es6": true
  },
  parser: "@typescript-eslint/parser",
};
