'use strict'

const chalk = require('chalk')
const readline = require('readline')
const renderTable = require('./renderTable')
const parse = require('@herrfugbaum/q')

const executeSql = require('./excuteSql')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.cyan('QSV> '),
})

const repl = parsedData => {
  rl.prompt()

  rl.on('line', line => {
    try {
      const sqlParserResult = parse(line)
      const processedTable = executeSql(sqlParserResult, parsedData)
      renderTable(processedTable)
      //process.stdout.write(renderTable(processedTable))
      process.stdout.write('\n')
    } catch (error) {
      process.stdout.write(error.message + '\n')
    }
    rl.prompt()
  })
}

module.exports = repl
