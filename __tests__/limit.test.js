const { limit } = require('./../src/sql-processors/sql-processors')

const data = [
  { name: 'Bob', age: 15, gender: 'male' },
  { name: 'Becka', age: 47, gender: 'female' },
  { name: 'Cate', age: 15, gender: 'female' },
]

describe('select()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(limit(false, [])).toBeDefined()
    })
  })

  describe('return value:', () => {
    it('should return an array', () => {
      expect(Array.isArray(limit(false, []))).toBe(true)
    })

    it('should return the original array if a falsy limit is passed', () => {
      expect(limit(false, data)).toEqual(data)
    })

    it.each`
      stop | data    | expected
      ${0} | ${data} | ${data}
      ${1} | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }]}
      ${2} | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }, { name: 'Becka', age: 47, gender: 'female' }]}
      ${3} | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }, { name: 'Becka', age: 47, gender: 'female' }, { name: 'Cate', age: 15, gender: 'female' }]}
    `(
      'should return $stop rows for LIMIT $stop',
      ({ stop, data, expected }) => {
        expect(limit(stop, data)).toEqual(expected)
      },
    )
  })
})
