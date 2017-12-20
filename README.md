# semantic-release-build

> Run build script before publishing with [semantic-release](https://github.com/semantic-release/semantic-release)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [The problem](#the-problem)
* [The solution](#the-solution)
* [Setup](#setup)
  * [Basic setup](#basic-setup)
  * [Extended setup](#extended-setup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The problem

Lets say you like the comfort of making semantic-release publishing your work to npm and/or Github (you should!) but your build step requires the version to be present in package.json to make it work. This works with earlier versions of semantic-release (<8), but not with the newer ones (>8).

## The solution

`semantic-release-build` is a fairly simple and rather naïve approach to the problem. It's a plugin for the [`publish`-hook](https://github.com/semantic-release/semantic-release#publish) for `semantic-release`. It will simply spawn `npm run build` (or `yarn`) after `semantic-release` has set the version in your package.json.

## Setup

The plugin is supposed to run inside the `publish`-hook for `semantic-release`. You don't have to set `npm` or `yarn` explicitly. By default it will run `npm run build`. But if `yarn` is available in your path (`which yarn`) and if a `yarn.lock`-file is present in your projects root it will run `yarn run build`.

### Basic setup

Inside `package.json`:

```json
"release": {
  "verifyConditions": "...your other plugins settings",
  "publish": [
    "semantic-release-build",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

**Disclaimer:** Make sure that `semantic-release-build` runs before other plugins, otherwise it will have no effect.

### Extended setup

`semantic-release-build` can be customized in one way – you can specify flags to attatch to your `npm run build` call.

Note that you don't have to attatch the extra `--` which is usually required by `npm`. It will be attatched for you. This is to make it work seamlessly between `npm` and `yarn`.

Inside `package.json`:

```json
"release": {
  "verifyConditions": "...your other plugins settings",
  "publish": [
    {
      "path": "semantic-release-build",
      "flags": "--out-dir build"
    }
  ]
}
```
