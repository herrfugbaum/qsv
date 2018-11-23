const select = require('./select')
const where = require('./where')
const orderBy = require('./orderBy')
const limit = require('./limit')

/**
 * Exports the sql-processor functions under it's namespace
 * @module sql-processors
 * @requires select
 * @requires where
 * @requires orderBy
 * @requires limit
 * @see module:sql-processors/select
 * @see module:sql-processors/where
 * @see module:sql-processors/orderBy
 * @see module:sql-processors/limit
 */

module.exports = {
  select,
  where,
  orderBy,
  limit,
}
