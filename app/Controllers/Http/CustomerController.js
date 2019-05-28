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

    address({ request, auth }) {
        const {
            address_1,
            address_2,
            city,
            region,
            postal_code,
            country,
            shipping_region_id
        } = request.all()
        ,payload = {
            address_1,
            address_2,
            city,
            region,
            postal_code,
            country,
            shipping_region_id
        }

        return CustomerService.address(payload, auth)
    }

    creditCard({ request, auth}) {
        const {
            credit_card
        } = request.all()

        return CustomerService.creditCard({ credit_card }, auth)
    }
}

module.exports = CustomerController
