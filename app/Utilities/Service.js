'use strict'

const Database = use('Database')

class Service {
    
    constructor(name) {
        this.Cache = use(`App/Utilities/CacheComponents/${name}Cache`)
        this.Model = use(`App/Models/${name}`)
    }

    async byId(id) {
        return await this.Cache.get(id, async() => {
            return await this.Model.find(id)
        })
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