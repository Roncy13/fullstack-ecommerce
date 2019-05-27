'use strict'
const AttributeService = use('App/Services/AttributeService')

class AttributeController {

    list({ params: { attribute_id }}) {
        return AttributeService.list(attribute_id)
    }
}

module.exports = AttributeController
