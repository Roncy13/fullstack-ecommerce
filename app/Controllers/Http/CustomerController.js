'use strict'
const CustomerService = use('App/Services/CustomerService')

class CustomerController {

    register({ request, auth }) {
        const { name, email, password } = request.post();

        return CustomerService.register(name, email, password, auth)
    }

    verify({ request, auth }) {
        const { email, password } = request.post()

        return auth.attempt(email, password)
    }

    info({ auth }) {
        return auth.getUser()
    }

    update({ request, auth }) {
        const { name, email, password, day_phone, eve_phone, mob_phone } = request.all(),
            payload = { 
                name,
                email,
                password,
                day_phone,
                eve_phone,
                mob_phone
            }
        
        return CustomerService.update(payload, auth)
    }
}

module.exports = CustomerController
