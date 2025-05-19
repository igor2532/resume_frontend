module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: [
    "vite.config.ts",
    "dist",
    ".eslintrc.cjs",
    "build",
    "pdfTest",
    "liba"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  settings: {
    react: { version: "18.2" },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"]
  },
  plugins: [
    "react-refresh",
    "prettier",
    "@typescript-eslint"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "quotes": "off",
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/prop-types": 0,
    "max-len": ["error", {"code": 100, "ignoreUrls": true}],
    "prettier/prettier": "error"
  },
};
