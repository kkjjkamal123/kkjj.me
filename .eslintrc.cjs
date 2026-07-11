module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true, allowExportNames: ['useAnimations'] },
    ],
    // App code (not a typed library) — inline styles & GitHub API shapes make
    // prop-types validation noise rather than signal.
    'react/prop-types': 'off',
    // Apostrophes in human copy ("Let's", "I've") render fine in React.
    'react/no-unescaped-entities': 'off',
  },
  overrides: [
    {
      // Config files run in Node, where `process` is a global.
      files: ['vite.config.js', '*.config.js'],
      env: { node: true },
    },
  ],
}
