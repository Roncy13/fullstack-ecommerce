'use strict'

const Service = use('App/Utilities/Service')

class ProductService extends Service {

    constructor(name) {
        super(name)
    }
}

module.exports = new ProductService('Product')