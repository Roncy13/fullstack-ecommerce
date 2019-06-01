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

Route.get('departments', 'DepartmentController.list')
Route.get('departments/:department_id', 'DepartmentController.byId')
Route.get('categories', 'CategoryController.list')
Route.get('categories/:category_id', 'CategoryController.byId')

Route.get('categories/inProduct/:product_id', 'CategoryController.product')
Route.get('categories/inDepartment/:department_id', 'CategoryController.department')
Route.get('attributes/:attribute_id', 'AttributeController.list')
Route.get('attributes/values/:attribute_id', 'AttributeController.values')
Route.get('attributes/inProduct/:product_id', 'AttributeController.product')

Route.get('products', 'ProductController.page')
Route.get('products/search', 'ProductController.search')
Route.get('products/:id', 'ProductController.byId')
Route.get('products/inCategory/:category_id', 'ProductController.categories')
Route.get('products/inDepartment/:department_id',  'ProductController.department')
Route.get('products/:product_id/details', 'ProductController.productDetailsbyId')
Route.get('products/:product_id/locations', 'ProductController.productLocationsbyId')
Route.get('products/:product_id/reviews', 'ProductController.productReviewsbyId')

// Customer end points
Route.post('customers', 'CustomerController.register')
Route.post('customers/login', 'CustomerController.verify')
Route.get('customer', 'CustomerController.info').middleware(['userKey'])
Route.put('customer', 'CustomerController.update').middleware(['userKey'])
Route.put('customers/address', 'CustomerController.address').middleware(['userKey'])
Route.put('customers/creditCard', 'CustomerController.creditCard').middleware(['userKey'])

Route.get('shoppingcart/generateUniqueId', 'ShoppingCartController.uuid').middleware(['userKey'])
Route.post('shoppingcart/add', 'ShoppingCartController.add').middleware(['userKey'])
Route.put('shoppingcart/update/:item_id', 'ShoppingCartController.update').middleware(['userKey', 'ItemIdByUser'])
Route.delete('shoppingcart/empty/:cart_id', 'ShoppingCartController.delete').middleware(['userKey', 'CartDetailsExist', 'CartIdExist'])
Route.get('shoppingcart/moveToCart/:item_id', 'ShoppingCartController.move').middleware(['userKey', 'ItemIdByUser' ,'CartIdExist'])
Route.get('shoppingcart/:cart_id', 'ShoppingCartController.list').middleware(['userKey'])
Route.get('shoppingcart/totalAmount/:cart_id', 'ShoppingCartController.totalAmount').middleware(['userKey', 'CartIdExist'])
Route.get('shoppingcart/saveForLater/:item_id', 'ShoppingCartController.later').middleware(['userKey', 'ItemIdByUser'])
Route.get('shoppingcart/getSaved/:cart_id', 'ShoppingCartController.saved').middleware(['userKey', 'CartIdExist'])
Route.get('shoppingcart/removeProduct/:item_id', 'ShoppingCartController.remove').middleware(['userKey', 'ItemIdByUser'])

// Endpoints for Orders

Route.post('orders', 'OrderController.create').middleware(['userKey'])
Route.get('orders/:order_id', 'OrderController.info').middleware(['userKey'])
Route.get('orders/inCustomer', 'OrderController.list').middleware(['userKey'])
Route.get('orders/shortDetail/:order_id', 'OrderController.shorDetail').middleware(['userKey'])
Route.get('orders/items/:order_id', 'OrderController.items').middleware(['userKey'])

// Endpoints For Tax

Route.get('tax', 'TaxController.list')
Route.get('tax/:tax_id', 'TaxController.info')

// Endpoints for Shipping

Route.get('shipping/region', 'ShippingController.list')
Route.get('shipping/region/:shipping_id', 'ShippingController.info')
