'use strict'

const Schema = use('Schema')

class ShoppingCartUserSchema extends Schema {
  up () {
    this.create('shopping_cart_user', (table) => {
      table.increments()
      table.string('cart_id', 32).notNullable().unique()
      table.integer('customer_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('shopping_cart_user')
  }
}

module.exports = ShoppingCartUserSchema
