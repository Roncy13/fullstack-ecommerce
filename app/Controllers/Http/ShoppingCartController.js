'use strict'

const ShoppingCartService = use('App/Services/ShoppingCartService')
const Controller = use('App/Utilities/Controller')
const uuidv1 = require('uuid/v1');

class ShoppingCartController extends Controller {

    uuid() {
        const cart_id = uuidv1()

        return { cart_id }
    }
}

module.exports = ShoppingCartController
