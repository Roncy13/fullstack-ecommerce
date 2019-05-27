'use strict'

const Model = use('Model')

class Product extends Model {

    static get table () {
        return 'product'
    }

    category() {
        return this
            .belongsToMany(
                'App/Models/Category',
                'product_id',
                'category_id',
                'product_id',
                'category_id'
            )
            .pivotTable('product_category')
    }
}

module.exports = Product
