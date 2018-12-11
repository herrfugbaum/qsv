'use strict'

const Papa = require('papaparse')

async function parseCsv(str, options) {
  try {
    const data = []
    Papa.parse(str, {
      dynamicTyping: true,
      skipEmptyLines: true,
      header: options.header,
      delimiter: options.delimiter,
      step: function(row) {
        if (options.header) {
          data.push(row.data)
        } else {
          const objectified = row.data.map(d => Object.assign({}, d))
          data.push(objectified)
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
