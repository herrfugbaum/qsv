const chalk = require('chalk')
const readline = require('readline')
const renderTable = require('./renderTable')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.cyan('QSV> ')
})

const repl = (parsedData) => {
rl.prompt()

rl.on('line', (line) => {
  console.log(line.toUpperCase())
  if(line === 'YO') {
    console.log(renderTable(parsedData))
  }
  rl.prompt()
})
}

module.exports = repl