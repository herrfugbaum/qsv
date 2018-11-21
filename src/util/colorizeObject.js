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

module.exports = colorizeObject
