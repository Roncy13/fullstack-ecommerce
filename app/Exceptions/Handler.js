'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger')
const { merge } = require('lodash')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    response.status(error.status).json({ error: "Error In Server, Please Contact IT for Support" })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request 
   *
   * @return {void}
   */
  async report (error, { request, params }) {
    const data = merge(request.all(), params)
    console.log(request.url())
    Logger.error('Error in Server')
    Logger.error('Error Details: ', error)
    Logger.error('Error Parameters: ', data)
  }
}

module.exports = ExceptionHandler
