const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  env: {
    es6: true, //允许ES6全局变量（例如Set)
    browser: true, //允许浏览器使用全局变量（例如:window)
    node: true, //允许Node.js全局变量和作用域（例如:process)
  },
  plugins: ['@typescript-eslint', 'prettier', 'unicorn'], //使用ESlint的插件
  //extends 中的多个模块，如果模块之间有冲突，位置靠后的模块的规则将会覆盖前面的，rules声明的规则优先级是高于extends的
  extends: [
    'eslint:recommended', //使用eslint推荐的规则
    'plugin:import/recommended', //使用eslint-plugin-import 推荐的规则
    'plugin:eslint-comments/recommended', //使用eslint-plugin-comments-recommended推荐的规则
    'plugin:jsonc/recommended-with-jsonc', //使用eslint-plugin-jsonc推荐的规则，适用于JSONC（json with Comments)
    'plugin:markdown/recommended', //使用eslint-plugin-markdown 插件推荐的规则
    'plugin:vue/vue3-recommended', //使用eslint-plugin-vue 推荐Vue3的规则
    'plugin:@typescript-eslint/recommended', //使用@typescript-eslint 推荐的规则
    'prettier', //使用prettier配置，关闭所有与prettier冲突的eslint规则
  ],
  //settings 用于为ESlint配置一些全局设置，它可以用来提供一些额外的配置选项
  settings: {
    //这个主要是配置了eslint-plugin-import 插件，主要用于指定拓展名来解析模块路径
    'import/resolver': {
      //node是该插件的内置解析器
      node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] },
    },
  },
  //overrides,外侧配置的rule 一般都是全局生效，通过overrides,可以针对一些文件覆盖一些规则
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser', //使用jsonc-eslint-parser来解析这些文件
    },
    {
      files: ['*.ts', '*.vue'], //针对TypeScript 和Vue文件的配置
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['**/__test__/**'],
      rules: {
        'no-console': 'off', //允许在测试中使用console
        'vue/one-component-per-file': 'off', //关闭Vue规则，允许每个文件中包含多个组件
      },
    },
    {
      files: ['package.json'], //针对package.json 文件的配置
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            //对根级别属性排序
            order: [
              'name',
              'version',
              'private',
              'packageManager',
              'description',
              'type',
              'keywords',
              'homepage',
              'bugs',
              'license',
              'author',
              'contributors',
              'funding',
              'files',
              'main',
              'module',
              'exports',
              'unpkg',
              'jsdelivr',
              'browser',
              'bin',
              'man',
              'directories',
              'repository',
              'publishConfig',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'optionalDependencies',
              'dependencies',
              'devDependencies',
              'engines',
              'config',
              'overrides',
              'pnpm',
              'husky',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$', //对依赖进行排序
            order: { type: 'asc' },
          },
        ],
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser', //解析vue文件
      parserOptions: {
        parser: '@typescript-eslint/parser', //使用@typescript-eslint/parser 解析ts文件
        extraFileExtensions: ['.vue'], //额外支持.vue 文件拓展名
        ecmaVersion: 'latest', //使用最新版本的ECMAScript版本
        ecmaFeatures: {
          jsx: true, //支持jsx语法
        },
      },
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['**/*.md/*.js', '**/*.md/*.ts'], //针对Markdown 文件中嵌入的JavaScript 和TypeScript 代码配置
      rules: {
        'no-console': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    camelcase: ['error', { properties: 'never' }], // 强制使用 camelCase 命名，允许属性名不遵循此规则
    'no-console': ['warn', { allow: ['error'] }], // 警告使用 console，但允许 console.error
    'no-debugger': 'warn', // 警告使用 debugger
    'no-constant-condition': ['error', { checkLoops: false }], // 禁止在条件中使用常量表达式，但允许在循环中使用
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'], // 禁止使用特定语法
    'no-return-await': 'error', // 禁止在 return 语句中使用 await
    'no-var': 'error', // 禁止使用 var 声明变量
    'no-empty': ['error', { allowEmptyCatch: true }], // 禁止空块，但允许空的 catch 子句
    'prefer-const': [
      'warn',
      { destructuring: 'all', ignoreReadBeforeAssign: true }, // 尽量使用 const 声明
    ],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true }, // 尽量使用箭头函数
    ],
    'object-shorthand': [
      'error',
      'always',
      { ignoreConstructors: false, avoidQuotes: true }, // 强制使用对象字面量简写
    ],
    'prefer-rest-params': 'error', // 强制使用剩余参数代替 arguments
    'prefer-spread': 'error', // 强制使用扩展运算符而非 apply
    'prefer-template': 'error', // 强制使用模板字面量代替字符串连接

    'no-redeclare': 'off', // 关闭 no-redeclare 规则
    '@typescript-eslint/no-redeclare': 'error', // 使用 @typescript-eslint/no-redeclare 规则

    // 最佳实践
    'array-callback-return': 'error', // 强制数组方法的回调函数中有 return 语句
    'block-scoped-var': 'error', // 强制块作用域
    'no-alert': 'warn', // 警告使用 alert、confirm 和 prompt
    'no-case-declarations': 'error', // 禁止在 case 子句中声明变量
    'no-multi-str': 'error', // 禁止使用多行字符串
    'no-with': 'error', // 禁止使用 with 语句
    'no-void': 'error', // 禁止使用 void 操作符

    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false, // 强制导入排序
      },
    ],

    // 风格问题
    'prefer-exponentiation-operator': 'error', // 强制使用指数操作符 ** 代替 Math.pow

    // TypeScript 特定规则
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭显式模块边界类型规则
    '@typescript-eslint/no-explicit-any': 'off', // 关闭禁止使用 any 类型规则
    '@typescript-eslint/no-non-null-assertion': 'off', // 关闭禁止
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off', //允许在可选链中使用非空断言（!）
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false },
    ], //强制类型导入的一致性，确保代码中类型导入的一致风格，但允许类型注解中使用类型导入。
    '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }], //不禁止使用 @ts- 注释（如 @ts-ignore）

    //vue
    'vue/no-v-html': 'off', //允许使用 v-html 指令。
    'vue/require-default-prop': 'off', //不要求为每个 prop 提供默认值。
    'vue/require-explicit-emits': 'off', //不强制要求显式定义组件的所有 emit 事件。
    'vue/multi-word-component-names': 'off', //允许单词的组件名称。
    'vue/prefer-import-from-vue': 'off', //不强制要求从 vue 模块中导入而不是从其他路径。
    'vue/no-v-text-v-html-on-component': 'off', //允许在组件上同时使用 v-text 和 v-html
    'vue/html-self-closing': [
      //强制 HTML、SVG 和 MathML 中的标签自闭合：
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // prettier
    'prettier/prettier': 'error', //代码不符合 Prettier 的格式，将触发错误。

    //import
    'import/first': 'error', //确保所有的导入语句在文件的顶部。
    'import/no-duplicates': 'error', //禁止重复导入同一个模块
    //强制导入顺序：builtin: 内置模块。external: 外部模块。internal: 内部模块。parent: 父级模块。sibling: 同级模块。index: 索引模块。object: 对象模块。type: 类型模块。
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        //指定 vue 模块和 @vue/** 模块优先于其他外部模块导入，@fz-mini/** 模块作为内部模块导入。
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@vue/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@fz-mini/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
      },
    ],
    'import/no-unresolved': 'off', //不强制要求导入路径的解析
    'import/namespace': 'off', //不强制命名空间导入。
    'import/default': 'off', //不强制默认导入
    'import/no-named-as-default': 'off', //允许命名导入作为默认导入。
    'import/no-named-as-default-member': 'off', //，允许命名导入作为默认成员导入。
    'import/named': 'off', //不强制命名导入的检查。

    // eslint-plugin-eslint-comments
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

    'unicorn/custom-error-definition': 'error', // 强制要求自定义错误类必须继承自 Error 类
    'unicorn/error-message': 'error', // 强制要求所有抛出的错误必须包含错误消息
    'unicorn/escape-case': 'error', // 强制要求使用小写的转义字符（如 \x20 而不是 \X20）
    'unicorn/import-index': 'error', // 强制要求显式导入索引文件（如 './foo/index.js' 而不是 './foo'）
    'unicorn/new-for-builtins': 'error', // 强制要求使用 new 关键字实例化内置对象（如 Date, Map 等）
    'unicorn/no-array-method-this-argument': 'error', // 禁止在数组方法（如 map, forEach）中使用 this 参数
    'unicorn/no-array-push-push': 'error', // 禁止连续调用 Array.push 方法，推荐一次性添加所有元素
    'unicorn/no-console-spaces': 'error', // 禁止在 console.log 中使用多个连续空格
    'unicorn/no-for-loop': 'error', // 禁止使用传统的 for 循环，推荐使用 for-of 或其他迭代方法
    'unicorn/no-hex-escape': 'error', // 禁止使用十六进制转义字符，推荐使用 Unicode 转义
    'unicorn/no-instanceof-array': 'error', // 禁止使用 instanceof Array，推荐使用 Array.isArray
    'unicorn/no-invalid-remove-event-listener': 'error', // 禁止使用无效的函数引用来调用 removeEventListener
    'unicorn/no-new-array': 'error', // 禁止使用 new Array() 创建数组，推荐使用数组字面量 []
    'unicorn/no-new-buffer': 'error', // 禁止使用 new Buffer()，推荐使用 Buffer.from 或 Buffer.alloc
    'unicorn/no-unsafe-regex': 'off', // 关闭规则，不检查正则表达式的安全性
    'unicorn/number-literal-case': 'error', // 强制要求数字字面量使用一致的小写字母（如 0xFF 应为 0xff）
    'unicorn/prefer-array-find': 'error', // 推荐使用 Array.find 代替 Array.filter()[0]
    'unicorn/prefer-array-flat-map': 'error', // 推荐使用 Array.flatMap 代替 Array.map().flat()
    'unicorn/prefer-array-index-of': 'error', // 推荐使用 Array.indexOf 代替 Array.findIndex
    'unicorn/prefer-array-some': 'error', // 推荐使用 Array.some 代替 Array.filter().length > 0
    'unicorn/prefer-date-now': 'error', // 推荐使用 Date.now() 代替 (new Date()).getTime()
    'unicorn/prefer-dom-node-dataset': 'error', // 推荐使用 dataset 属性代替 getAttribute 和 setAttribute
    'unicorn/prefer-includes': 'error', // 推荐使用 String.includes 或 Array.includes 代替 indexOf
    'unicorn/prefer-keyboard-event-key': 'error', // 推荐使用 KeyboardEvent.key 代替 KeyboardEvent.keyCode
    'unicorn/prefer-math-trunc': 'error', // 推荐使用 Math.trunc 代替 Math.floor, Math.ceil, Math.round
    'unicorn/prefer-modern-dom-apis': 'error', // 推荐使用现代 DOM API（如 querySelector）代替旧 API
    'unicorn/prefer-negative-index': 'error', // 推荐使用负索引来从数组末尾访问元素（如 array[-1]）
    'unicorn/prefer-number-properties': 'error', // 推荐使用 Number 的静态属性代替全局函数（如 Number.isNaN 代替 isNaN）
    'unicorn/prefer-optional-catch-binding': 'error', // 推荐使用可选的 catch 绑定（省略 catch 参数）
    'unicorn/prefer-prototype-methods': 'error', // 推荐使用原型方法（如 Array.prototype.indexOf.call 代替 Array.indexOf）
    'unicorn/prefer-query-selector': 'error', // 推荐使用 querySelector 和 querySelectorAll 代替 getElementById 等
    'unicorn/prefer-reflect-apply': 'error', // 推荐使用 Reflect.apply 代替 Function.prototype.apply
    'unicorn/prefer-string-slice': 'error', // 推荐使用 String.slice 代替 substr 和 substring
    'unicorn/prefer-string-starts-ends-with': 'error', // 推荐使用 String.startsWith 和 String.endsWith 代替 indexOf
    'unicorn/prefer-string-trim-start-end': 'error', // 推荐使用 String.trimStart 和 String.trimEnd 代替 String.trim
    'unicorn/prefer-type-error': 'error', // 推荐抛出 TypeError 错误类型代替其他错误类型
    'unicorn/throw-new-error': 'error', // 推荐使用 new Error 抛出错误，确保抛出的错误是一个 Error 实例
  },
})
