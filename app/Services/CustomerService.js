'use strict'

const Service = use('App/Utilities/Service')
const { map, merge, pickBy, identity, values } = require('lodash')

class CustomerService extends Service {

    constructor(name) {
        super(name)
    }

    async register(name, email, password, auth) {
        const data = await this.Model.create({
            name,
            email,
            password
        }),
        { customer_id } = data.toJSON()

            
        const customer = await this.getUserById(customer_id),
            { token: accessToken } = await auth.generate(data)
        
        return {
            customer,
            accessToken
        }
    }

    verify(email, password) {
        return 
    }

    getUserById(customer_id) {
        return this.Model.find(customer_id)
    }

    async update(payload, auth) {
        const { customer_id } = (await auth.getUser()).toJSON(),
            user = (await this.Model
                .query()
                    .select(['customer_id', 'name', 'email', 'password', 'day_phone', 'eve_phone', 'mob_phone'])
                    .setVisible(['customer_id', 'name', 'email', 'password', 'day_phone', 'eve_phone', 'mob_phone'])
                    .where({ customer_id })
                        .first()
            ).toJSON(),
            update = map(
                values(
                    merge(user, pickBy(payload, identity))
                ), (value) => 
                ( value === null ) ? '' : value
            )

        await this.spNoCache('customer_update_account', update)

        return this.getUserById(customer_id)
    }

    async address(payload, auth) {
        const { customer_id } = (await auth.getUser()).toJSON(),
            fields = [
                'customer_id',
                'address_1',
                'address_2',
                'city',
                'region',
                'postal_code',
                'country',
                'shipping_region_id'
            ],
            user = (await this.Model
                .query()
                    .select(fields)
                    .setVisible(fields)
                    .where({ customer_id })
                        .first()
            ).toJSON(),
            update = map(
                values(
                    merge(user, pickBy(payload, identity))
                ), (value) => 
                ( value === null ) ? '' : value
            )

        await this.spNoCache('customer_update_address', update)

        return this.getUserById(customer_id)
    }
}

module.exports = new CustomerService('Customer')