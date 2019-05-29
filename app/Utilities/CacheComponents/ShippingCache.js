'use strict'
const Cache = require('../Cache')

class Shipping extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new Shipping('SHIPPING')