地址： [https://github.com/cacjs/cac](https://github.com/cacjs/cac)

## 时间

开始：七月四号

结束：七月十号

## 阅读源码的流程

1. 下载好了代码先安装依赖
   - 这个项目用 yarn
1. 运行一下测试 检测是否可以跑起来
1. 基于一个测试跑一下 先大概了解一下流程
   - 基于断点看执行的流程
1. 自己给他写一个测试 这个测试包含你想要了解的功能
   - 比如 <> 或者 [] 看看它是如何解析的

## 问题

### Q : 分析一下目录

- 什么类型的文件放到什么文件夹内
- 一般都会有几个文件夹

### A :

```
dist               : 打包产物
examples           : demo
scripts            : 打包脚本 ( 这个库分为 build:node 和 build:deno , build:node 使用rollup , build:deno 用的就是脚本)
src                : 源码
.editorconfig      : 约束代码规范
.gitattributes     : 约束代码规范
.prettierrc        : 约束代码规范
circle.yml         : CI
index-compat       : 根据当前运行环境去 compat (详情看 pkg)
jest.config        : jest 配置
LICENSE            : 开源协议
mod                : deno 相关 ?
rollup.config      : rollup 配置
tsconfig           : ts 配置
yarn.lock          : 依赖 lock 文件
```

### Q : .editorconfig 是干嘛的

### A :

editorconfig 是用于跨不同的编辑器和 IDE 为多个开发人员维护一致的编码风格的配置文件。editorconfig 项目由定义编码样式的文件格式和一组文本编辑器插件组成，编辑器插件通过读取文件并以已定义的样式格式化指定文件。editorconfig 文件具有友好的阅读性，且能与版本控制系统配合良好的特点

### .gitattributes 是干嘛的

### A :

每当一个文件被创建或保存，git 会按照这些属性所指定的自动化的保存文件。

### Q : 持续集成是如何实现的

- circle.yml 是如何配置的

### A :

### Q : 分析一下单元测试环境是如何搭建的

- ts-jest 是解决什么问题的
  - 如果没有 ts-jest 的话 你会搭建基于 ts 的 jest 的环境嘛？
    - 写个 demo？
- 分析一下 jest.config.js 这几个字段都有什么用？

### A :

ts-jest 是 TypeScript 的 Jest 转换器
如果没有这个插件 需要 babel 来支持转换

jest.config.js

```js
module.exports = {
  /** 当前测试运行时环境 */
  testEnvironment: 'node',
  /** 遇到 tsx 就用 ts-jest 转换 */
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  /** 测试哪些目录下的 .test|spec.ts */
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$',
  /** 不测试哪些目录下的 .spec.ts */
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
  /** 模块使用的文件扩展名数组。如果您需要不指定文件扩展名的模块，那么 Jest 将按照从左到右的顺序寻找这些扩展名。我们建议将项目中最常用的扩展放在左侧，因此如果您正在使用 TypeScript，您可能需要考虑将“ ts”和/或“ tsx”移到数组的开头。 */
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
```

### Q : 分析一下 package.json 里面的字段都是干嘛的

- 发布一个库需要用到哪些字段

### A :

```json
{
  // 项目名称
  "name": "cac",
  // 项目版本
  "version": "6.0.0",
  // 项目描述
  "description": "Simple yet powerful framework for building command-line apps.",
  // 项目仓库
  "repository": {
    "url": "egoist/cac",
    "type": "git"
  },
  // commonJS 入口
  "main": "index-compat.js",
  // esm 打包入口
  "module": "dist/index.mjs",
  // 类型声明文件
  "types": "dist/index.d.ts",
  // 导入的时候文件入口
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./index-compat.js"
    },
    "./package.json": "./package.json",
    "./": "./"
  },
  // 项目包含的文件
  "files": [
    "dist",
    "!**/__test__/**",
    "/mod.js",
    "/mod.ts",
    "/deno",
    "/index-compat.js"
  ],
  // 脚本
  "scripts": {
    "test": "jest",
    "test:cov": "jest --coverage",
    "build:deno": "node -r sucrase/register scripts/build-deno.ts",
    "build:node": "rollup -c",
    "build": "yarn build:deno && yarn build:node",
    "toc": "markdown-toc -i README.md",
    "prepublishOnly": "npm run build && cp mod.js mod.mjs",
    "docs:api": "typedoc --out api-doc --readme none --exclude \"**/__test__/**\" --theme minimal"
  },
  // 作者
  "author": "egoist <0x142857@gmail.com>",
  // 协议
  "license": "MIT",
  // 开发依赖
  "devDependencies": {},
  // 运行环境版本
  "engines": {
    "node": ">=8"
  },
  // 发布分支
  "release": {
    "branch": "master"
  },
  // 设置包脚本中使用的配置参数
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

### Q : 写一个库的 README 需要哪几个部分？

- 结构是什么样子的？
- 有哪些可以快速生成 readme 的库
  - 可以记录下来，下次一起分析是如何做到的

### A :

### Q : 构建是如何做的？

- 分析 rollup.config.js

### A :

### Q : 分析一下 tsconfig 里面的配置项

### A :

```json
{
  "compilerOptions": {
    // 编译目标
    "target": "es2015",
    // 编译目标
    "declaration": true,
    "declarationDir": "types",
    // 导出规范 esm
    "esModuleInterop": true,
    "pretty": true,
    //
    "moduleResolution": "node",
    // 依赖库
    "lib": ["es2015", "es2016.array.include"],
    "allowSyntheticDefaultImports": true,
    "stripInternal": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    // 严格模式
    "alwaysStrict": true,
    // tsc之后模块规范
    "module": "commonjs",
    // tsc之后输出的目录
    "outDir": "lib"
  },
  // tsconfig 作用文件
  "include": ["src", "declarations.d.ts"],
  // tsconfig 不作用文件
  "exclude": ["src/deno.ts"]
}
```

### Q : 画一下这个库的程序流程图

- 画流程图可以参考这篇文章 [https://zhuanlan.zhihu.com/p/364507517](https://zhuanlan.zhihu.com/p/364507517)
- 画好了图之后可以更清晰明了的看到程序设计的全貌
- 划分好类的职责
  - CAC
  - Command
  - Option
- 可以画一下 UML 图

### Q : 尝试通过单元测试调试库

- 可以把你通过单元测试调试库的过程记录下来
- 让别人可以基于你的记录也可以实现

### A :

vscode 安装 jest 插件 直接 debugger

### Q : 这个库应该如何使用？

- 基于这个库的文档写一篇小教程
- 让别人基于你的教程就可以使用这个库

### Q : 如何理解 option

- 概念
- 在程序里面是如何实现的

### Q : 如何理解 command

- 概念
- 在程序里面是如何实现的

### Q : 如何理解 action

- 概念
- 在程序里面是如何实现的

### Q : 如何实现连续调用的 api

![](https://images-1252602850.cos.ap-beijing.myqcloud.com/20220627173013.png)

### A :

return this

### Brackets 应该如何使用

- 方括号和尖括号有什么不同

### Brackets 是如何实现的

### Negated Options 是如何实现的？

### 分析一下下面这段代码的执行流程

![](https://images-1252602850.cos.ap-beijing.myqcloud.com/20220627174013.png)

### 还可以从功能上分解需求点

- 全局的 command 是如何实现的
- sub command 是如何实现的
- 每个 command 的 option 是如何实现的
- help 和 version 是如何实现的

### 程序等于数据结构＋算法

- 哪一部分是收集数据的
  - 对应初始化的逻辑
- 哪一部分是算法
