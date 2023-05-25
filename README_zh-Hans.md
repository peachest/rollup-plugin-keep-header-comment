# rollup-plugin-keep-header-comment

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/peachest/rollup-plugin-keep-header-comment)![npm type definitions](https://img.shields.io/npm/types/rollup-plugin-keep-header-comment)

![Top Language](https://img.shields.io/github/languages/top/peachest/rollup-plugin-keep-header-comment)![Code Size](https://img.shields.io/github/languages/code-size/peachest/rollup-plugin-keep-header-comment)![NPM Bundle Size](https://img.shields.io/bundlephobia/min/rollup-plugin-keep-header-comment?label=npm%20bundle%20size)![License](https://img.shields.io/github/license/peachest/rollup-plugin-keep-header-comment)

![npm dev dependency version](https://img.shields.io/npm/dependency-version/rollup-plugin-keep-header-comment/dev/eslint)![npm dev dependency version](https://img.shields.io/npm/dependency-version/rollup-plugin-keep-header-comment/dev/rollup)![npm dev dependency version](https://img.shields.io/npm/dependency-version/rollup-plugin-keep-header-comment/dev/typescript)![Dependencies](https://img.shields.io/librariesio/github/peachest/rollup-plugin-keep-header-comment)

![Goto Counter](https://img.shields.io/github/search/peachest/rollup-plugin-keep-header-comment/goto)![Github Downloads](https://img.shields.io/github/downloads/peachest/rollup-plugin-keep-header-comment/total?label=github%20downloads)![GitHub issues](https://img.shields.io/github/issues/peachest/rollup-plugin-keep-header-comment)![Github pull requests](https://img.shields.io/github/issues-pr/peachest/rollup-plugin-keep-header-comment)![GitHub last commit](https://img.shields.io/github/last-commit/peachest/rollup-plugin-keep-header-comment)

![NPM Downloads](https://img.shields.io/npm/dt/rollup-plugin-keep-header-comment?label=npm%20downloads)![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/peachest/rollup-plugin-keep-header-comment?label=package%20version)


<p align="center">
    <a href="./markdown/index.md">API Documents</a>
</p>

<p align="center">
    <a href="README.md">English</a>
    ·
    <a href="README_zh-Hans.md">简体中文</a>
</p>
一个 rollup 插件，将源代码文件中第一个或符合指定模式的注释放置到输出文件的开头。

我在使用 tsdoc 搭配  `@microsoft/api-extractor`、`@microsoft/api-documenter` 为我的项目自动生成 API 文档时，如果不使用  `--local` 参数，会得到 `Warning: dist/index.d.ts:4:1 - (ae-misplaced-package-tag) The @packageDocumentation comment must appear at the top of entry point *.d.ts file` 。但是无论怎么调整源文件中的注释位置， rollup 都会将 import 语句自动放到文件开头。

因此开发了这个插件搭配 rollup 与 tsdoc 使用。只需要将本插件放在生成声明文件的 rollup 插件配置的最后即可。示例代码见 [Usage](#Usage) 或者 [Doc](markdown/rollup-plugin-keep-header-comment.export_default.md).

## Install

**install npm package**

```shell
npm install gridfs-extra
```



or **clone from Github**

```shell
# ssh
git clone git@github.com:peachest/gridfs-extra.git

# http
git clone https://github.com/peachest/gridfs-extra.git
```



## Usage

Put this plugin at the last after the `dts` plugin

```javascript
import clear from "rollup-plugin-clear";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import keepHeaderComment from "rollup-plugin-keep-header-comment";

export default {
  plugins: [
    clear({targets: ["dist"]}),
    json(),
    nodeResolve({preferBuiltins: false}),
    commonjs(),
    typescript({tsconfig}),
    dts({tsconfig}),
    keepHeaderComment({
        sourcemap: true,
        pattern: /@packageDocumentation/
    })
  ]
}
```



Now you can put your `packageDocumentation` comment wherever you want in your source code:

```javascript
import { OutputPlugin } from 'rollup';
/**
 * A rollup plugin to keep the header comments from source in the declaration file
 * @packageDocumentation
 */

```



rollup will generate  `dist/index.d.ts` with comment at the start:

```javascript
/**
 * A rollup plugin to keep the header comments from source in the declaration file
 * @packageDocumentation
 */
import { OutputPlugin } from 'rollup';
```





**options：**

* sourcemap（optional）：generate sourcemap for rollup, won’t generate sourcemap file in output directory

* pattern（optional）:  if provided, comment which match this pattern will be shifted to the start of the file, otherwise the first comment will be shifted



































