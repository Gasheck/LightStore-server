import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductDbService } from '../db/product.db.service';
import { UsePipes } from '@nestjs/common';
import { PrototypeFullObjectPipe, YupValidationPipe } from '../../../../pipes';
import {
  productInputCreateSchema,
  productInputUpdateSchema,
} from './validation';
import { Product } from '../db/product.db.entity';

@Resolver('Product')
export class ProductGraphqlResolver {
  constructor(private readonly productService: ProductDbService) {}

  @Query()
  async products() {
    return this.productService.findMany();
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputCreateSchema))
  createProduct(@Args('productInput') product: Product | Product[]) {
    if (!Array.isArray(product)) {
      product = [product];
    }

    return this.productService.save(product);
  }

  @Mutation()
  async removeProduct(@Args('id') id: number | number[]) {
    if (!Array.isArray(id)) {
      id = [id];
    }

    const productToRemove = this.productService.findMany(id);

    await this.productService.remove(id);

    return productToRemove;
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputUpdateSchema))
  async updateProduct(@Args('productInput') product: Product) {
    const { id } = product;
    const updatedId = await this.productService.update(id, product);

    return this.productService.findOne(updatedId);
  }
}
