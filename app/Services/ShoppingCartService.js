'use strict'

const Service = use('App/Utilities/Service')

class ShoppingCartService extends Service {

    constructor(name) {
        super(name)
    }

   
}

module.exports = new ShoppingCartService('ShoppingCart')