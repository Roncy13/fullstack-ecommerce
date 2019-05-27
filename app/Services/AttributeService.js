'use strict'

const Service = use('App/Utilities/Service')

class AttributeService extends Service {

    constructor(name) {
        super(name)
    }

    list(attribute_id) {
        return this.callSP('catalog_get_attribute_details', [attribute_id])
    }

    values(attribute_id) {
        return this.callSP('catalog_get_attribute_values', [attribute_id])
    }

    product(product_id) {
        return this.callSP('catalog_get_product_attributes', [product_id])
    }
}

module.exports = new AttributeService('Attribute')