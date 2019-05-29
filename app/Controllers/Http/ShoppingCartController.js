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
    
    delete({ params: { cart_id } }) {
        return ShoppingCartService.empty(cart_id)
    }

    move({ params: { cart_id, customer_id, item_id } }) {
        const payload = {
            cart_id,
            customer_id,
            item_id
        }

        return ShoppingCartService.move(payload)
    }

    async totalAmount({ params: { cart_id } }) {
        return await ShoppingCartService.totalAmount(cart_id)
    }

    later({ params: { cart_id, customer_id, item_id } }) {

        return ShoppingCartService.later({
            cart_id,
            customer_id,
            item_id
        })
    }

    saved({ params: { cart_id } }) {
        return ShoppingCartService.save(cart_id)
    }

    remove({ params: { cart_id, customer_id, item_id } }) {
        return ShoppingCartService.remove(cart_id, customer_id, item_id)
    }
}

module.exports = ShoppingCartController
