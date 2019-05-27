'use strict'

const ProductService = use('App/Services/ProductService')
const Controller = use('App/Utilities/Controller')

class ProductController extends Controller {

    async byId({ params: { id }, response }) {
        //const result = await ProductService.byId(id)

        //return (result) ? result : this.noData(response, 'PROD_01', 'id')
        const result = await await Database
            .raw('CALL catalog_get_departments_list()')
        
        console.log(result)

        return result[0][0]
            //.raw('select * from users where username = ?', [username])
    }

    page({ request }) {
        const { page = 1, order = null, sort = null, limit = null } = request.get()
        
        return ProductService.pagination(page, order, limit, sort, 'product_id, name, description, price, discounted_price, thumbnail')
    }
}

module.exports = ProductController