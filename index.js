const fs = require('fs')
const readline = require('readline')

const Papa = require('papaparse')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

fs.readFile('./dev/test.csv', 'utf8', (err, data) => {
  if (err) throw new Error(err)
  const result = Papa.parse(data)
  rl.question('', answer => {
    if (answer === 'SELECT * FROM .') {
      console.log(result.data)
    }
  })
})

rl.on('line', input => {
  console.log(input)
})
