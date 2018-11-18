'use strict'

const table = require('table').table
const chalk = require('chalk')

const renderTable = data => {
  const headers = [Object.keys(data[0]).map(key => chalk.red(key))]

  const values = data.map(row => {
    return Object.values(row)
  })

  const output = table(headers.concat(values))
  return output
}

module.exports = renderTable
