'use strict'
const CategoryService = use('App/Services/CategoryService')

class CategoryController {

    list({ request }) {

        const { page = 1, order = null, sort = null, limit = null } = request.get()
        
        return CategoryService.pagination(page, order, limit, sort)
    }

    byId({ params: { category_id } }) {
        return CategoryService.byId(category_id)
    }
}

module.exports = CategoryController
