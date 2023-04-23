# NestJS Backend Application for Product Management

This is a NestJS backend application for the product managment. It includes endpoints for getting products with optional filtering and pagination, getting product by ID, updating product and deleting product.

## Installation



`$ npm install` 

## Running the App

### Development mode

 

`$ npm run start` 

### Watch mode

 
`$ npm run start:dev` 

### Production mode

 
`$ npm run start:prod` 

The application will be accessible on http://localhost:8080.

## Endpoints

### Get all unique colors

`GET /products/colors`

Returns an array of unique colors of the products.

### Get products

`GET /products`

Returns an array of products with optional filtering and pagination.

Query Parameters:

-   `page` (optional) - page number (default: -1)
-   `limit` (optional) - limit of products per page (default: -1)
-   `color` (optional) - color(s) to filter the products by (default: 'all')

### Get product by ID

`GET /products/:id`

Returns a single product with the provided ID.

### Update product by ID

`PUT /products/:id`

Updates a single product with the provided ID.

Request Body:

-   `id`  - ID of the product to update
-   `sku` - sku of the product
-   `name` - name of the product
-   `type` - type of the product
-   `description`  - description of the product
-   `price`  - price of the product
-   `color` - color of the product

### Delete product by ID

`DELETE /products/:id`

Deletes a single product with the provided ID.
