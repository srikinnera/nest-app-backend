import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  private readonly dataFilePath = 'data/product-fixtures.json';
  private readonly encoding = 'utf8';

  // Read all products from the JSON file and returns an array
  getProducts(): Product[] {
    const rawData = fs.readFileSync(this.dataFilePath, this.encoding);
    return JSON.parse(rawData);
  }

  // Finds a product with the given ID and returns product
  getProductById(id: string): Product {
    const products = this.getProducts();
    return products.find((p) => p.id === id);
  }

  // Filters the products by the given colors
  getProductsByColor(colors: string[]): Product[] {
    const products = this.getProducts();
    if (colors.includes('all')) return products;
    return products.filter((p) => colors.some((c) => p.color.includes(c.toLowerCase())));
  }

  // Returns an array of all the unique colors
  getColors(): string[] {
    const products = this.getProducts();
    const colorSet = new Set<string>();
    products.forEach((p) => colorSet.add(p.color));
    return Array.from(colorSet);
  }
  
  // Updates a product with the given object
  updateProduct(product: Product): boolean {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === product.id);

    if (index === -1) {
      return false;
    }

    products[index] = product;
    fs.writeFileSync(
      this.dataFilePath,
      JSON.stringify(products),
      this.encoding,
    );

    return true
  }

  // Delete a product with the given ID
  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return false;
    }

    products.splice(index, 1);
    fs.writeFileSync(
      this.dataFilePath,
      JSON.stringify(products),
      this.encoding,
    );

    return true
  }
}
