const readFile = require('./../src/readFile')

describe('readFile()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(readFile('fake/files/test-simple.csv', 'utf8')).toBeDefined()
    })
  })
})
