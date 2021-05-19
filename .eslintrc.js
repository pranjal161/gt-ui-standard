module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    settings: {
        react: {
            version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended' // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    plugins: [
        'filenames',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-tsdoc',
        'eslint-plugin-jsdoc'
    ],
    'rules': {
        '@typescript-eslint/ban-types': ['error',
            {
                'types': {
                    'String': false,
                    'Boolean': false,
                    'Number': false,
                    'Symbol': false,
                    '{}': false,
                    'Object': false,
                    'Function': false,
                },
                'extendDefaults': true
            }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'accessor-pairs': 'error',  
        'array-bracket-newline': 'off',
        'array-bracket-spacing': 'off',
        'array-callback-return': 'error',
        'array-element-newline': 'off',
        'arrow-body-style': 'error',
        'arrow-parens': 'error',
        'arrow-spacing': 'error',
        'block-scoped-var': 'off',
        'block-spacing': 'error',
        'brace-style': [
            'error', 
            'stroustrup'
        ],
        'callback-return': 'error',
        'camelcase': 'off',
        'capitalized-comments': 'off',
        'class-methods-use-this': 'error',
        'comma-dangle': 'off',
        'comma-spacing': 'off',
        'comma-style': [
            'error',
            'last'
        ],
        'complexity': 'off',
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'consistent-return': 'off',
        'consistent-this': 'off',
        'curly': 'off',
        'default-case': 'off',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': 'off',
        'eol-last': 'off',
        'eqeqeq': 'off',
        'filenames/match-regex': [2, '(^[A-Z]+)|^((?!overrides.ts).)*$', true],
        'filenames/match-exported': [2, null, '^(index.tsx)$'],
        'func-call-spacing': 'off',
        'func-name-matching': 'error',
        'func-names': 'off',
        'func-style': 'off',
        'function-paren-newline': 'off',
        'generator-star-spacing': 'error',
        'global-require': 'error',
        'guard-for-in': 'off',
        'handle-callback-err': 'error',
        'id-blacklist': 'error',
        'id-length': 'off',
        'id-match': 'error',
        'implicit-arrow-linebreak': 'error',
        'indent': [
            'error', 4, 
            { 
                'SwitchCase': 1
            }
        ],
        'indent-legacy': 'off',
        'init-declarations': 'off',
        'jsx-quotes': [
            'error', 
            'prefer-double'
        ],
        'key-spacing': 'off',
        'keyword-spacing': 'off',
        'line-comment-position': 'off',
        'linebreak-style': 'off',
        'lines-around-comment': [
            'error', 
            { 
                'beforeBlockComment': true 
            }
        ],
        'lines-around-directive': 'error',
        'lines-between-class-members': [
            'error', 
            'always'
        ],
        'max-classes-per-file': 'error',
        'max-depth': 'off',
        'max-len': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-nested-callbacks': 'error',
        'max-params': 'off',
        'max-statements': 'off',
        'max-statements-per-line': 'off',
        'multiline-comment-style': 'off',
        'new-parens': 'error',
        'newline-after-var': 'off',
        'newline-before-return': 'error',
        'newline-per-chained-call': 'off',
        'no-alert': 'off',
        'no-array-constructor': 'off',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'off',
        'no-buffer-constructor': 'error',
        'no-caller': 'error',
        'no-catch-shadow': 'error',
        'no-confusing-arrow': 'error',
        'no-continue': 'off',
        'no-div-regex': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'off',
        'no-empty-function': 'off',
        'no-eq-null': 'off',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'off',
        'no-extra-parens': 'off',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': [
            'error',
            {
                'boolean': false,
                'number': false,
                'string': false
            }
        ],
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'off',
        'no-inner-declarations': [
            'error',
            'functions'
        ],
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-lone-blocks': 'off',
        'no-lonely-if': 'off',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-misleading-character-class': 'error',
        'no-mixed-spaces-and-tabs': 'off',
        'no-mixed-operators': 'off',
        'no-mixed-requires': 'error',
        'no-multi-assign': 'error',
        'no-multiple-empty-lines': [
            'error', 
            { 
                'max': 1, 
                'maxBOF': 0, 
                'maxEOF': 1
            }
        ],
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-native-reassign': 'error',
        'no-negated-condition': 'off',
        'no-negated-in-lhs': 'error',
        'no-nested-ternary': 'off',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'off',
        'no-new-require': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'off',
        'no-path-concat': 'error',
        'no-plusplus': 'off',
        'no-process-env': 'error',
        'no-process-exit': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'off',
        'no-restricted-globals': 'error',
        'no-restricted-imports': 'error',
        'no-restricted-modules': 'error',
        'no-restricted-properties': 'error',
        'no-restricted-syntax': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'off',
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        'no-spaced-func': 'off',
        'no-sync': 'error',
        'no-tabs': 'off',
        'no-template-curly-in-string': 'error',
        'no-ternary': 'off',
        'no-throw-literal': 'off',
        'no-trailing-spaces': 'off',
        'no-undef-init': 'off',
        'no-undefined': 'off',
        'no-underscore-dangle': 'off',
        'no-unmodified-loop-condition': 'off',
        'no-unneeded-ternary': [
            'error',
            {
                'defaultAssignment': true
            }
        ],
        'no-unused-expressions': 'off',
        'no-unused-vars': [
            'error', 
            { 
                'vars': 'all', 
                'args': 'none', 
                'ignoreRestSiblings': false
            }
        ],
        'no-use-before-define': 'off',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'off',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'off',
        'no-useless-rename': 'error',
        'no-useless-return': 'off',
        'no-var': 'off',
        'no-void': 'error',
        'no-warning-comments': 'off',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'nonblock-statement-body-position': [
            'error',
            'any'
        ],
        'object-curly-newline': 'off',
        'object-curly-spacing': 'off',
        'object-property-newline': 'off',
        'object-shorthand': 'off',
        'one-var': 'off',
        'one-var-declaration-per-line': 'off',
        'operator-assignment': 'off',
        'operator-linebreak': 'off',
        'padded-blocks': 'off',
        'padding-line-between-statements': 'error',
        'prefer-arrow-callback': 'off',
        'prefer-const': 'off',
        'prefer-destructuring': 'off',
        'prefer-numeric-literals': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-reflect': 'off',
        'prefer-rest-params': 'error',
        'prefer-spread': 'off',
        'prefer-template': 'off',
        'quote-props': 'off',
        'quotes': [
            'error', 
            'single'
        ],
        'radix': 'off',
        'require-atomic-updates': 'error',
        'require-await': 'error',
        'require-jsdoc': 'error',
        'require-unicode-regexp': 'off',
        'rest-spread-spacing': [
            'error',
            'never'
        ],
        'semi': 'off',
        'semi-spacing': 'off',
        'semi-style': 'off',
        'sort-imports': 'warn',
        'sort-keys': 'off',
        'sort-vars': [
            'error', 
            {
                'ignoreCase': true
            }
        ],
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off',
        'space-in-parens': 'off',
        'space-infix-ops': 'off',
        'space-unary-ops': 'off',
        'spaced-comment': 'off',
        'strict': [
            'error',
            'never'
        ],
        'switch-colon-spacing': 'off',
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'template-tag-spacing': 'error',
        'tsdoc/syntax': 'off',
        'unicode-bom': [
            'error',
            'never'
        ],
        'valid-jsdoc': 'error',
        'vars-on-top': 'off',
        'wrap-iife': 'off',
        'wrap-regex': 'off',
        'yield-star-spacing': 'error',
        'yoda': 'off'
    }
};
