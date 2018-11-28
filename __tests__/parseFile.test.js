expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)]),
    )

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received,
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received,
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      }
    }
  },
})

const parseFile = require('./../src/parseFile')

const simple = 'c,s,v,d,a,t,a'

const simpleWithHeaders = 'name,age,gender\r\nBob,15,male'

const simpleWithoutHeaders = 'Bob,15,male'

const simpleWithEmptyLines = 'c,s,v\r\n\r\n\r\nd,a,t\r\na'

describe('parseFile()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(parseFile(simple)).toBeDefined()
    })
  })

  describe('return value:', () => {
    it('should return an array of objects', async () => {
      const result = await parseFile(simpleWithHeaders, { header: true })
      expect(result).toContainObject({
        name: 'Bob',
        age: 15,
        gender: 'male',
      })
    })

    it('should work for data without headers', async () => {
      const result = await parseFile(simpleWithoutHeaders, { header: false })
      expect(result).toContainObject({
        0: 'Bob',
        1: 15,
        2: 'male',
      })
    })

    it('should not contain empty lines', async () => {
      const result = await parseFile(simpleWithEmptyLines, { header: false })
      expect(result).toEqual([
        { 0: 'c', 1: 's', 2: 'v' },
        { 0: 'd', 1: 'a', 2: 't' },
        { 0: 'a' },
      ])
    })
  })

  describe('errors:', () => {
    it('should throw if called without arguments', async () => {
      expect(parseFile()).rejects.toThrowError(/^Failed to parse data\.$/)
    })

    it('should throw if called with an object as argument', async () => {
      expect(parseFile({})).rejects.toThrowError(/^Failed to parse data\.$/)
    })

    it('should throw if called with an array as argument', async () => {
      expect(parseFile([])).rejects.toThrowError(/^Failed to parse data\.$/)
    })
  })
})
