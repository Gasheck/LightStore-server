import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from '../../../db/product/product.service';
import { UsePipes } from '@nestjs/common';
import { PrototypeFullObjectPipe, YupValidationPipe } from '../../../../pipes';
import { productInputCreateSchema, productInputUpdateSchema } from './validation';
import { Product } from '../../../db/product/product.entity';

@Resolver('Product')
export class ProductGraphqlResolver {
  constructor(private readonly productService: ProductService) {}

  @Query()
  async products() {
    return this.productService.find();
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputCreateSchema))
  async createProduct(@Args('productInput') product: Product[]) {
    return await this.productService.save(product);
  }

  @Mutation()
  async removeProduct(@Args('id') id: number) {
    return await this.productService.remove(id);
  }

  @Mutation()
  @UsePipes(new PrototypeFullObjectPipe())
  @UsePipes(new YupValidationPipe(productInputUpdateSchema))
  async updateProduct(@Args('productInput') product: Product) {
    const { id } = product;
    return await this.productService.update(id, product);
  }
}
