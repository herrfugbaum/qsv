- [Welcome](#welcome)
  - [Getting help](#getting-help)
  - [First timers](#first-timers)
  - [Setup](#setup)
  - [Running tests](#running-tests)
    - [Running the test suite](#running-the-test-suite)
    - [Running mutation tests](#running-mutation-tests)
  - [Running qsv](#running-qsv)
- [Pull requests](#pull-requests)
  - [Commit Styleguide](#commit-styleguide)

# Welcome

Hello and thank you very much for your interest in this project!

If you want to help you are more than welcome!

There are a lot of things you can do and not all of them are related to code.

* Create issues
  * File bugs
  * Propose enhancements
* Fix issues
  * Typos
  * Code
  * ...
* Create / maintain / proof documentation
* Improve the test suite
* Create examples for the wiki
* ...

## Getting help

If you have any questions or need help just head to the [chat](https://gitter.im/qsv-chat/Lobby) and ask.

This contribution guide is a work in progress. If you find errors or something isn't explained yet just file an [issue](https://github.com/herrfugbaum/qsv/issues) or join the chat.

## First timers

Maybe you're thinking about making your first open source contribution. That's awesome!
First of all don't be afraid. You can't break anything here.

A good entrypoint might be our [issues](https://github.com/herrfugbaum/qsv/issues) that are labeled with "Good first issue" and "First timers only", but feel free to tackle any issue you like!
Not all issues are about coding, creating and updating docs, proof reading and the like are equally important.

## Setup

1. Clone the repository
2. ```cd``` into the repository
3. ```yarn install```

## Running tests

### Running the test suite

```yarn test```

### Running mutation tests

```yarn testmu```

## Running qsv

* See the [readme](https://github.com/herrfugbaum/qsv/blob/master/README.md) for how to run and use qsv, the only difference to a global installation is how you invoke the executable, as seen below
* ```node bin/qsv.js -p path/to/a/file.csv```
* You can pass parameters as you need

Example:

```bash
node bin/qsv.js -p path/to/a/file.csv -h -d ', '
# -h means this file has a header row
# -d means your delimiter is kind of special
# in most cases qsv (or better Papa Parse) will figure out what your delimiter is
# so mostly you don't have to specify it.
```

# Pull requests

Before you create a pull request please file an [issue](https://github.com/herrfugbaum/qsv/issues) first.
If there is already an issue, please check if someone claimed it already in the comments.

## Commit Styleguide

See the [commit styleguide](https://github.com/herrfugbaum/qsv//wiki/Commit-Styleguide) in the wiki.
