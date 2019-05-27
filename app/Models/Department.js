'use strict'

const Model = use('Model')

class Department extends Model {

    static get table () {
        return 'department'
    }
}

module.exports = Department
