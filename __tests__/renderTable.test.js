const renderTable = require('./../src/renderTable')

const data = [['Test', 'Test', 'Test'], ['Test', 'Test', 'Test']]

describe('renderTable()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(renderTable(data)).toBeDefined()
    })
  })
  describe('return value:', () => {
    it('should return a string', () => {
      expect(typeof renderTable(data)).toBe('string')
    })
  })
})
