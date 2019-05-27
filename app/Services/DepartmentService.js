'use strict'

const Service = use('App/Utilities/Service')

class DepartmentService extends Service {

    constructor(name) {
        super(name)
    }

    list() {
        return this.callSP('catalog_get_departments_list')
    }

    byId(departmentId) {
        return this.callSP('catalog_get_department_details', [departmentId])
    }
}

module.exports = new DepartmentService('Department')