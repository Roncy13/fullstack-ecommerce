'use strict'

const Service = use('App/Utilities/Service')

class CategoryService extends Service {

    constructor(name) {
        super(name)
    }

    list(page = 1, order = null, limit = 20, sort = 'asc') {
        return this.Cache.get('categories', async() => {
            const query =  
                this.Model
                    .query()
                    .orderBy(order, sort)
                    .paginate(page, limit)

            return data
        })
    }

    byId(departmentId) {
        return this.callSP('catalog_get_department_details', [departmentId])
    }


}

module.exports = new CategoryService('Category')