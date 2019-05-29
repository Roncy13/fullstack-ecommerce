'use strict'

const Service = use('App/Utilities/Service')

class Shipping extends Service {

    constructor(name) {
        super(name)
    }

    regions() {
        return this.callSP('customer_get_shipping_regions')
    }

    info(shipping_id) {
        return this.callSP('orders_get_shipping_info', [shipping_id])
    }
}

module.exports = new Shipping('Shipping')