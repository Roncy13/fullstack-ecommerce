'use strict'

const ShoppingCartService = use('App/Services/ShoppingCartService')
const Controller = use('App/Utilities/Controller')

class ShoppingCartController extends Controller {

    uuid({ auth }) {
        return ShoppingCartService.uuid(auth)
    }

    add({ request, auth }) {
        const { cart_id, product_id, attributes } = request.all(),
            payload = {
                cart_id,
                product_id,
                attributes
            }
        
        return ShoppingCartService.add(payload, auth)
    }

    list({ params: { cart_id }, auth }) {

        return ShoppingCartService.shoppingList(auth, cart_id)
    }

    update({ params: { item_id, cart_id, customer_id }, request }) {
        const { quantity } = request.all(),
            payload = { item_id, quantity }

        return ShoppingCartService.update(payload, cart_id, customer_id)
    }
}

module.exports = ShoppingCartController
