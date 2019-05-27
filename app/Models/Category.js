'use strict'

const Model = use('Model')

class Category extends Model {

    static get table () {
        return 'category'
    }

    static get visible() {
        return ['category_id', 'name', 'description' ,'department_id']
    }
}

module.exports = Category
