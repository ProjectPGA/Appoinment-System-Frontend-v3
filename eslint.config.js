import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier/recommended';
import vueI18n from '@intlify/eslint-plugin-vue-i18n';
import pluginCypress from 'eslint-plugin-cypress/flat';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export default [
  ...vueI18n.configs['flat/recommended'],
  {
    rules: {
      // Optional.
      '@intlify/vue-i18n/no-dynamic-keys': 'error',
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        {
          extensions: ['.ts', '.js', '.vue'],
        },
      ],
    },
    settings: {
      'vue-i18n': {
        localeDir: './src/localization/locales/**/*.json}',
      },
    },
  },

  // cypress
  pluginCypress.configs.recommended,
  pluginCypress.configs.globals,
  {
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // ignores
  {
    ignores: [
      '.gitignore',
      'cache/*',
      'dist/*',
      'storybook-static/*',
      'node_modules/*',
      'src/shims.vue.d.ts',
      '.github/*',
      '.vscode/*',
      'coverage/*',
      '**/*.d.ts',
      '**/*.json',
      '**/*.md',
      '**/*.yaml',
    ],
  },

  // js
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },

  // ts
  ...ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },

  // vue
  ...vue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  ...vueTsEslintConfig({ extends: ['recommendedTypeChecked'] }),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.vue'],
    rules: {
      // Turn off the recommended rules that you don't need.
      '@typescript-eslint/no-redundant-type-constituents': 'off',

      // Turn on other rules that you need.
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/v-on-event-hyphenation': ['error', 'never'],
      'vue/no-v-html': 'off',

      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': [
        'error',
        { order: ['script[setup]', 'template', 'style[scoped]'] },
      ],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': 'error',
      'vue/custom-event-name-casing': 'error',
      'vue/define-emits-declaration': 'error',
      'vue/define-macros-order': [
        'error',
        {
          order: [
            'defineOptions',
            'defineModel',
            'defineProps',
            'defineEmits',
            'defineSlots',
          ],
          defineExposeLast: true,
        },
      ],
      'vue/define-props-declaration': 'error',
      'vue/html-button-has-type': 'error',
      'vue/no-multiple-objects-in-class': 'warn',
      'vue/no-root-v-if': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-undef-components': 'warn',
      'vue/no-undef-properties': 'warn',
      'vue/no-unused-refs': 'warn',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/no-useless-mustaches': 'warn',
      'vue/no-useless-v-bind': 'warn',
      'vue/no-v-text': 'error',
      'vue/padding-line-between-blocks': 'warn',
      'vue/prefer-define-options': 'error',
      'vue/prefer-separate-static-class': 'warn',
      'vue/prefer-true-attribute-shorthand': 'warn',
      'vue/require-macro-variable-name': 'error',
      'vue/require-typed-ref': 'warn',
      'vue/v-for-delimiter-style': 'error',
      'vue/valid-define-options': 'error',
    },
  },

  // prettier
  prettier,
  {
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
