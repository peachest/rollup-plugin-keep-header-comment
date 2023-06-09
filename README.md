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
A rollup plugin to keep the first comment or one that match the provided pattern from the source code at the start of the bundle file.

When I try to use tsdoc and  `@microsoft/api-extractor`、`@microsoft/api-documenter` to generate docs for my project without `--local` flag，I got  `Warning: dist/index.d.ts:4:1 - (ae-misplaced-package-tag) The @packageDocumentation comment must appear at the top of entry point *.d.ts file`. However rollup  will put the import statements at the start of the file no matter where I place the package documentation comment.

So I develop this plugin fot those who want to use rollup and tsdoc, you can now put this plugin after the one that generate `.d.ts` file in rollup config. See example in [Usage](#Usage) or [Doc](markdown/rollup-plugin-keep-header-comment.export_default.md).

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



































