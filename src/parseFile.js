'use strict'

const Papa = require('papaparse')
const executeSql = require('./excuteSql')
const renderTable = require('./renderTable')

function parseCsv(str, options, sqlCst, rowLimit) {
  try {
    let data = []
    let completed = false
    Papa.parse(str, {
      dynamicTyping: true,
      skipEmptyLines: true,
      header: options.header,
      delimiter: options.delimiter,
      step: function(row) {
        if (options.header) {
          if (data.length < rowLimit) {
            data.push(row.data)
          } else {
            const parsedData = executeSql(sqlCst, data.flat())
            renderTable(parsedData)
            data = []
          }
        } else {
          const objectified = row.data.map(d => Object.assign({}, d))
          if (data.length < rowLimit) {
            data.push(objectified)
          } else {
            const parsedData = executeSql(sqlCst, data.flat())

            renderTable(parsedData)
            data = []
          }
        }
      },
      complete: function() {
        completed = true
        const parsedData = executeSql(sqlCst, data.flat())
        process.stdout.write('\n')
        renderTable(parsedData)
        data = []
      },
    })
    //return data
  } catch (error) {
    throw new Error('Failed to parse data.')
  }
}

module.exports = parseCsv
