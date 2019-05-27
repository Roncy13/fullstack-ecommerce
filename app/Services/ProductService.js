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
           page - 1
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
        ]))

        const { data } = await this.callSP('catalog_get_products_in_category', [
            inCategoryId,
            inShortProductDescriptionLength,
            inProductsPerPage,
            inStartItem - 1
        ])

        return {
           count: row_first.categories_count,
           data
        }
        
    }
}

module.exports = new ProductService('Product')