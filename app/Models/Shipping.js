'use strict'

const Model = use('Model')

class Shipping extends Model {

    static get table () {
        return 'shipping'
    }
}

module.exports = Shipping
