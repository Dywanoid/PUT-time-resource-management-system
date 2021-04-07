module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'tsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'import'
  ],
  'rules': {
    'array-callback-return': 1,
    'arrow-body-style': ['error', 'as-needed', { 'requireReturnForObjectLiteral': true }],
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', { 'arrays': 'never', 'objects': 'never' }],
    'comma-style': [
      'error',
      'first',
      {
        'exceptions': {
          'ArrayExpression': true,
          'ObjectExpression': true
        }
      }
    ],
    'consistent-return': ['error', { 'treatUndefinedAsUnspecified': true }],
    'curly': 'error',
    'dot-location': ['error', 'property'],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 1,
    'import/no-named-as-default-member': 1,
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': {
          'const': 3,
          'let': 2,
          'var': 2
        }
      }
    ],
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'linebreak-style': ['error', 'windows'],
    'max-len': [
      'error',
      120,
      {
        'comments': 120,
        'ignoreStrings': false,
        'ignoreTemplateLiterals': false,
        'ignoreTrailingComments': false,
        'ignoreUrls': true
      }
    ],
    'multiline-ternary': ['error', 'always-multiline'],
    'newline-before-return': 'error',
    'no-case-declarations': 'error',
    'no-empty': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    'no-param-reassign': ['error', { 'props': false }],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-restricted-syntax': 'off',
    'no-shadow': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'object-curly-newline': ['error', { 'multiline': true }],
    'operator-linebreak': ['error', 'before'],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'next': '*',
        'prev': ['const', 'let']
      },
      {
        'blankLine': 'any',
        'next': ['const', 'let'],
        'prev': ['const', 'let']
      },
      {
        'blankLine': 'always',
        'next': 'return',
        'prev': '*'
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        'AssignmentExpression': {
          'array': false,
          'object': false
        },
        'VariableDeclarator': {
          'array': false,
          'object': true
        }
      }
    ],
    'quotes': ['error', 'single'],
    'radix': ['error', 'as-needed'],
    'react/destructuring-assignment': ['error', 'always', { 'ignoreClassFields': true }],
    'react/forbid-prop-types': ['error', { 'forbid': ['any', 'array'] }],
    'react/jsx-curly-spacing': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.tsx', '.ts'] }],
    'react/jsx-max-props-per-line': ['error', { 'maximum': 3, 'when': 'multiline' }],
    'react/jsx-one-expression-per-line': [1, { 'allow': 'single-child' }],
    'react/jsx-props-no-spreading': [1, { 'html': 'ignore' }],
    'react/jsx-space-before-closing': 0,
    'react/jsx-tag-spacing': [1, { 'beforeSelfClosing': 'never' }],
    'react/jsx-wrap-multilines': [
      'error',
      {
        'arrow': true,
        'assignment': true,
        'declaration': true,
        'return': true
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'semi': ['error', 'always'],
    'sort-keys': ['error', 'asc', { 'caseSensitive': false, 'natural': true }],
    'sort-vars': ['error', { 'ignoreCase': true }],
    'template-curly-spacing': ['error', 'always'],
    'vars-on-top': 'error'
  }
};
