'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('product/:id', 'ProductController.byId')

Route.get('departments', 'DepartmentController.list')
Route.get('departments/:department_id', 'DepartmentController.byId')
Route.get('categories', 'CategoryController.page')
Route.get('categories/:category_id', 'CategoryController.byId')

Route.get('/categories/inProduct/:product_id', 'CategoryController.product')
Route.get('/categories/inDepartment/:department_id', 'CategoryController.department')
Route.get('/attributes/:attribute_id', 'AttributeController.list')


