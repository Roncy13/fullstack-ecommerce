'use strict'
const Cache = require('../Cache')

class Category extends Cache {

    constructor(key) {
      super(key)
    }
}

module.exports = new Category('CATEGORY')