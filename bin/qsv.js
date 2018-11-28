#!/usr/bin/env node
'use strict'

const path = require('path')
const untildify = require('untildify')

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
