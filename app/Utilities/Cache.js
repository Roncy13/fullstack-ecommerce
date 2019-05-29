'use strict'
const Storage = use('Cache')
const Config = use('Config')
const EXPIRATION = Config.get('app.EXPIRATION')

class Cache {

    constructor(key = '') {
      this.key = key
    }

    getCacheKey (value) {
      return `${this.key}-${value}`;
    }

    getPrepCacheKey(value, prep) {
       const key = [prep, value].join('-')

       return this.getCacheKey(key)
    }

    async cacheSP(val, func) {
      return this.get(val, func, false)
    }

    store(keyVal, result) {
      return Storage.add(keyVal, result, EXPIRATION);
    }

    forever(keyVal, result) {
      return Storage.forever(keyVal, result);
    }

    async retrieveList(keyVal) {
      return Storage.get(keyVal, [])
    }

    async retrieveData(keyVal) {
      return Storage.get(keyVal, {})
    }

    async get(val, storeFunction, parse = true) {
      const keyVal = this.getCacheKey(val)
        ,value = await Storage.get(keyVal);

      if (value) {
        return { data: value, message: "Data comes from Cache" }
      }
  
      return await storeFunction().then( async (result) => {
        
        if (parse) {
          result = result.toJSON();
        }

        if (result) {
          await Storage.add(keyVal, result, EXPIRATION);
          return { data: result, message: "Data comes from storage first" }
        }

        return
      });
    }
  
    async del(key) {
      const keyVal = this.getCacheKey(key)
      return await Storage.del(keyVal)
    }
  
    async flush() {
      return await Storage.flush();
    }

    remove(key) {
      return Storage.forget(key)
    }
}

module.exports = Cache