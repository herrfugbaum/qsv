'use strict'

const { createStream } = require('table')
const chalk = require('chalk')
const colorizeObject = require('./util/colorizeObject')

const renderTable = data => {
  const headers = [Object.keys(data[0]).map(key => chalk.red(key))]
  const values = data.map(row => colorizeObject(row))
  const table = headers.concat(values)
  const config = {
    columnDefault: {
      width: 10,
    },
    columnCount: table[0].length,
  }
  const stream = createStream(config)

  table.forEach(row => {
    stream.write(row)
  })
}

module.exports = renderTable
