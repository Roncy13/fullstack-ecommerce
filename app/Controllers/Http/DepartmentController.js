'use strict'
const DepartmentService = use('App/Services/DepartmentService')
const Controller = use('App/Utilities/Controller')

class DepartmentController extends Controller {
    
    async list() {
        const { data } = await DepartmentService.list()

        return data
    }

    async byId({ params: { department_id } }) {
        const { data } = await DepartmentService.byId(department_id)

        return data.length > 0 ? data[0] : {}
    }
}

module.exports = DepartmentController
