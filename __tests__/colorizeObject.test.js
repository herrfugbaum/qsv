const colorizeObject = require('./../src/util/colorizeObject')

describe('colorizeObject()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(colorizeObject({})).toBeDefined()
    })
  })
})
