'use strict'
const CategoryService = use('App/Services/CategoryService')

class CategoryController {

    list() {
        return CategoryService.list()
    }

    byId({ params: { category_id } }) {
        return CategoryService.byId(category_id)
    }
}

module.exports = CategoryController
