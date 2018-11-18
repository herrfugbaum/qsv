#!/usr/bin/env node
'use strict'

const yargs = require('yargs').parse()

const readFile = require('./../src/readFile')
const parseCsv = require('./../src/parseFile')
const repl = require('./../src/repl')

async function start() {
  try {
    if (yargs.p) {
      const options = {
        delimiter: yargs.d || '',
        header: yargs.h || false,
      }

      const data = await readFile(yargs.p, 'utf8')
      const parsedData = await parseCsv(data, options)
      repl(parsedData)
    }
  } catch (error) {
    process.stderr.write(error)
  }
}

start()
