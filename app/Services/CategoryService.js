'use strict'

const Service = use('App/Utilities/Service')
const ProductModel = use('App/Models/Product')
const { pick } = require('lodash')

class CategoryService extends Service {

    constructor(name) {
        super(name)
    }

    async list() {
        const { data } = await this.Cache.cacheSP( `category-list`, async() => 
            this.Model.all()
        )

        return data
    }

    byId(category_id) {
        return this.callSP('catalog_get_category_details', [category_id])
    }
    
    async department(department_id) {
        return this.Cache.cacheSP( `department-${department_id}`, async () => 
            await this
                .Model
                .findBy('department_id', department_id)
        )
    }

    async product(product_id) {
        const product = await ProductModel.findBy('product_id', product_id)

        if (product) {
            const result = await product.category().select(['category_id' , 'name', 'department_id']).fetch()

            if (result) {
                return this.Cache.cacheSP( `product-${product_id}`, async () => {
                        const data = result.toJSON()
                        
                        return data.map(({
                            category_id,
                            department_id,
                            name
                        }) => {
                            return {
                                category_id,
                                department_id,
                                name
                            }
                        })
                    }
                )
            }
        }
    }
}

module.exports = new CategoryService('Category')