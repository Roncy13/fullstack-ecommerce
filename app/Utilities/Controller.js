'use strict'

const Config = use('Config')
const ERROR_CODES = Config.get('app.ERROR_CODES')

class Controller {

    noData(response, CODE, field = '', status = 400) {

        let ERROR_CODE = {}
        
        if (ERROR_CODES[CODE] !== undefined) {
            const message = ERROR_CODES[CODE]

            ERROR_CODE = {
                message,
                code: CODE,
                status,
                field
            }
        }
        else {
            ERROR_CODE = {
                code: "CODE_404",
                message: 'Error Code Not Found',
                status,
                field
            }
        }

        return response.status(status).json(ERROR_CODE)
    }
}

module.exports = Controller