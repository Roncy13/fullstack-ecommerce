'use strict'
const CategoryService = use('App/Services/CategoryService')

class CategoryController {

    page({ request }) {

        const { page = 1, order = null, sort = null, limit = null } = request.get()
        
        return CategoryService.pagination(page, order, limit, sort)
    }

    list() {
        return CategoryService.list()
    }

    byId({ params: { category_id } }) {
        return CategoryService.byId(category_id)
    }

    product({ params: { product_id } }) {
        return CategoryService.product(product_id)
    }

    department({ params: { department_id }}) {
        return CategoryService.department(department_id)
    }
}

module.exports = CategoryController
