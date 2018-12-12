'use strict'

const Papa = require('papaparse')
const executeSql = require('./excuteSql')
const renderTable = require('./renderTable')

function parseCsv(str, options, sqlCst) {
  try {
    let data = []
    Papa.parse(str, {
      dynamicTyping: true,
      skipEmptyLines: true,
      header: options.header,
      delimiter: options.delimiter,
      step: function(row) {
        if (options.header) {
          if (data.length < 100) {
            data.push(row.data)
          } else {
            const parsedData = executeSql(sqlCst, data.flat())
            renderTable(parsedData)
            data = []
          }
        } else {
          const objectified = row.data.map(d => Object.assign({}, d))
          if (data.length < 100) {
            data.push(objectified)
          } else {
            const parsedData = executeSql(sqlCst, data.flat())

            renderTable(parsedData)
            data = []
          }
        }
      },
      complete: function() {
        return data
      },
    })
    //return data
  } catch (error) {
    throw new Error('Failed to parse data.')
  }
}

module.exports = parseCsv
