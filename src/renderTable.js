'use strict'

const table = require('table').table
const chalk = require('chalk')

const colorizeObject = obj => {
  return Object.keys(obj).map(key => {
    const item = obj[key]
    switch (typeof item) {
      case 'number':
        return chalk.yellow(item)
      default:
        return chalk.green(item)
    }
  })
}

const renderTable = data => {
  const headers = [Object.keys(data[0]).map(key => chalk.red(key))]

  const values = data.map(row => colorizeObject(row))

  const output = table(headers.concat(values))
  return output
}

module.exports = renderTable
