'use strict'

const Model = use('Model')

class ShoppingCart extends Model {

    static get table () {
        return 'shopping_cart'
    }

    user() {
        return this
            .belongsTo(
                'App/Models/ShoppingCartUser',
                'cart_id',
                'cart_id'
            )
    }
}

module.exports = ShoppingCart
