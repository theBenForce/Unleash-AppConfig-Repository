/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: ['sonarjs', 'unicorn'],
  overrides: [
    {
      files: ['*.ts'],
      env: {
        node: true,
      },
      plugins: ['@typescript-eslint', 'sonarjs'],
      extends: ['airbnb-typescript/base', 'plugin:sonarjs/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
      rules: {
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'unicorn/filename-case': ['warn', { case: 'camelCase' }],
        'import/extensions': ['off'],

      },
      overrides: [
        {
          plugins: ['jest'],
          files: ['**/*.spec.ts', '**/*.test.ts'],
          extends: ['plugin:jest/recommended'],
        },
      ],
    },
    {
      files: ['*.js'],
      env: {
        node: true,
      },
      extends: ['airbnb-base'],
    },
  ],
};
