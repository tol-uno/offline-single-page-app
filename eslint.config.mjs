import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "@eslint/config-helpers";

export default defineConfig([
  { ignores: ["package-lock.json"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, import: importPlugin },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: importPlugin.configs.recommended.rules,
  },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
