'use strict'

const OrderService = use('App/Services/OrderService')

class OrderController {

    async create({ request, auth }) {
        const {
            cart_id,
            shipping_id,
            tax_id
        } = request.post(),
        { customer_id } = await auth.getUser(),
        payload = { cart_id, customer_id, shipping_id, tax_id }

        return (await OrderService.create(payload))[0]
    }

    info({ params: { order_id } }) {
        return OrderService.info(order_id)
    }

    async list({ auth }) {
        const { customer_id } = await auth.getUser()

        return await OrderService.list(customer_id)
    }
}

module.exports = OrderController
