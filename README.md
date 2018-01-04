# semantic-release-build

> Run build script before publishing with
> [semantic-release](https://github.com/semantic-release/semantic-release)

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Package][package-badge]][package] [![Downloads][downloads-badge]][downloads]
[![MIT License][license-badge]][license]

[![All Contributors][all-contributors-badge]](#contributors)
[![PRs Welcome][prs-badge]][prs]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [The problem](#the-problem)
* [The solution](#the-solution)
* [Setup](#setup)
  * [Basic setup](#basic-setup)
  * [Extended setup](#extended-setup)
* [Contributors](#contributors)
* [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The problem

Lets say you like the comfort of making semantic-release publishing your work to
npm and/or Github (you should!) but your build step requires the version to be
present in package.json to make it work. This works with earlier versions of
semantic-release (<8), but not with the newer ones (>8).

## The solution

`semantic-release-build` is a fairly simple and rather naïve approach to the
problem. It's a plugin for the
[`publish`-hook](https://github.com/semantic-release/semantic-release#publish)
for `semantic-release`. It will simply spawn `npm run build` (or `yarn`) after
`semantic-release` has determined the new version. It will first rewrite your
`package.json` with the new version number. Then run `npm/yarn run build`. And
then restore `package.json` to it's original state. This way you can get the
version number of your project inside e.g. a banner comment in toy build
artifacts.

## Setup

The plugin is supposed to run inside the `publish`-hook for `semantic-release`.
You don't have to set `npm` or `yarn` explicitly. By default it will run
`npm run build`. But if `yarn` is available in your path (`which yarn`) and if a
`yarn.lock`-file is present in your projects root it will run `yarn run build`.

### Basic setup

Inside `package.json`:

```json
"release": {
  // ...your other plugins settings
  "publish": [
    "semantic-release-build",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

**Disclaimer:** Make sure that `semantic-release-build` runs before other
plugins, otherwise it will have no effect.

### Extended setup

`semantic-release-build` can be customized in one way – you can specify flags to
attatch to your `npm run build` call.

Note that you don't have to attatch the extra `--` which is usually required by
`npm`. It will be attatched for you. This is to make it work seamlessly between
`npm` and `yarn`.

Inside `package.json`:

```json
"release": {
  // ...your other plugins settings
  "publish": [
    {
      "path": "semantic-release-build",
      "flags": "--out-dir build"
    }
  ]
}
```

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/13746650?v=4" width="100px;"/><br /><sub><b>Adam Bergman</b></sub>](http://fransvilhelm.com)<br />[💻](https://github.com/adambrgmn/semantic-release-build/commits?author=adambrgmn "Code") [📖](https://github.com/adambrgmn/semantic-release-build/commits?author=adambrgmn "Documentation") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

[build-badge]: https://img.shields.io/travis/adambrgmn/semantic-release-build.svg
[build]: https://travis-ci.org/adambrgmn/semantic-release-build
[coverage-badge]: https://img.shields.io/codecov/c/github/adambrgmn/semantic-release-build.svg
[coverage]: https://codecov.io/github/adambrgmn/semantic-release-build
[package-badge]: https://img.shields.io/npm/v/semantic-release-build.svg
[package]: https://www.npmjs.com/package/semantic-release-build
[downloads-badge]: https://img.shields.io/npm/dm/semantic-release-build.svg
[downloads]: http://npmcharts.com/compare/semantic-release-build
[license-badge]: https://img.shields.io/npm/l/semantic-release-build.svg
[license]: https://github.com/kentcdodds/semantic-release-build/blob/master/LICENSE
[all-contributors-badge]: https://img.shields.io/badge/all_contributors-1-orange.svg
[all-contributors]: https://github.com/kentcdodds/all-contributors
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key

## LICENSE

MIT
