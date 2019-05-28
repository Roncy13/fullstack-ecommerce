'use strict'

const Service = use('App/Utilities/Service')
const Database = use('Database')

class ProductService extends Service {

    constructor(name) {
        super(name)
    }

    async search(all_words = 'on', query_string, page = 1, limit = 20, description_length = 200) {
       const rows = await this.spNoCache('catalog_search', [
           query_string,
           all_words,
           description_length,
           limit,
           (page - 1) * limit
        ]),
        count = (await this.spNoCache('catalog_count_search_result', [
            query_string,
            all_words
        ]))[0]["count(*)"]

        return {
            count,
            rows
        }
    }

    async categories(inCategoryId, inShortProductDescriptionLength = 200, inProductsPerPage = 20, inStartItem = 1) {
        const { 
            data: [ 
                row_first
            ]} = (await this.callSP('catalog_count_products_in_category', [
            inCategoryId
        ])),
        { categories_count: count } = row_first

        const { data } = await this.callSP('catalog_get_products_in_category', [
            inCategoryId,
            inShortProductDescriptionLength,
            inProductsPerPage,
            (inStartItem - 1) * inProductsPerPage
        ])

        return {
           count,
           data
        }
        
    }

    async department(inDepartmentId, inShortProductDescriptionLength = 200, inProductsPerPage = 20, inStartItem = 1) {
        const { 
            data: [
                firstRow
            ]} = (await this.callSP('catalog_count_products_on_department', [
            inDepartmentId
        ])),
        { products_on_department_count: count } = firstRow

        const { data } = await this.callSP('catalog_get_products_on_department', [
            inDepartmentId,
            inShortProductDescriptionLength,
            inProductsPerPage,
            (inStartItem - 1) * inProductsPerPage
        ])

        return {
           count,
           data
        }
    }

    productDetailsbyId(product_id) {
        return this.callSP('catalog_get_product_details', [product_id])
    }

    productLocationsbyId(product_id) {
        return this.callSP('catalog_get_product_locations', [product_id])
    }

    productReviewsbyId(product_id) {
        return this.callSP('catalog_get_product_reviews', [product_id])
    }
}

module.exports = new ProductService('Product')