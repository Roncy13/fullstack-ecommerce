'use strict'

const Service = use('App/Utilities/Service')

class CategoryService extends Service {

    constructor(name) {
        super(name)
    }

    byId(departmentId) {
        return this.callSP('catalog_get_department_details', [departmentId])
    }
}

module.exports = new CategoryService('Category')