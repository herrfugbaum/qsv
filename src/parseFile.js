const Papa = require('papaparse')

async function parseCsv(str, options) {
  const opts = Object.assign({
    dynamicTyping: true
  }, options)

  try {
    const data = Papa.parse(str, opts).data
      if (options.header) {
        return data
      } else {
          // create an enumerated object
          const objectified = data.map(d => Object.assign({}, d))

          return objectified
        }
  } catch (error) {
    console.log(error)
  }
}

module.exports = parseCsv