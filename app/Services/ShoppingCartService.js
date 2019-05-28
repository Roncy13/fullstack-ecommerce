'use strict'
const Service = use('App/Utilities/Service')
const Database = use('Database')
const Customer = use('App/Models/Customer')

class ShoppingCartService extends Service {

    constructor(name) {
        super(name)
    }

    async uuid(auth) {
        const { customer_id } = (await auth.getUser()).toJSON(),
            cartUUID = (await Database.raw(`
                SELECT
                    shopping_cart_user.*
                FROM
                    shopping_cart_user
                LEFT JOIN
                    orders
                ON orders.cart_id = shopping_cart_user.cart_id
                WHERE
                    orders.order_id is NULL AND
                    shopping_cart_user.customer_id = ?
            `, [customer_id]))[0]
        
        if (cartUUID.length === 0) {
            const cart_id = this.UUID(),
                { customer_id } = await auth.getUser(),
                CustomerSC = await Customer.find(customer_id)
            
            await CustomerSC.shoppingCart().create({ cart_id })

            return {
                cart_id
            }
        }
    }

    generateKey(cart_id, customer_id) {
        return `${cart_id}-${customer_id}`
    }

    async add(payload, auth) {

        await this.spNoCache('shopping_cart_add_product', payload)

        const customer_id = await this.getAuthId(auth),
            { cart_id } = payload,
            key = this.generateKey(cart_id, customer_id),
            data = await this.spNoCache('shopping_cart_get_products', [cart_id])
    
        await this.Cache.forever(key, data)
        
        return await this.Cache.retrieveList(key)
    }

    async shoppingList(auth, cart_id) {
        const customer_id = await this.getAuthId(auth),
            shopListKey = this.generateKey(cart_id, customer_id)

        return await this.Cache.retrieveList(shopListKey)
    }

    async update(payload, cart_id, customer_id) {
        
        await this.callSP('shopping_cart_update', payload)

        const key = this.generateKey(cart_id, customer_id),
            data = (await this.Model
                .query()
                    .where('cart_id', cart_id)
                    .fetch()).toJSON()

        await this.Cache.forever(key, data)

        return await this.Cache.retrieveList(key)
    }
}

module.exports = new ShoppingCartService('ShoppingCart')