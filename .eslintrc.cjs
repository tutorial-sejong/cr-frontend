module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  "rules": {
    "@typescript-eslint/naming-convention": [
      "warn",
      // 변수명
      {
        "selector": "variable",
        "format": ["camelCase", "PascalCase"]
      },
      // 함수명
      {
        "selector": "function",
        "format": ["camelCase", "PascalCase"]
      },
    ],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-duplicate-imports": "error",
    "no-console": ["warn", { "allow": ["warn", "error", "info"] }],
    "no-unused-vars": "off",
    "no-multiple-empty-lines": "error"
  },
}
