'use strict'
const Cache = require('../Cache')

class TaxCache extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new TaxCache('TAX')