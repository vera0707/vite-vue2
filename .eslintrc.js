module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    sourceType: 'module'
  },
  plugins:['prettier'],
  rules: {
    // 提示级别为错误：缩进设置为 2 个空格，SwitchCase 设置为 1，case 子句将相对于 switch 语句缩进 2 个空格
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // 使用单引号，"avoidEscape": true 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，"allowTemplateLiterals": true 允许字符串使用反勾号
    'quotes': ['warn', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    // 要求花括号内有空格
    'object-curly-spacing': ['error', 'always'],
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-lonely-if': 'error',
    // 禁止多余的 return 语句
    'no-useless-return': 'error',
    // 禁止在 else 前有 return
    'no-else-return': 'error',
    // 除了与 null 字面量进行比较时，总是强制使用 === 和 !==
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    // 进制变量声明后被初始化为 undefined
    'no-undef-init': 'error',
    // 遇到 alert、prompt 和 confirm 时，该规则将发出警告
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // 禁止没有必要的字符拼接 
    'no-useless-concat': 'warn',
    // 扩展运算符及其表达式之间不允许有空格
    'rest-spread-spacing': ['error', 'never'],
    // 建议使用模板字面量而非字符串连接 
    'prefer-template': 'warn',
    // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    'no-useless-rename': 'error',
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 禁用 console， node环境允许
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error', 'time', 'timeEnd'] }] : 0,
    // 禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prettier/prettier': 'off'
  }
}