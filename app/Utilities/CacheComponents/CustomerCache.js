'use strict'
const Cache = require('../Cache')

class Customer extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new Customer('CUSTOMER')