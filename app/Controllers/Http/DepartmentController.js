'use strict'
const DepartmentService = use('App/Services/DepartmentService')

class DepartmentController {
    
    list() {
        return DepartmentService.list()
    }

    byId({ params: { department_id } }) {
        return DepartmentService.byId(department_id)
    }
}

module.exports = DepartmentController
