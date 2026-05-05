// eslint.config.mjs
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: ["node_modules/**", "dist/**", "build/**", ".next/**"],
  },

  ...compat.extends("next/core-web-vitals"),

  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/internal-regex": "^@/",
    },
    plugins: {
      js,
      import: importPlugin,
      n: nodePlugin,
      promise: promisePlugin,
      security: securityPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "error",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "@*/*", group: "external", position: "after" },
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "never", // no blank lines between import groups
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^firebase-admin/.+", "^@/"],
        },
      ],
      "import/no-duplicates": "error",

      "n/no-deprecated-api": "warn",

      "promise/always-return": "warn",
      "promise/no-return-wrap": "warn",

      "security/detect-object-injection": "off",

      "no-console": "warn",

      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["single", "multiple", "all", "none"],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
  {
    files: ["eslint.config.*"],
    rules: { "import/no-unresolved": "off" },
  },
]);
