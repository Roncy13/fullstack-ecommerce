'use strict'
const AttributeService = use('App/Services/AttributeService')
const { filter } = require('lodash')

class AddAttribute {
  async handle ({ request }, next) {
    const { product_id } = request.post(),
      attributes = await AttributeService.product(product_id),
      attr = ''

    if (attributes) {
      const getSizes = filter(attributes, { attribute_name: 'Size' }),
        getColors = filter(attributes, { attribute_name: 'Color' })
    }

    await next()
  }
}

module.exports = AddAttribute
