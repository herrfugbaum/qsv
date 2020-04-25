'use strict'

const chalk = require('chalk')
const readline = require('readline')
const { Machine, interpret, assign } = require('xstate')
const renderTable = require('./renderTable')
const parse = require('@herrfugbaum/q')

const executeSql = require('./excuteSql')

const pageLength = 1

const replMachine = Machine(
  {
    id: 'replMachine',
    initial: 'repl',
    context: {
      cursor: 0,
      data: [],
    },
    states: {
      repl: {
        on: {
          ENTER_KEY: 'parsing',
        },
      },
      parsing: {
        on: {
          SUCCESS: {
            target: 'readMore',
            actions: ['dataAssign'],
          },
          ERROR: 'error',
        },
      },
      readMore: {
        on: {
          SPACE_KEY: [
            {
              target: 'readMore',
              cond: 'notOnLastPage',
              actions: ['cursorIncrement'],
            },
            {
              target: 'repl',
              actions: ['cursorReset', 'dataReset'],
            },
          ],
          readAll: {
            target: 'repl',
            actions: ['cursorReset'],
          },
        },
      },
      error: {
        on: {
          '': {
            target: 'repl',
            actions: ['printError'],
          },
        },
      },
    },
  },
  {
    actions: {
      cursorIncrement: assign({
        cursor: context => context.cursor + pageLength,
      }),
      cursorReset: assign({
        cursor: context => (context.cursor = 0),
      }),
      dataAssign: assign({ data: (context, event) => event.data }),
      dataReset: context => (context.data = []),
      printError: () => console.log('Some Error occured!'),
    },
    guards: {
      notOnLastPage: (context, event) => context.cursor < context.data.length,
    },
  },
)

const replService = interpret(replMachine).onTransition(state => {
  console.log(state.value)
  console.log(
    `State: ${state.value}
Cursor: ${state.context.cursor},
DataLength: ${state.context.data.length}`,
  )
})

replService.start()

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const repl = parsedData => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.cyan('QSV> '),
  })
  replService.onTransition(state => {
    if (state.value === 'repl') {
      rl.prompt()
      rl.on('line', line => {
        replService.send('ENTER_KEY')
        const sqlParserResult = parse(line)
        const processedTable = executeSql(sqlParserResult, parsedData)
        replService.send('SUCCESS', { data: processedTable })
        const data = replService.state.context.data
        const cursor = replService.state.context.cursor
        const page = data.slice(cursor, cursor + pageLength)
        process.stdout.write(renderTable(page))
        process.stdout.write('\n')
      })
    }
  })
}

process.stdin.on('keypress', (str, key) => {
  if (replService.state.value !== 'readMore') return false

  if (key.ctrl && key.name === 'c') {
    process.exit()
  }

  if (key.name === 'space') {
    replService.send('SPACE_KEY')

    const data = replService.state.context.data
    const cursor = replService.state.context.cursor
    if (cursor < data.length) {
      const page = data.slice(cursor, cursor + pageLength)
      process.stdout.write('\n')
      process.stdout.write(renderTable(page))
      process.stdout.write('\n')
    }
  }
})

module.exports = repl
