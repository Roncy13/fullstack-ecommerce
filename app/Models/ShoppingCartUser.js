'use strict'

const Model = use('Model')

class ShoppingCartUser extends Model {

    static get table () {
        return 'shopping_cart_user'
    }
}

module.exports = ShoppingCartUser
