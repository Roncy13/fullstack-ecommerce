'use strict'

const Database = use('Database')
const { isObject, values: getValues } = require('lodash')
const shortId = require('shortid32')
// const ShoppingCartUser = use('App/Models/ShoppingCartUser')

class Service {
    
    constructor(name) {
        this.Cache = use(`App/Utilities/CacheComponents/${name}Cache`)
        this.Model = use(`App/Models/${name}`)
        this.name = name.toLowerCase();
    }

    UUID() {
        return shortId.generate()
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

    async callSP(storeProc = "", args = [], call = true, append = null) {
        const questions = [],
            values = []
        
        if (isObject(args)) {
            args = getValues(args)
        }

        args.forEach(val => {
            questions.push('?')
            values.push(val)
        })

        const result = async () => (await Database.raw(`CALL ${storeProc}(${questions.join(',')})`, values))[0][0],
            key = (append === null) ? `${ values.join(',') }` : [append, values.join(',')].join('-')

        return (call) ? this.Cache.cacheSP(key, result) : result()
    }

    async callPrepSP(storeProc = "", args = [], append = '', call = true) {
        return this.callSP(storeProc, args, call, append)
    }

    async spNoCache(storeProc = "", args = []) {
        return await this.callSP(storeProc, args, false)
    }

    async CacheQuery(keyword, func) {
        const value = await this.Cache.retrieve(keyword)
        
        if (value) {
            return { data: value, message: 'Data comes From Cache: Query' }
        }

        const data = await func()
        
        await this.Cache.store(keyword, data)

        return { data, message: 'Data comes From Storage: Query' }
    }

    createCacheKey(val, key = null) {
        const word = this.Cache.getCacheKey(val, key)
        
        return word
    }
}

module.exports = Service