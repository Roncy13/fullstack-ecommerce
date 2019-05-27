'use strict'
const Cache = require('../Cache')

class Department extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new Department('DEPARTMENT')