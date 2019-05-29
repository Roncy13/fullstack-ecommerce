'use strict'

const Model = use('Model')

class Tax extends Model {
    static get table () {
        return 'Tax'
    }

    static get primaryKey () {
        return 'tax_id'
    }
}

module.exports = Tax
