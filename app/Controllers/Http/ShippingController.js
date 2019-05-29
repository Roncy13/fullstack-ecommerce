'use strict'

const ShippingService = use('App/Services/ShippingService')

class ShippingController {

    list() {
        return ShippingService.regions()
    }

    info({ params: { shipping_id } }) {
        return ShippingService.info(shipping_id)
    }
}

module.exports = ShippingController
