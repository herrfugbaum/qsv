#!/usr/bin/env node
'use strict'

const path = require('path')

const untildify = require('untildify')
const yargs = require('yargs').parse()
const checkForUpdate = require('update-check')
const chalk = require('chalk')

const readFile = require('./../src/readFile')
const parseCsv = require('./../src/parseFile')
const repl = require('./../src/repl')
const pkg = require('../package.json')

let update = null

async function start() {
  try {
    /* Check for updates once a day */
    update = await checkForUpdate(pkg)

    if (update) {
      process.stdout.write(
        `${chalk.red('Update detected!')}\n
        The latest version of qsv is ${chalk.green(
          update.latest,
        )}, you are running version ${chalk.red(pkg.version)}.\n
        To update run:\n
        ${chalk.red('npm i -g qsv')}\n
        or\n
        ${chalk.red('yarn global add qsv')}\n`,
      )
    }

    /* Expose the current version of qsv if the programm was invoked with the -v switch */
    if (yargs.v) {
      process.stdout.write(pkg.version)
      process.exit()
    }

    if (yargs.p) {
      const options = {
        delimiter: yargs.d || '',
        header: yargs.h || false,
      }

      const cleanedPath = untildify(path.normalize(yargs.p))

      const data = await readFile(cleanedPath, 'utf8')
      const parsedData = await parseCsv(data, options)
      repl(parsedData)
    }
  } catch (error) {
    process.stderr.write(error)
  }
}

start()
