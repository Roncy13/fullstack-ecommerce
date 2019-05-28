'use strict'

const ProductService = use('App/Services/ProductService')
const Controller = use('App/Utilities/Controller')

class ProductController extends Controller {

    async byId({ params: { id }, response }) {
        const result = await ProductService.byId(id)

        return (result) ? result : this.noData(response, 'PROD_01', 'id')
    }

    page({ request }) {
        const { page = 1, order = null, sort = null, limit = null } = request.get()
        
        return ProductService.pagination(page, order, limit, sort, 'product_id, name, description, price, discounted_price, thumbnail')
    }

    async search({ request }) {
        const { all_words = 'on', query_string, page = 0, limit = 20, description_length = 200 } = request.get()

        return await ProductService.search(all_words, query_string, page, limit, description_length)
    }

    async categories ({ request, params: { category_id } }) {
        const { page = 1, limit = 20, description_length = 200 } = request.get()

        return await ProductService.categories(category_id, description_length, limit, page)
    }

    async department({ request, params: { department_id } }) {
        const { page = 1, limit = 20, description_length = 200 } = request.get()

        return await ProductService.department(department_id, description_length, limit, page)
    }

    productDetailsbyId({ params: { product_id } }) {
        return ProductService.productDetailsbyId(product_id)
    }

    productLocationsbyId({ params: { product_id } }) {
        return ProductService.productLocationsbyId(product_id)
    }

    productReviewsbyId({ params: { product_id } }) {
        return ProductService.productReviewsbyId(product_id)
    }
}

module.exports = ProductController