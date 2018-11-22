'use strict'

const chalk = require('chalk')
const readline = require('readline')
const renderTable = require('./renderTable')
const parse = require('@herrfugbaum/q')
const _ = require('lodash')

const {
  select,
  where,
  orderBy,
  limit,
} = require('./sql-processors/sql-processors')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.cyan('QSV> '),
})

const getData = (sqlParserResult, parsedData) => {
  console.log(parsedData)
  // LIMIT param setup
  const limitStop = sqlParserResult.limitClause
    ? sqlParserResult.limitClause.limit
    : false

  // WHERE param setup
  const whereCondition = sqlParserResult.whereClause
    ? sqlParserResult.whereClause.condition
    : false

  // ORDER BY param setup
  let columnOrders = []
  let columnsToOrder = []
  if (sqlParserResult.orderByClause) {
    // temporarily hardcoded as arrays, until the parser is ready to understand multiple order by conditions
    columnOrders = [sqlParserResult.orderByClause.condition]
    columnsToOrder = [sqlParserResult.orderByClause.expression]
  }

  // SELECT param setup
  const columns = sqlParserResult.selectClause
    ? sqlParserResult.selectClause.columns
    : false

  if (sqlParserResult.type === 'SELECT_STMT') {
    const result = limit(
      limitStop,
      orderBy(
        columnsToOrder,
        columnOrders,
        where(whereCondition, select(columns, parsedData)),
      ),
    )
    return result
  }
}

const repl = parsedData => {
  rl.prompt()

  rl.on('line', line => {
    const sqlParserResult = parse(line)
    const processedTable = getData(sqlParserResult, parsedData)

    process.stdout.write(renderTable(processedTable))
    process.stdout.write('\n')
    rl.prompt()
  })
}

module.exports = repl
