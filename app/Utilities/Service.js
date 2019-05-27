'use strict'

const Database = use('Database')

class Service {
    
    constructor(name) {
        this.Cache = use(`App/Utilities/CacheComponents/${name}Cache`)
        this.Model = use(`App/Models/${name}`)
        this.name = name;
    }

    async byId(id) {
        return await this.Cache.get(id, async() => {
            return await this.Model.find(id)
        })
    }

    pagiFormatter(data) {
        const { total: count, data: rows } = data.toJSON()

        return {
            count,
            rows
        }
    }

    async pagination(page = 1, order = null, limit = null, sort = null) {
       
        limit = (limit === null) ? 20 : limit
        
        if (order === null && limit === 20 && sort === null) {

            return await this.Cache.cacheSP(`${this.name}-${page}`, async() => {
                const query = this.Model.query()
                
                if (order != null) {
                    query.orderBy(order, sort)  
                }
    
                const result = await query.paginate(page, limit)
                
                return this.pagiFormatter(result)
            })
        }

        const query = this.Model.query()
                
        if (order !== null) {
            query.orderBy(order, sort)  
        }

        const result = await query.paginate(page, limit)

        return this.pagiFormatter(result)
    }

    async callSP(storeProc = "", args = []) {
        const questions = [],
            values = []
        
        console.log(args)

        args.forEach(val => {
            questions.push('?')
            values.push(val)
        })

        console.log(questions, values)

        const result = async () => (await Database.raw(`CALL ${storeProc}(${questions.join(',')})`, values))[0][0]
       
        return this.Cache.cacheSP('', result)
    }
}

module.exports = Service