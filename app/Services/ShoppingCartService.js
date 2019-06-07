'use strict'
const Service = use('App/Utilities/Service')
const Database = use('Database')
const Customer = use('App/Models/Customer')
const ShoppingCartUser = use('App/Models/ShoppingCartUser')

class ShoppingCartService extends Service {

    constructor(name) {
        super(name)
    }

    async getCustomerByCart(cart_id) {
        const { customer_id } = await ShoppingCartUser.findBy('cart_id', cart_id)
        
        return customer_id
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
                ORDER BY 
                    id desc
                LIMIT 1
            `, [customer_id]))[0]
        
        if (cartUUID.length === 0) {
            const cart_id = this.UUID(),
                { customer_id } = await auth.getUser(),
                CustomerSC = await Customer.find(customer_id)
            
            await CustomerSC.shoppingCart().create({ cart_id })

            return { cart_id }
        } else {
            const { cart_id } = cartUUID[0]

            return { cart_id }
        }
    }

    generateKey(cart_id, customer_id) {
        return this.Cache.getCacheKey(cart_id, customer_id)
    }

    async add(payload, auth) {

        await this.spNoCache('shopping_cart_add_product', payload)

        const customer_id = await this.getAuthId(auth),
            { cart_id } = payload,
            key = `SHOPPING-CART-${this.generateKey(cart_id, customer_id)}`,
            data = await this.spNoCache('shopping_cart_get_products', [cart_id])

        await this.Cache.forever(key, data)
        
        const result = await this.Cache.retrieveList(key)

        return result
    }

    async shoppingList(auth, cart_id) {
        const customer_id = await this.getAuthId(auth),
            shopListKey = this.generateKey(cart_id, customer_id),
            { data } = await this.Cache.get(shopListKey, async () => {
                return await this.spNoCache('shopping_cart_get_products', [cart_id])
            }, false)
       
        return data
    }

    async update(payload, cart_id, customer_id) {
        await this.callSP('shopping_cart_update', payload)

        const key = `SHOPPING-CART-${this.generateKey(cart_id, customer_id)}`,
            data = await this.spNoCache('shopping_cart_get_products', [cart_id])

        await this.Cache.forever(key, data)

        return await this.Cache.retrieveList(key)
    }

    async empty(cart_id) {
        await this.spNoCache('shopping_cart_empty', [cart_id])

        const customer_id = await this.getCustomerByCart(cart_id),
            key = `SHOPPING-CART-${this.generateKey(cart_id, customer_id)}`

        return await this.Cache.remove(key)
    }

    async getCartDb(cart_id) {
        const ShopUser = await this
            .Model
                .query()
                    .where({ cart_id })
                    .fetch()
        
        return (ShopUser) ? ShopUser.toJSON() : []
    }

    async move(payload) {
        const { item_id, customer_id, cart_id } = payload

        await this.spNoCache('shopping_cart_move_product_to_cart', [item_id])
        
        const newDetails = await this.getCartDb(cart_id, customer_id),
            key = `SHOPPING-CART-${this.generateKey(cart_id, customer_id)}`

        await this.Cache.forever(key, newDetails)

        return newDetails
    }

    async totalAmount(cart_id) {
        const totalkey = `total-amount-${cart_id}`,
            func = async () => {
                return await this.spNoCache('shopping_cart_get_total_amount', [cart_id])
            },
            { data } = await this.Cache.get(totalkey, func, false)
        
        return data[0]
    }

    async later(payload) {
        const {
            customer_id,
            cart_id,
            item_id
        } = payload,
        key = `SHOPPING-CART-${this.generateKey(cart_id, customer_id)}`

        await this.spNoCache('shopping_cart_save_product_for_later', [item_id])
        await this.Cache.remove(key)
        const data = await this.callSP('shopping_cart_get_products', [cart_id])
        await this.Cache.forever(key, data)

        return data
    }

    async save(cart_id) {
        return this.Model
            .query()
                .where({ cart_id })
                .andWhere('buy_now', false)
                .fetch()
    }

    async remove(cart_id, customer_id, item_id) {
        
        const key = `SHOPPING-CART-${this.generateKey(cart_id, customer_id)}`

        await this.spNoCache('shopping_cart_remove_product', [item_id])
        await this.Cache.remove(key)

        const data = await this.spNoCache('shopping_cart_get_products', [cart_id])
        await this.Cache.forever(key, data)
       
        return data
    }
}

module.exports = new ShoppingCartService('ShoppingCart')