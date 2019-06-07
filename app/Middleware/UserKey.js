'use strict'

class UserKey {
  async handle ({ request, response }, next) {
    // call next to advance the request
    const userKey = await request.header('user-key')
   
    if (!userKey) {
      return response
        .status(400)
        .json({
          message: 'USER-KEY Header not exist'
        })
    }
    
    request.request.headers.authorization = userKey

    delete request.request.headers['user-key']
    
    await next()
  }
}

module.exports = UserKey
