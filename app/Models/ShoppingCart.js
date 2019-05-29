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

    orders(customer_id) {
        return this
            .hasOne(
                'App/Models/Order',
                'cart_id',
                'cart_id'
            )
    }
}

module.exports = ShoppingCart
