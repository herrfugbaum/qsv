#!/usr/bin/env node
'use strict'

const path = require('path')

const untildify = require('untildify')
const yargs = require('yargs').parse()

const readFile = require('./../src/readFile')
const parseCsv = require('./../src/parseFile')
const repl = require('./../src/repl')
const checkUpdates = require('./../src/util/checkUpdates')
const pkg = require('../package.json')

async function start() {
  try {
    // Check for updates on startup
    checkUpdates(pkg, 3600000)
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
