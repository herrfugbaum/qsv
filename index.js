const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

fs.readFile('./dev/test.csv', 'utf8', (err, data) => {
  if (err) throw new Error(err)
  const content = data.split(/[\r\n,]/)
  rl.question('', answer => {
    if (answer === 'SELECT * FROM .') {
      console.log(content)
    }
  })
})
