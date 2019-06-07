'use strict'

const Service = use('App/Utilities/Service')

class AttributeService extends Service {

    constructor(name) {
        super(name)
    }

    async list() {
        const { data } = await this.callPrepSP('catalog_get_attributes', [], 'list')

        return data
    }

    async byId(attribute_id) {
        const { data } = await this.callPrepSP('catalog_get_attribute_details', [attribute_id], 'details')

        return data
    }

    async values(attribute_id) {
        const { data } = await this.callPrepSP('catalog_get_attribute_values', [attribute_id], 'values')

        return data
    }

    async product(product_id) {
        const { data } = await this.callPrepSP('catalog_get_product_attributes', [product_id], 'product-attributes')

        return data
    }
}

module.exports = new AttributeService('Attribute')