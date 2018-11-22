const { where } = require('./../src/sql-processors/sql-processors')

const data = [
  { name: 'Bob', age: 15, gender: 'male' },
  { name: 'Becka', age: 47, gender: 'female' },
  { name: 'Cate', age: 15, gender: 'female' },
]

describe('where()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      expect(where({ test: 'test' }, [])).toBeDefined()
    })
  })

  describe('return value:', () => {
    it('should return an array', () => {
      expect(Array.isArray(where([{ test: 'test' }], []))).toBe(true)
    })

    it('should return the original array if a falsy condition is passed', () => {
      expect(where(false, data)).toEqual(data)
    })

    it.each`
      condition                                          | data    | expected
      ${{ lhs: 'name', operator: '=', rhs: 'Bob' }}      | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }]}
      ${{ lhs: 'age', operator: '=', rhs: 15 }}          | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }, { name: 'Cate', age: 15, gender: 'female' }]}
      ${{ lhs: 'gender', operator: '=', rhs: 'female' }} | ${data} | ${[{ name: 'Becka', age: 47, gender: 'female' }, { name: 'Cate', age: 15, gender: 'female' }]}
      ${{ lhs: 'age', operator: '<>', rhs: 15 }}         | ${data} | ${[{ name: 'Becka', age: 47, gender: 'female' }]}
      ${{ lhs: 'age', operator: '<', rhs: 15 }}          | ${data} | ${[]}
      ${{ lhs: 'age', operator: '>', rhs: 15 }}          | ${data} | ${[{ name: 'Becka', age: 47, gender: 'female' }]}
      ${{ lhs: 'age', operator: '<=', rhs: 15 }}         | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }, { name: 'Cate', age: 15, gender: 'female' }]}
      ${{ lhs: 'age', operator: '>=', rhs: 15 }}         | ${data} | ${data}
    `(
      'should return $expected for $condition.lhs, $condition.operator, $condition.rhs',
      ({ condition, data, expected }) => {
        expect(where(condition, data)).toEqual(expected)
      },
    )
  })
})
