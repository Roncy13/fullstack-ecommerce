'use strict'
const Cache = require('../Cache')

class Attribute extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new Attribute('ATTRIBUTE')