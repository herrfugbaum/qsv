const parse = require('@herrfugbaum/q')
const executeSql = require('./../src/excuteSql')

const data = [
  { name: 'Bob', age: 15, gender: 'male' },
  { name: 'Becka', age: 47, gender: 'female' },
  { name: 'Cate', age: 15, gender: 'female' },
]

describe('executeSql()', () => {
  describe('smoke:', () => {
    it('should be defined', () => {
      const statement = parse('SELECT * FROM table')
      expect(executeSql(statement, [])).toBeDefined()
    })
  })

  describe('queries:', () => {
    it.each`
      query                                                           | data    | expected
      ${'SELECT * FROM table'}                                        | ${data} | ${data}
      ${'SELECT name FROM table'}                                     | ${data} | ${[{ name: 'Bob' }, { name: 'Becka' }, { name: 'Cate' }]}
      ${'SELECT name, age FROM table'}                                | ${data} | ${[{ name: 'Bob', age: 15 }, { name: 'Becka', age: 47 }, { name: 'Cate', age: 15 }]}
      ${'SELECT name, age, gender FROM table'}                        | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }, { name: 'Becka', age: 47, gender: 'female' }, { name: 'Cate', age: 15, gender: 'female' }]}
      ${'SELECT * FROM table ORDER BY age'}                           | ${data} | ${[{ name: 'Bob', age: 15, gender: 'male' }, { name: 'Cate', age: 15, gender: 'female' }, { name: 'Becka', age: 47, gender: 'female' }]}
      ${'SELECT name FROM table ORDER BY age'}                        | ${data} | ${[{ name: 'Bob' }, { name: 'Cate' }, { name: 'Becka' }]}
      ${'SELECT * FROM table WHERE age > 20 ORDER BY age'}            | ${data} | ${[{ name: 'Becka', age: 47, gender: 'female' }]}
      ${'SELECT name FROM table WHERE age < 20 ORDER BY age LIMIT 2'} | ${data} | ${[{ name: 'Bob' }, { name: 'Cate' }]}
      ${'SELECT * FROM table LIMIT 0'}                                | ${data} | ${data}
    `(
      'should return the correct result for $query',
      ({ query, data, expected }) => {
        const statement = parse(query)
        expect(executeSql(statement, data)).toEqual(expected)
      },
    )
  })

  describe('errors:', () => {
    it('should return falsy when called without a query', () => {
      expect(executeSql('', data)).toBeFalsy()
    })

    it('should return falsy when called with invalid arguments', () => {
      expect(
        executeSql({ selectClause: true, whereClause: true }, data),
      ).toBeFalsy()
    })
  })
})
