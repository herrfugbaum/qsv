const checkForUpdate = require('update-check')
const chalk = require('chalk')

const checkUpdates = async function(pkg, interval) {
  try {
    const update = await checkForUpdate(pkg, { interval: interval })
    if (update) {
      process.stdout.write(
        `${chalk.red('Update detected!')}\n
        The latest version of qsv is ${chalk.green(
          update.latest,
        )}, you are running version ${chalk.red(pkg.version)}.\n
        To update run:\n
        ${chalk.red('npm i -g qsv')}\n
        or\n
        ${chalk.red('yarn global add qsv')}\n`,
      )
    }
  } catch (error) {
    process.stderr.write(`Failed to check for updates: ${error}`)
  }
}

module.exports = checkUpdates
