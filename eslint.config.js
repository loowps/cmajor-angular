const js = require('@eslint/js');
const ts = require('typescript-eslint');
const ng = require('angular-eslint');

module.exports = ts.config(
  {
    files: ['**/*.ts'],
    extends: [
      // Apply the recommended core rules
      js.configs.recommended,
      // Apply the recommended TypeScript rules
      ...ts.configs.recommended,
      // Optionally apply stylistic rules from typescript-eslint that improve code consistency
      ...ts.configs.stylistic,
      // Apply the recommended Angular rules
      ...ng.configs.tsRecommended,
    ],
    processor: ng.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'cmaj',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'cmaj',
          style: 'kebab-case',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*'],
        },
      ],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...ng.configs.templateRecommended],
    rules: {},
  },
);
