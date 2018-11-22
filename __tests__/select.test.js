const { select } = require('./../src/sql-processors/sql-processors')

const data = [
  { name: 'Bob', age: 15, gender: 'male' },
  { name: 'Becka', age: 47, gender: 'female' },
]

describe('select()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(select(['*'], [])).toBeDefined()
    })
  })

  describe('return value:', () => {
    it('should return an array', () => {
      expect(Array.isArray(select(['*'], []))).toBe(true)
    })

    it('should return the correct column', () => {
      expect(select(['name'], data)).toEqual([
        { name: 'Bob' },
        { name: 'Becka' },
      ])
    })

    it('should return the correct columns', () => {
      expect(select(['name', 'age'], data)).toEqual([
        { name: 'Bob', age: 15 },
        { name: 'Becka', age: 47 },
      ])
    })

    it("should return the original array if the column selector is ['*']", () => {
      expect(select(['*'], data)).toEqual(data)
    })
  })
})
