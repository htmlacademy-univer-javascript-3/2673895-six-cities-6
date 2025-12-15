import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      'eslint.config.js',
      'eslint.config.ts'
    ],
  },
  
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    extends: [js.configs.recommended],
  },
  
  ...tseslint.configs.recommendedTypeChecked,
  
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect', 
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
);