import globals from "globals"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"

export default tseslint.config(
  { ignores: ["dist", "docs", "build", "storybook-static", "node_modules"] },
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
      reactHooks.configs["recommended-latest"]
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
  eslintPluginPrettierRecommended
)
