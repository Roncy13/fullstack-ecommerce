'use strict'
const Cache = require('../Cache')

class ShoppingCart extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new ShoppingCart('SHOPPING-CART')