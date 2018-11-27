'use strict'

const Papa = require('papaparse')

async function parseCsv(str, options) {
  const opts = Object.assign(
    {
      dynamicTyping: true,
      skipEmptyLines: true,
    },
    options,
  )

  try {
    const data = Papa.parse(str, opts).data
    if (opts.header) {
      return data
    } else {
      // create an enumerated object
      const objectified = data.map(d => Object.assign({}, d))

      return objectified
    }
  } catch (error) {
    throw new Error('Failed to parse data.')
  }
}

module.exports = parseCsv
