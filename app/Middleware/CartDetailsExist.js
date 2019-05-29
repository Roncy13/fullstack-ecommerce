'use strict'

const ShoppingCartUser = use('App/Models/ShoppingCartUser')

class CartDetailsExist {
  async handle ({ request, auth, params: { cart_id }, response }, next) {
    const { customer_id } = await auth.getUser(),
      CartDetails = await ShoppingCartUser.findBy('cart_id', cart_id)
    
    if (!CartDetails) {
      return response.status(400).json({
        message: 'Cart ID not Exist'
      })
    } else {
      
      // Check if having details

      const Details = (await CartDetails.details().fetch()).toJSON()

      if (Details.length === 0) {
        return response.status(400).json({
          message: "Cart is Empty...!"
        })
      }

      await next()
    }
  }
}

module.exports = CartDetailsExist
