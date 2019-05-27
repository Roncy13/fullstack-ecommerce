'use strict'
const AttributeService = use('App/Services/AttributeService')

class AttributeController {

    list({ params: { attribute_id }}) {
        return AttributeService.list(attribute_id)
    }

    values({ params: { attribute_id } }) {
        return AttributeService.values(attribute_id)
    }

    product({ params: { product_id } }) {
        return AttributeService.product(product_id)
    }
}

module.exports = AttributeController
