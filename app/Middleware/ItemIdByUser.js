'use strict'

const ShoppingCart = use('App/Models/ShoppingCart')

class ItemIdByUser {
  async handle ({ response, request, params, auth }, next) {
    const { customer_id } = await auth.getUser(),
      { quantity } = request.all(),
      { item_id } = params,
      Item = await ShoppingCart.findBy('item_id', item_id)

    if (Item) {
      const { customer_id: item_customer_id, cart_id } = (await Item
      .user()
        .first()).toJSON()

      if ( item_customer_id === customer_id ) {
        params.cart_id = cart_id
        params.customer_id = customer_id
        
        await next()
      }
    }
  }
}

module.exports = ItemIdByUser
