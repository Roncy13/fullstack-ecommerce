'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (customerInstance) => {
      if (customerInstance.dirty.password) {
        customerInstance.password = await Hash.make(customerInstance.password)
      }
    })
  }

  static get primaryKey () {
    return 'customer_id'
  }

  static get table () {
    return 'customer'
  }

  static get updatedAtColumn () {
    return null
  }

  static get createdAtColumn () {
    return null
  }

  static get visible() {
    return [ 'customer_id', 'name', 'email', 'credit_card', 'address_1', 'address_2', 'city', 'region', 'postal_code', 'country', 'shipping_region_id', 'day_phone', 'eve_phone', 'mob_phone' ]
  }
}

module.exports = Customer
