module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error', // o prettier informa como erro todas a regras que encontrar e não estver de acordo com padrão
    'react/jsx-filename-extension': [ // permite digitar código jsx apenas em arq com extensão JSX
      'warn', // Gero um warning em arquivos que não forem jsx ou js
      { extensions: ['.jsx', '.js'] },
    ],
    'import/prefer-default-export': 'off', // desativa uma regra que obrigado quando tenho apenas um export dentro do arquivo que ele seja um export-default

  },
};
