'use strict'

const Service = use('App/Utilities/Service')

class AttributeService extends Service {

    constructor(name) {
        super(name)
    }

    list(attribute_id) {
        return this.callPrepSP('catalog_get_attribute_details', [attribute_id], 'details')
    }

    values(attribute_id) {
        return this.callPrepSP('catalog_get_attribute_values', [attribute_id], 'values')
    }

    product(product_id) {
        return this.callPrepSP('catalog_get_product_attributes', [product_id], 'product-attributes')
    }
}

module.exports = new AttributeService('Attribute')