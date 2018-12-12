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

  const rowLimit = 100
  const data = streamFile('./dev/test.csv') // works
  const sqlCst = parse('SELECT * FROM test')
  parseCsv(data, options, sqlCst, rowLimit)
}

debug()
