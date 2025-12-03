# Dataviz Components

[![codecov](https://codecov.io/gh/teamdigitale/dataviz-components/branch/main/graph/badge.svg)](https://codecov.io/gh/teamdigitale/dataviz-components)
[![CI](https://github.com/teamdigitale/dataviz-components/actions/workflows/ci.yml/badge.svg)](https://github.com/teamdigitale/dataviz-components/actions/workflows/ci.yml)

This is a react library.

## Install

You can install with

```
npm i dataviz-components@latest
# or yarn
yarn add dataviz-components@latest
# or pnpm
pnpm add dataviz-components@latest
# or bun
bun add dataviz-components@latest
```

## Usage

check the `exxample app`

## Deps

you have to add peerDeps to you projects.

# How To Dev

to add deps use `npm` please and add each required lib as dev and peer deps like:

```zsh
npm i --save-dev ol
npm i --save-peer ol
```

to update the build

```zsh
npm run build
```

than bump the version and push to npm

```zsh
npm publish
```

than install the last version inside example project

```zsh
npm add dataviz-components@latest
```
