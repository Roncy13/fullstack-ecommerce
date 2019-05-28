'use strict'

const Model = use('Model')

class ShoppingCart extends Model {

    static get table () {
        return 'shopping_cart'
    }
}

module.exports = ShoppingCart
