'use strict'

const Service = use('App/Utilities/Service')

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
           page
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
}

module.exports = new ProductService('Product')