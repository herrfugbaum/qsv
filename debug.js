const parseCsv = require('./src/parseFile')
const parse = require('@herrfugbaum/q')

const fs = require('fs-extra')
const streamFile = path => {
  const stream = fs.createReadStream(path)
  return stream
}

async function debug() {
  const options = {
    header: true,
  }
  const data = streamFile('./dev/survey_results_public.csv') // works
  const sqlCst = parse('SELECT * FROM test LIMIT 3')
  parseCsv(data, options, sqlCst)
}

debug()
