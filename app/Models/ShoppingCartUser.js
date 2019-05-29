'use strict'

const Model = use('Model')

class ShoppingCartUser extends Model {

    static get table () {
        return 'shopping_cart_user'
    }

    details() {
        return this
            .hasMany(
                'App/Models/ShoppingCart',
                'cart_id',
                'cart_id'
            )
    }

    notPaid() {
        const details = this.details()
        return details.whereDoesntHave('orders')
    }
}

module.exports = ShoppingCartUser
