'use strict'

const fs = require('fs-extra')

async function readFile(path, encoding) {
  try {
    const data = await fs.readFile(path, encoding)
    return data
  } catch (error) {
    console.log(error)
  }
}

module.exports = readFile