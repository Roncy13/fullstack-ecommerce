'use strict'
const Service = use('App/Utilities/Service')

class OrderService extends Service {

    constructor(name) {
        super(name)
    }

    async create(payload) {
        const result = await this.spNoCache('shopping_cart_create_order', payload),
            { customer_id } = payload,
            list = await this.spNoCache('orders_get_by_customer_id', [customer_id]),
            key = await this.Cache.getCacheKey(customer_id)

        await this.Cache.store(key, list)
        
        return result
    }

    async info(order_id) {
        const result = await this.callSP('orders_get_order_info', [order_id])

        return result
    }

    async list(customer_id) {
        const result = await this.callSP('orders_get_by_customer_id', [customer_id])

        return result
    }
}

module.exports = new OrderService('Order')