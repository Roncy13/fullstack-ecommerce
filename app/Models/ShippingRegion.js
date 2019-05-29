'use strict'

const Model = use('Model')

class ShippingRegion extends Model {

    static get table () {
        return 'shipping_region'
    }
}

module.exports = ShippingRegion
