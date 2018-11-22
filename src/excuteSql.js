const {
  select,
  where,
  orderBy,
  limit,
} = require('./sql-processors/sql-processors')

const executeSql = (sqlParserResult, parsedData) => {
  // LIMIT param setup
  const limitStop = sqlParserResult.limitClause
    ? sqlParserResult.limitClause.limit
    : false

  // WHERE param setup
  const whereCondition = sqlParserResult.whereClause
    ? sqlParserResult.whereClause.condition
    : false

  // ORDER BY param setup
  let columnOrders = []
  let columnsToOrder = []
  if (sqlParserResult.orderByClause) {
    // temporarily hardcoded as arrays, until the parser is ready to understand multiple order by conditions
    columnOrders = [sqlParserResult.orderByClause.condition]
    columnsToOrder = [sqlParserResult.orderByClause.expression]
  }

  // SELECT param setup
  const columns = sqlParserResult.selectClause
    ? sqlParserResult.selectClause.columns
    : false

  if (sqlParserResult.type === 'SELECT_STMT') {
    //const selectResult = select(columns, parsedData)
    const whereResult = where(whereCondition, parsedData)
    const orderByResult = orderBy(columnsToOrder, columnOrders, whereResult)
    const limitResult = limit(limitStop, orderByResult)
    // select() needs to get called last, because it removes "columns" when called with a different column selector than "*"
    const selectResult = select(columns, limitResult)

    return selectResult
  }
}

module.exports = executeSql
