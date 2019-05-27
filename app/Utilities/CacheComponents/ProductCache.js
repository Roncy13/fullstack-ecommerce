'use strict'
const Cache = require('../Cache')

class ProductCache extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new ProductCache('PRODUCT')