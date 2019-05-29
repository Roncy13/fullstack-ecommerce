'use strict'

const Service = use('App/Utilities/Service')

class TaxService extends Service {

    constructor(name) {
        super(name)
    }

    async list() {
        const keyWord = this.createCacheKey('list')
            func = async () => (await this.Model.all()).toJSON()

        return await this.CacheQuery(keyWord, func)
    }

    async info(tax_id) {
        const keyWord = this.createCacheKey('tax', tax_id),
            func = async () => {
                const tax = await this.Model.find(tax_id)
                
                return (tax) ? tax.toJSON() : {}
            }
        
        return await this.CacheQuery(keyWord, func)
    }
}

module.exports = new TaxService('Tax')