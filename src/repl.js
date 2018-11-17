const chalk = require('chalk')
const readline = require('readline')
const renderTable = require('./renderTable')
const parse = require('@herrfugbaum/q')
const _ = require('lodash')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.cyan('QSV> ')
})

const getData = (sqlParserResult, parsedData) => {
  if (sqlParserResult.type === 'SELECT_STMT') {
    const columns = sqlParserResult.selectClause.columns

    if (columns[0] !== '*') {
      const selectedColumns = _.map(parsedData, (obj) => _.pick(obj, columns))
      return selectedColumns
    }
    return parsedData
  }
}

const repl = (parsedData) => {
rl.prompt()

rl.on('line', (line) => {
  const sqlParserResult = parse(line)
  console.log(sqlParserResult)
  const processedTable = getData(sqlParserResult, parsedData)
  process.stdout.write(renderTable(processedTable))

  rl.prompt()
})
}

module.exports = repl