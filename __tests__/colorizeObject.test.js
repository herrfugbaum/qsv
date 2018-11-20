const colorizeObject = require('./../src/util/colorizeObject')
const chalk = require('chalk')

describe('colorizeObject()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(colorizeObject({})).toBeDefined()
    })
  })
  describe('return value:', () => {
    it('should return an array', () => {
      expect(Array.isArray(colorizeObject({}))).toBe(true)
    })

    it('should colorize numbers in yellow', () => {
      expect(colorizeObject({ age: 100 })).toContain(chalk.yellow(100))
    })

    it('should colorize strings in green', () => {
      expect(colorizeObject({ name: 'Harry' })).toContain(chalk.green('Harry'))
    })

    it('should work with strings and numbers', () => {
      expect(colorizeObject({ age: 100, name: 'Harry' })).toEqual([
        chalk.yellow(100),
        chalk.green('Harry'),
      ])
    })
  })
})
