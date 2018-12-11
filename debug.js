const readFile = require('./src/readFile')
const parseCsv = require('./src/parseFile')
const parse = require('@herrfugbaum/q')

const executeSql = require('./src/excuteSql')
const renderTable = require('./src/renderTable')

const fs = require('fs-extra')
const streamFile = path => {
  const stream = fs.createReadStream(path)
  return stream
}

async function debug() {
  const options = {
    header: false,
  }
  const data = streamFile('./dev/survey_results_public.csv') // works
  const parsedData = await parseCsv(data, options) // doesn't return anything, guess we have to execute SQL here row by row or alternatively push e.g. 100 rows into an array and execute SQL on that array then proceed
  const sqlParserResult = parse('SELECT * FROM test')
  const processedTable = executeSql(sqlParserResult, parsedData)
  renderTable(processedTable)
}

debug()
