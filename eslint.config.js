import storybook from "eslint-plugin-storybook"
import globals from "globals"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"

export default tseslint.config(
  { ignores: ["dist", "docs", "build"] },
  {
    extends: [...tseslint.configs.recommended],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  },
  {
    plugins: {
      react
    },
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat["recommended-latest"]
    ],
    files: ["**/*.{js,ts,tsx}"],
    settings: {
      react: {
        version: "19.0"
      }
    }
  },
  {
    plugins: {
      "jsx-a11y": jsxA11y
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules
    },
    files: ["**/*.{js,ts,tsx}"]
  },
  eslintConfigPrettier,
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
      "function-paren-newline": ["error", "multiline-arguments"],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always"
        }
      ]
    }
  },
  eslintPluginPrettierRecommended,
  storybook.configs["flat/recommended"]
)
