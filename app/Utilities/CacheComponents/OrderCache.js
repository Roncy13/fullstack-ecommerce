'use strict'
const Cache = require('../Cache')

class Order extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new Order('ORDER')