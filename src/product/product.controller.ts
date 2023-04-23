import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, ProductResponse, OutputResponse } from './product.interface';
import { validateProduct } from './product.validator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Get all unique colors
  @Get('/colors')
  async getColors(): Promise<string[]> {
    return this.productService.getColors();
  }

  //Get products with optional filtering and pagination
  @Get()
  async getProducts(
    @Query('page') page = -1,
    @Query('limit') limit = -1,
    @Query('color') colorsParam: string = 'all',
  ): Promise<ProductResponse> {
    if (isNaN(page) || isNaN(limit)) {
      throw new BadRequestException('Invalid page or limit parameter.');
    }

    const colors = colorsParam.split(',').filter((color) => color !== '');
    const products = await this.productService.getProductsByColor(colors);

    let response: ProductResponse = {
      products: products,
      length: products.length,
    };

    if (page === -1 || limit === -1) {
      return response;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    response.products = products.slice(startIndex, endIndex);
    return response;
  }

  // Get product by ID
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found.`);
    }

    return product;
  }

  // Update product by ID
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<OutputResponse> {
    validateProduct(product, id);
    product.id = id;
    this.productService.updateProduct(product);

    const response: OutputResponse = {
      message: `Product with ${product.id} updated`,
    };

    return response;
  }

  // Delete product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<OutputResponse> {
    const result = await this.productService.deleteProduct(id);

    if (!result) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    const response: OutputResponse = {
      message: 'Product deleted',
    };

    return response;
  }
}
