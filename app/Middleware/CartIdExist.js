'use strict'

const ShoppingCartUser = use('App/Models/ShoppingCartUser')

class CartIdExist {
  async handle ({ request, auth, params: { cart_id }, response }, next) {
    const { customer_id } = await auth.getUser(),
      CartDetails = await ShoppingCartUser.findBy('cart_id', cart_id)
    
    if (!CartDetails) {
      return response.status(400).json({
        message: 'Cart ID not Exist'
      })
    } else {
      
      const NotPaid = (await CartDetails
        .notPaid(customer_id)
          .fetch()).toJSON()

      if (NotPaid.length === 0) {
        return response.status(400).json({
          message: 'Cart ID Already Ordered...!'
        })
      } else {
        await next()
      }
    }
  }
}

module.exports = CartIdExist
