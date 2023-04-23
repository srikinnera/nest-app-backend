import { BadRequestException } from '@nestjs/common';
import { Product } from './product.interface';

export function validateProduct(product: Product, id: string): void {
  if (product.id && product.id !== id) {
    throw new BadRequestException('Product ID does not match request ID.');
  }

  const { sku, name, type, description, color, price } = product;

  if (!sku || !name || !type || !description || !color || !price) {
    throw new BadRequestException('Missing required product information.');
  }

  if (
    typeof sku !== 'string' ||
    typeof name !== 'string' ||
    typeof type !== 'string' ||
    typeof description !== 'string' ||
    typeof color !== 'string' ||
    typeof price !== 'number'
  ) {
    throw new BadRequestException('Invalid product information format.');
  }
}
