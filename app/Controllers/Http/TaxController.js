'use strict'

const TaxService = use('App/Services/TaxService')

class TaxController {

    list() {
        return TaxService.list()
    }

    info({ params: { tax_id } }) {
        return TaxService.info(tax_id)
    }
}

module.exports = TaxController
