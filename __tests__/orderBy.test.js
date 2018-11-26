const { orderBy } = require('./../src/sql-processors/sql-processors')

const data = [
  { name: 'Bob', age: 15, gender: 'male' },
  { name: 'Becka', age: 47, gender: 'female' },
]

describe('orderBy()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(orderBy([], [], [])).toBeDefined()
    })
  })

  describe('return value:', () => {
    it('should return an array', () => {
      expect(Array.isArray(orderBy([], [], []))).toBe(true)
    })

    it.each`
      columns    | orders      | data    | expected
      ${['age']} | ${['DESC']} | ${data} | ${[{ name: 'Becka', age: 47, gender: 'female' }, { name: 'Bob', age: 15, gender: 'male' }]}
      ${['age']} | ${['ASC']}  | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }, { name: 'Becka', age: 47, gender: 'female' }]}
      ${['age']} | ${[]}       | ${data} | ${data}
      ${[]}      | ${['ASC']}  | ${data} | ${data}
      ${[]}      | ${[]}       | ${data} | ${data}
      ${''}      | ${''}       | ${data} | ${data}
    `(
      'should return $columns in $orders',
      ({ columns, orders, data, expected }) => {
        expect(orderBy(columns, orders, data)).toEqual(expected)
      },
    )

    it('should return the original array if no orders are passed', () => {
      expect(orderBy(['age'], [], data)).toEqual(data)
    })
  })
})
