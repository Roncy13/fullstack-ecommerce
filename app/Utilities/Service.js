'use strict'

const Database = use('Database')
const { isObject, values: getValues } = require('lodash')
const shortId = require('shortid32')
const ShoppingCartUser = use('App/Models/ShoppingCartUser')

class Service {
    
    constructor(name) {
        this.Cache = use(`App/Utilities/CacheComponents/${name}Cache`)
        this.Model = use(`App/Models/${name}`)
        this.name = name.toLowerCase();
    }

    UUID() {
        return shortId.generate()
    }

    async getCustomerByCart(cart_id) {
        const { customer_id } = await ShoppingCartUser.findBy('cart_id', cart_id)
        
        return customer_id
    }

    async getAuthId(auth) {
        const { customer_id } = await auth.getUser()

        return customer_id
    }

    async byId(id) {
        return await this.Cache.get(id, async() => {
            return await this.Model.findBy(`${this.name}_id`, id)
        })
    }

    pagiFormatter(data) {
        const { total: count, data: rows } = data.toJSON()

        return {
            count: (rows.length > 0) ? count: 0,
            rows
        }
    }

    async pagination(page = 1, order = null, limit = null, sort = null, fields = null) {
       
        limit = (limit === null) ? 20 : limit
        
        const func = async () => {
            const query = this.Model.query()
                
            if (order !== null) {
                query.orderBy(order, sort)  
            }
            
            if (fields !== null) {
                query.select(fields.split(','))
            }

            const result = await query.paginate(page, limit)
    
            return this.pagiFormatter(result)
        }

        return (order === null && limit === 20 && sort === null) ? 
            await this.Cache.cacheSP(`${this.name}-${page}`, func) : 
            await func()
    }

    async callSP(storeProc = "", args = [], call = true) {
        const questions = [],
            values = []
        
        if (isObject(args)) {
            args = getValues(args)
        }

        args.forEach(val => {
            questions.push('?')
            values.push(val)
        })

        const result = async () => (await Database.raw(`CALL ${storeProc}(${questions.join(',')})`, values))[0][0]
        
        return (call) ? this.Cache.cacheSP(`${this.name}-${ values.join(',') }`, result) : result()
    }

    async spNoCache(storeProc = "", args = []) {
        return await this.callSP(storeProc, args, false)
    }
}

module.exports = Service